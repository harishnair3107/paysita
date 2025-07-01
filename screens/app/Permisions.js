import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, StatusBar, Alert, AppState } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as LocalAuthentication from "expo-local-authentication";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Permissions = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [appState, setAppState] = useState(AppState.currentState);
  const [location, setLocation] = useState(null);

  const [settings, setSettings] = useState({
    IndiayaPayTips: false,
    WhatsAppAlert: false,
    smartAlerts: true,
    email: false,
    biometric: true,
    offersRewards: true,
    transactionHistory: true,
    chatMessages: true,
    location: false,
    orderUpdates: true,
  });

  const settingLabels = {
    IndiayaPayTips: t('IndiayaPay_tips'),
    WhatsAppAlert: t('WhatsApp_Alert'),
    smartAlerts: t('Smart_alerts'),
    email: t('Email'),
    biometric: t('Biometric_and_passcode'),
    offersRewards: t('Offers_rewards'),
    transactionHistory: t('Transaction_history_and_recommendations'),
    chatMessages: t('Chat_messages'),
    location: t('Location'),
    orderUpdates: t('Order_payment_and_updates'),
  };

  const toggleSwitch = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('settings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
    } else {
      Alert.alert(t('Location_permission'), t('Please_grant_location'));
    }
  };

  const promptBiometricAuth = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!compatible || !enrolled) {
        Alert.alert(t('Biometric_error'), t('Biometric_not_supported'));
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t('Authenticate_to_continue'),
        fallbackLabel: t('Use_passcode'),
      });
      if (!result.success) {
        Alert.alert(t('Authentication_failed'), t('You_must_authenticate'));
      }
    } catch (error) {
      console.log(t('Biometric_error'), error);
    }
  };

  useEffect(() => {
    const sub = AppState.addEventListener("change", nextAppState => {
      if (nextAppState === "active" && settings.biometric) {
        promptBiometricAuth();
      }
      setAppState(nextAppState);
    });
    return () => sub.remove();
  }, [settings.biometric]);

  useEffect(() => {
    loadSettings().then(() => {
      if (settings.biometric) {
        promptBiometricAuth();
      }
    });
  }, []);

  useEffect(() => {
    if (settings.location) {
      requestLocationPermission();
    }
  }, [settings.location]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {Object.keys(settings).map((key, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{settingLabels[key]}</Text>
          <Pressable
            style={[styles.toggleContainer, settings[key] ? styles.toggleOn : styles.toggleOff]}
            onPress={() => toggleSwitch(key)}
          >
            <View style={[styles.toggleCircle, settings[key] && styles.toggleCircleOn]} />
          </Pressable>
        </View>
      ))}

      {settings.location && !location && (
        <Text style={styles.locationText}>{t('Location_is_being_fetched')}</Text>
      )}
    </View>
  );
};

export default Permissions;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 16 },
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
  toggleOn: { backgroundColor: "#90D5FF" },
  toggleOff: { backgroundColor: "#999" },
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
  locationContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});