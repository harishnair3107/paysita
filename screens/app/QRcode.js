import React, { useState } from "react";
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
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Clipboard from "expo-clipboard";
import { useTranslation } from "react-i18next";

const QRcode = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const qrImage = require("../../assets/drawer/JohnDoe.png");
  const upiId = "9632587412@upi";

  const [selectedBank, setSelectedBank] = useState({
    name: "State Bank Of India",
    lastDigits: "6170",
    icon: require("../../assets/drawer/axis.png"),
  });

  const handleCopy = async () => {
    await Clipboard.setStringAsync(upiId);
    Alert.alert(t("copied"), t("upi_copied_to_clipboard"));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${t("scan_to_pay")} ${upiId}`,
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

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F7FB", padding: 20, alignItems: "center" }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Profile */}
      <View style={styles.profileRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>{t("user_name")}</Text>
      </View>
      <Text style={styles.phone}>{t("user_phone")}</Text>

      {/* QR Box */}
      <View style={styles.qrBox}>
        <Text style={styles.receiveLabel}>{t("receive_money_in")}</Text>
        <View style={styles.bankRow}>
          <Feather name="shield" size={20} color="#1d154a" />
          <Text style={styles.bankText}>{selectedBank.name} - {selectedBank.lastDigits}</Text>
        </View>
        <Image source={qrImage} style={{ width: 200, height: 200 }} />

        {/* UPI */}
        <View style={styles.upiRow}>
          <TouchableOpacity onPress={handleEdit}>
            <Feather name="edit" size={16} color="#ffa500" />
          </TouchableOpacity>
          <Text style={styles.upiText}>{upiId}</Text>
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
  );
};

export default QRcode;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginRight: "auto",
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  receiveLabel: {
    fontSize: 16,
    marginBottom: 10,
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
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  lightButton: {
    backgroundColor: "#f0f0f5",
  },
  buttonText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#333",
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
  },
  bankIconCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    elevation: 3,
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
