import { StyleSheet, Text, View, StatusBar, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState ,useEffect,useContext} from "react";
import { useTranslation } from "react-i18next"; // i18n hook
import { ThemeContext } from '../../theme/Theme'; 
import { SafeAreaView } from 'react-native-safe-area-context';

const ManageNotification = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); // translation hook
  const {colors } = useContext(ThemeContext);
  const styles=createstyles(colors);
  const [settings, setSettings] = useState({
    PaymentOrdersandUpdate: true,
    OfferandRewards: false,
    WhatsappNotification: false,
    AccesstoSMS: true,
    PaymentNotifications: true,
  });

  const settingLabels = {
    PaymentOrdersandUpdate: t("payment_orders_update"),
    OfferandRewards: t("offer_rewards"),
    WhatsappNotification: t("whatsapp_notification"),
    AccesstoSMS: t("access_to_sms"),
    PaymentNotifications: t("payment_notification"),
  };

  const toggleSwitch = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
       <StatusBar
              backgroundColor={colors.background}
              barStyle="dark-content"
              translucent={false}
            />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            android_ripple={{ color: "rgba(0, 0, 0, 0.1)", borderless: true }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Notifications</Text>
            <Text style={styles.headerSubtitle}>Manage your notifications</Text>
          </View>
        </View>
      </View>

      {Object.keys(settings).map((key, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{settingLabels[key]}</Text>
          <Pressable
            style={[
              styles.toggleContainer,
              settings[key] ? styles.toggleOn : styles.toggleOff,
            ]}
            onPress={() => toggleSwitch(key)}
          >
            <View
              style={[
                styles.toggleCircle,
                settings[key] && styles.toggleCircleOn,
              ]}
            />
          </Pressable>
        </View>
      ))}
      </SafeAreaView>
    </View>
  );
};

export default ManageNotification;

const createstyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    header: {
      backgroundColor: colors.card,
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.03,
      shadowRadius: 4,
      elevation: 2,
    },

    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },

    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 8,
    },

    headerTitleContainer: {
      flex: 1,
    },

    headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      letterSpacing: 0.2,
    },

    headerSubtitle: {
      fontSize: 12,
      fontWeight: "500",
      color: colors.upi,
      marginTop: 2,
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },

    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      flexShrink: 1,
    },

    toggleContainer: {
      width: 50,
      height: 28,
      borderRadius: 15,
      justifyContent: "center",
      paddingHorizontal: 3,
    },

    toggleOn: {
      backgroundColor: colors.button,
    },

    toggleOff: {
  backgroundColor: colors.border,
},


    toggleCircle: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: colors.card,
      position: "absolute",
      left: 4,
    },

    toggleCircleOn: {
      transform: [{ translateX: 22 }],
    },
  });
