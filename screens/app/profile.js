import React, { useState, useEffect,useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {UserContext} from '../../context/userContext'
import axios from 'axios';
const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
 const { user, setUser } = useContext(UserContext);

const mobileNumber = user?.mobileNumber;
const name = user?.name;
const countryCode = user?.countryCode;

  const params = route.params || '';
  const { t } = useTranslation();
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempName, setTempName] = useState(name || "");
  const [savedAddresses, setSavedAddresses] = useState([]);
  useEffect(() => {
  if (modalVisible) {
    setTempName(user?.name || "");
  }
}, [modalVisible]);


  useEffect(() => {
    const loadProfileImage = async () => {
      const storedImage = await AsyncStorage.getItem("profileImage");
      if (storedImage) {
        setProfileImage(storedImage);
      }
    };
    loadProfileImage();
  }, []);

  useEffect(() => {
    const loadAddresses = async () => {
      const storedAddresses = await AsyncStorage.getItem("savedAddresses");
      setSavedAddresses(storedAddresses ? JSON.parse(storedAddresses) : []);
    };
    loadAddresses();
  }, []);

  useEffect(() => {
    const addAddress = async () => {
      if (params.house && params.address) {
        const newAddress = {
          house: params.house,
          address: params.address,
          landmark: params.landmark || "",
          type: params.type,
        };

        try {
          const storedAddresses = await AsyncStorage.getItem("savedAddresses");
          const parsedAddresses = storedAddresses ? JSON.parse(storedAddresses) : [];

          const isDuplicate = parsedAddresses.some(
            (addr) =>
              addr.house === newAddress.house &&
              addr.address === newAddress.address &&
              addr.landmark === newAddress.landmark &&
              addr.type === newAddress.type
          );

          if (!isDuplicate) {
            const updatedAddresses = [...parsedAddresses, newAddress];
            await AsyncStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));
            setSavedAddresses(updatedAddresses);
          }
        } catch (error) {
          console.error("Error saving address:", error);
        }
      }
    };
    addAddress();
  }, [params]);

  const handleSave = async () => {
  try {
    console.log("UPDATING USER:", user);

    const response = await axios.put(
      "http://192.168.29.22:5000/api/auth/updateName",
      {
        userId: user.id,   // 🔥 REQUIRED
        name: tempName,
      }
    );

    if (response.status === 200) {
      const updatedUser = {
        ...user,
        name: tempName,
      };

      setUser(updatedUser);
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      setModalVisible(false);
    }
  } catch (err) {
    console.log("AXIOS ERROR:", err.response?.data || err.message);
    Alert.alert(
      "Error",
      err.response?.data?.message || "Please try again later"
    );
  }
};



  const pickImage = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || galleryStatus !== "granted") {
      Alert.alert(t("permission_required"), t("grant_permission_message"));
      return;
    }

    Alert.alert(t("profile_picture_options"), t("select_an_option"), [
      {
        text: t("choose_from_gallery"),
        onPress: async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled) {
            const uri = result.assets[0].uri;
            setProfileImage(uri);
            await AsyncStorage.setItem("profileImage", uri);
          }
        },
      },
      {
        text: t("take_photo"),
        onPress: async () => {
          let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled) {
            const uri = result.assets[0].uri;
            setProfileImage(uri);
            await AsyncStorage.setItem("profileImage", uri);
          }
        },
      },
      {
        text: t("remove_profile_picture"),
        onPress: async () => {
          setProfileImage(null);
          await AsyncStorage.removeItem("profileImage");
        },
        style: "destructive",
      },
      { text: t("cancel"), style: "cancel" },
    ]);
  };
 if (!user) return null; // or loader

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Pressable onPress={pickImage}>
            <Image
              source={profileImage ? { uri: profileImage } : require("../../assets/drawer/person.png")}
              style={styles.profileImage}
            />
          </Pressable>
          <View style={styles.textInfo}>
            <Text style={styles.name}>{user?.name || ""}</Text>
            <Text style={styles.phone}>{user?.mobileNumber|| ""}</Text>

          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {

              setModalVisible(true);
            }}
          >
            
            <Ionicons name="pencil" size={20} color="#1D154A" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("CoinsEarned")}>
            <Text style={styles.listText}>{t("coins_earned")}</Text>
            <Ionicons name="chevron-forward" size={20} color="#1D154A" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("ManageNotification")}>
            <Text style={styles.listText}>{t("manage_notification")}</Text>
            <Ionicons name="chevron-forward" size={20} color="#1D154A" />
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("AccountSecurityTips")}>
            <Text style={styles.listText}>{t("account_security_tips")}</Text>
            <Ionicons name="chevron-forward" size={20} color="#1D154A" />
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("FinancialDetails")}>
            <Text style={styles.listText}>{t("financial_details")}</Text>
            <Ionicons name="chevron-forward" size={20} color="#1D154A" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("AdditionalDetails")}>
            <Text style={styles.listText}>{t("additional_details")}</Text>
            <Ionicons name="chevron-forward" size={20} color="#1D154A" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t("saved_addresses")}</Text>
          {savedAddresses.length > 0 ? (
            savedAddresses.map((addr, index) => (
              <View key={index} style={styles.addressContainer}>
                <Text style={styles.addressText}>
                  {`${addr.house}, ${addr.address}${addr.landmark ? `, ${addr.landmark}` : ""} (${addr.type})`}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.addressText}>{t("no_address_added")}</Text>
          )}

          <TouchableOpacity style={styles.addNew} onPress={() => navigation.navigate("Addaddress")}>
            <Ionicons name="add" size={18} color="#1D154A" />
            <Text style={styles.addNewText}>{t("add_new_address")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>{t("edit_details")}</Text>
            <TextInput style={styles.input} value={tempName} onChangeText={setTempName} placeholder={t("enter_name")} />
            <View style={styles.modalButtons}>
              <Button title={t("cancel")} onPress={() => setModalVisible(false)} color="#d9534f" />
              <Button title={t("save")} onPress={handleSave} color="#5cb85c" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F2F5" },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E5E7EB",
    borderWidth: 2,
    borderColor: "#3B82F6",
  },
  textInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: { fontSize: 18, fontWeight: "700", color: "#111827" },
  phone: { fontSize: 15, color: "#6B7280", marginTop: 2 },
  editButton: { paddingLeft: 12 },
  card: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1F2937",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  listText: { fontSize: 16, fontWeight: "500", color: "#374151" },
  addNew: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#3B82F6",
    borderRadius: 8,
    marginTop: 14,
    alignSelf: "center",
    paddingHorizontal: 16,
    backgroundColor: "#E0F2FE",
  },
  addNewText: {
    color: "#1D4ED8",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  addressText: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 16,
    width: "88%",
    elevation: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    color: "#111827",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
