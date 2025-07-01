import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import { useTranslation } from "react-i18next";

// NavItem Component
const NavItem = ({ image, video, label, onPress, videoStyle }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    {video ? (
      <Video
        source={video}
        style={[styles.icon, videoStyle]} // apply inline style if provided
        isMuted
        isLooping
        shouldPlay
        resizeMode="cover"
      />
    ) : (
      <Image source={image} style={styles.icon} />
    )}
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

// Navbar Component
const Navbar = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={{ flex: 0, backgroundColor: "#fff" }}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}></ScrollView>

      {/* Fixed Bottom Navigation Bar */}
      <View style={styles.navbar}>
        <NavItem
          image={require("../assets/historyiconn.png")}
          onPress={() => navigation.navigate("history")}
          label={t("history")}
        />
        <NavItem
          image={require("../assets/cashbackiconn.png")}
          onPress={() => navigation.navigate("CashbackAndRefferal")}
          label={t("cashback_referrals")}
        />
        <NavItem
          video={require("../assets/modified_orange_video.mp4")}
          onPress={() => navigation.navigate("scan")}
          videoStyle={{ width: 60, height: 60, borderRadius: 20 }}
          label={t("scan_pay")}
        />
        <NavItem
          image={require("../assets/scan.png")}
          onPress={() => navigation.navigate("QRcode")}
          label={t("share_qr")}
        />
        <NavItem
          image={require("../assets/services.png")}
          onPress={() => navigation.navigate("Service")}
          label={t("all_services")}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 15,
    // borderRadius: 40,
    elevation: 10,
    height: 90,
    alignItems: "center",
    justifyContent: "space-around",
  },
  navItem: {
    alignItems: "center",
    marginBottom:20,
    marginTop:5,
  },
  icon: {
    width: 40,
    height: 40,
    overflow: "hidden",
  },
  label: {
    fontSize: 11,
    color: "#333",
    fontWeight: "bold",
    marginTop: 0,
    textAlign: "center",
  },
});

export default Navbar;
