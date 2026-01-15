import { useContext } from "react";
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
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeContext } from "../theme/Theme";

// NavItem Component
const NavItem = ({
  icon,
  image,
  video,
  label,
  onPress,
  videoStyle,
  labelStyle,
  containerStyle,
  styles,
}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      {/* ICON / VIDEO */}
      {containerStyle ? (
        <View style={[styles.circleContainer, containerStyle]}>
          {video && (
            <Video
              source={video}
              style={[styles.icon, videoStyle]}
              isMuted
              isLooping
              shouldPlay
              resizeMode="cover"
            />
          )}
        </View>
      ) : video ? (
        <Video
          source={video}
          style={[styles.icon, videoStyle]}
          isMuted
          isLooping
          shouldPlay
          resizeMode="cover"
        />
      ) : icon ? (
        <Ionicons
          name={icon}
          style={styles.bigIcon}
          size={28}
          color={colors.text}   // ✅ THEME
        />
      ) : (
        <Image source={image} style={styles.icon} />
      )}

      {/* LABEL */}
      <Text
        style={[
          styles.label,
          { color: colors.text },   // ✅ THEME
          labelStyle,
        ]}
        numberOfLines={2}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// Navbar Component
const Navbar = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  return (
    <View style={{ flex: 0, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} />

      <View style={styles.navbar}>
        <NavItem
          styles={styles}
          icon="time-outline"
          onPress={() => navigation.navigate("history")}
          label={t("history")}
        />

        <NavItem
          styles={styles}
          icon="gift-outline"
          onPress={() => navigation.navigate("CashbackAndRefferal")}
          label={t("cashback_referrals")}
        />

        <View style={styles.scanWrapper}>
          <NavItem
            video={require("../assets/modified_orange_video.mp4")}
            onPress={() => navigation.navigate("scan")}
            videoStyle={{
              width: 60,
              height: 60,
              borderRadius: 20,
              borderColor: colors.primary, // ✅ THEME
              borderWidth: 1,
            }}
            styles={styles}
            label={t("scan_pay")}
            labelStyle={{
              marginTop: -10,
              fontSize: 14,
              fontWeight: "800",
              color: colors.primary, // ✅ THEME
            }}
            containerStyle={{}}
          />
        </View>

        <NavItem
          styles={styles}
          icon="qr-code-outline"
          onPress={() => navigation.navigate("QRcode")}
          label={t("share_qr")}
        />

        <NavItem
          styles={styles}
          icon="settings-outline"
          onPress={() => navigation.navigate("Service")}
          label={t("all_services")}
        />
      </View>
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    navbar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      backgroundColor: colors.background, // ✅ THEME
      paddingVertical: 15,
      height: 90,
      alignItems: "center",
      justifyContent: "space-around",
      elevation: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },

    navItem: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },

    circleContainer: {
      backgroundColor: colors.background, // ✅ THEME
      padding: 12,
      width: 90,
      height: 90,
      borderRadius: 45,
      alignItems: "center",
      justifyContent: "center",
    },

    scanWrapper: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: -43,
      marginLeft: 7,
      backgroundColor: colors.background, // ✅ THEME
      borderRadius: 50,
    },

    bigIcon: {
      fontSize: 32,
    },

    label: {
      fontSize: 12,
      fontWeight: "600",
      marginTop: 6,
      textAlign: "center",
    },
  });

export default Navbar;
