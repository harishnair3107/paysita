import React, { useState, useContext,useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Pressable,
  StyleSheet,
  Share,
  Alert,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Clipboard from "expo-clipboard";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QRcode = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);
  
  const qrImage = require("../../assets/drawer/JohnDoe.png");
  const [name,setName]=useState('');
  const [mobile,setMobile]=useState('');
  const [upi,setUpi] = useState('');
  const [initial,setInitial]=useState('X')
  const [selectedBank, setSelectedBank] = useState({
    name: "State Bank Of India",
    lastDigits: "6170",
    icon: require("../../assets/drawer/axis.png"),
  });

  const handleCopy = async () => {
    await Clipboard.setStringAsync(upi);
    Alert.alert(t("copied"), t("upi_copied_to_clipboard"));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${t("scan_to_pay")} ${upi}`,
      });
    } catch (error) {
      Alert.alert(t("error"), t("failed_to_share_qr"));
    }
  };

  const handleDownload = async () => {
    try {
      const fileUri = Image.resolveAssetSource(qrImage).uri;
      const filePath = FileSystem.documentDirectory + "JohnDoe.png";
      const downloaded = await FileSystem.downloadAsync(fileUri, filePath);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        await MediaLibrary.createAssetAsync(downloaded.uri);
        Alert.alert(t("success"), t("qr_saved_to_gallery"));
      } else {
        Alert.alert(t("permission_denied"), t("cannot_save_without_permission"));
      }
    } catch (error) {
      Alert.alert(t("error"), t("failed_to_save_qr"));
    }
  };

  const handleEdit = () => {
    Alert.alert(t("edit"), t("edit_upi_clicked"));
  };

  const banks = [
    {
      name: "Axix Bank",
      lastDigits: "6170",
      icon: require("../../assets/drawer/axis.png"),
    },
    {
      name: "RBL Bank",
      lastDigits: "3391",
      icon: require("../../assets/drawer/rbl.png"),
    },
    {
      name: "HDFC Bank",
      lastDigits: "8952",
      icon: require("../../assets/drawer/hdfc.png"),
    },
    {
      name: "ICICI Bank",
      lastDigits: "1287",
      icon: require("../../assets/drawer/icici.png"),
    },
  ];
 useEffect(() => {
  const loadUser = async () => {
    const userStr = await AsyncStorage.getItem("user");

    if (userStr) {
      const user = JSON.parse(userStr);
      const firstLetter=user.name.trim()?.charAt(0).toUpperCase();
      setName(user.name);
      setMobile(user.mobileNumber);
      setUpi(user.mobileNumber + "@upi");
      setInitial(firstLetter);
    }
  };

  loadUser();
}, []);


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top", "left", "right"]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          android_ripple={{ color: "rgba(0, 0, 0, 0.1)", borderless: true }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t("qr_code")}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Profile */}
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
        </View>
        <Text style={styles.phone}>{mobile}</Text>

        {/* QR Box */}
        <View style={[styles.qrBox, { backgroundColor: colors.option }]}>
          <Text style={[styles.receiveLabel, { color: colors.text }]}>
            {t("receive_money_in")}
          </Text>
          <View style={styles.bankRow}>
            <Feather name="shield" size={20} color="#1d154a" />
            <Text style={[styles.bankText, { color: colors.text }]}>
              {selectedBank.name} - {selectedBank.lastDigits}
            </Text>
          </View>
          <Image source={qrImage} style={{ width: 200, height: 200 }} />

          {/* UPI */}
          <View style={styles.upiRow}>
            <TouchableOpacity onPress={handleEdit}>
              <Feather name="edit" size={16} color="#ffa500" />
            </TouchableOpacity>
            <Text style={[styles.upiText, { color: colors.text }]}>{upi}</Text>
            <TouchableOpacity onPress={handleCopy}>
              <Feather name="copy" size={16} color="#1d154a" style={{ marginLeft: 5 }} />
            </TouchableOpacity>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.lightButton]} onPress={handleShare}>
              <Feather name="share-2" size={16} color="#333" />
              <Text style={styles.buttonText}>{t("share_qr")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.lightButton]} onPress={handleDownload}>
              <Feather name="download" size={16} color="#333" />
              <Text style={styles.buttonText}>{t("save_qr")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>{t("receive_money_from_any_upi")}</Text>
        <View style={styles.bankIconsRow}>
          {banks.map((bank, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.bankIconCard,
                { backgroundColor: colors.option },
                selectedBank.name === bank.name && { borderColor: "#1d154a", borderWidth: 1.5 },
              ]}
              onPress={() => setSelectedBank(bank)}
            >
              <Image source={bank.icon} style={styles.bankIconImage} />
            </TouchableOpacity>
          ))}
        </View>

        <Image source={require("../../assets/drawer/upi.png")} style={styles.upiLogo} />
      </View>
    </SafeAreaView>
  );
};

export default QRcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#1d154a",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 16,
    color: "gray",
  },
  qrBox: {
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  receiveLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
  },
  bankRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bankText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  upiRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  upiText: {
    fontSize: 16,
    marginHorizontal: 5,
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  lightButton: {
    backgroundColor: "#f0f0f5",
  },
  buttonText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "gray",
  },
  bankIconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%",
    paddingHorizontal: 10,
    gap: 10,
  },
  bankIconCard: {
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  bankIconImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  upiLogo: {
    width: 100,
    height: 40,
    marginTop: 60,
    resizeMode: "contain",
  },
});