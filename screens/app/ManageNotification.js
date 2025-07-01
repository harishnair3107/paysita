import { StyleSheet, Text, View, StatusBar, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // i18n hook

const ManageNotification = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); // translation hook

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
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

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
    </View>
  );
};

export default ManageNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
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
    backgroundColor: "#90D5FF",
  },
  toggleOff: {
    backgroundColor: "#999",
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
    position: "absolute",
    left: 4,
  },
  toggleCircleOn: {
    transform: [{ translateX: 22 }],
  },
});
