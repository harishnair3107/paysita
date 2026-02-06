import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  Alert,
  AppState,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../theme/Theme";

const Permissions = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);

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

  // Hide the default navigator header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const settingLabels = {
    IndiayaPayTips: t('IndiayaPay_tips', 'IndiayaPay Tips'),
    WhatsAppAlert: t('WhatsApp_Alert', 'WhatsApp Alerts'),
    smartAlerts: t('Smart_alerts', 'Smart Alerts'),
    email: t('Email', 'Email Notifications'),
    biometric: t('Biometric_and_passcode', 'Biometric & Passcode'),
    offersRewards: t('Offers_rewards', 'Offers & Rewards'),
    transactionHistory: t('Transaction_history_and_recommendations', 'Transaction History'),
    chatMessages: t('Chat_messages', 'Chat Messages'),
    location: t('Location', 'Location Services'),
    orderUpdates: t('Order_payment_and_updates', 'Order & Payment Updates'),
  };

  const settingIcons = {
    IndiayaPayTips: "bulb",
    WhatsAppAlert: "logo-whatsapp",
    smartAlerts: "notifications",
    email: "mail",
    biometric: "finger-print",
    offersRewards: "gift",
    transactionHistory: "receipt",
    chatMessages: "chatbubbles",
    location: "location",
    orderUpdates: "cart",
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
      Alert.alert(
        t('Location_permission', 'Location Permission'),
        t('Please_grant_location', 'Please grant location permission')
      );
    }
  };

  const promptBiometricAuth = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!compatible || !enrolled) {
        Alert.alert(
          t('Biometric_error', 'Biometric Error'),
          t('Biometric_not_supported', 'Biometric not supported on this device')
        );
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t('Authenticate_to_continue', 'Authenticate to continue'),
        fallbackLabel: t('Use_passcode', 'Use Passcode'),
      });
      if (!result.success) {
        Alert.alert(
          t('Authentication_failed', 'Authentication Failed'),
          t('You_must_authenticate', 'You must authenticate to continue')
        );
      }
    } catch (error) {
      console.log(t('Biometric_error', 'Biometric Error'), error);
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

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Permissions</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={20} color={colors.accent} />
          <Text style={styles.infoText}>
            Manage app permissions and notification preferences
          </Text>
        </View>

        {/* Settings List */}
        <View style={styles.settingsCard}>
          {Object.keys(settings).map((key, index) => (
            <View key={index}>
              <Pressable
                style={styles.row}
                onPress={() => toggleSwitch(key)}
                android_ripple={{ color: colors.divider }}
              >
                <View style={styles.rowLeft}>
                  <View
                    style={[
                      styles.iconWrapper,
                      { backgroundColor: settings[key] ? colors.accent + '15' : colors.divider },
                    ]}
                  >
                    <Ionicons
                      name={settingIcons[key]}
                      size={20}
                      color={settings[key] ? colors.accent : colors.muted}
                    />
                  </View>
                  <Text style={styles.label}>{settingLabels[key]}</Text>
                </View>
                <View
                  style={[
                    styles.toggleContainer,
                    settings[key] ? styles.toggleOn : styles.toggleOff,
                  ]}
                >
                  <View
                    style={[
                      styles.toggleCircle,
                      settings[key] && styles.toggleCircleOn,
                    ]}
                  />
                </View>
              </Pressable>
              {index < Object.keys(settings).length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        {/* Location Status */}
        {settings.location && (
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <Ionicons name="location" size={20} color={colors.success} />
              <Text style={styles.locationTitle}>Location Status</Text>
            </View>
            {location ? (
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>
                  Location enabled and active
                </Text>
                <Text style={styles.locationCoords}>
                  Lat: {location.coords.latitude.toFixed(4)}, Lng:{' '}
                  {location.coords.longitude.toFixed(4)}
                </Text>
              </View>
            ) : (
              <Text style={styles.locationFetching}>
                {t('Location_is_being_fetched', 'Fetching location...')}
              </Text>
            )}
          </View>
        )}

        {/* Spacer */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Permissions;

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    // Header
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
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
      color: colors.text,
      letterSpacing: 0.3,
    },
    headerSpacer: {
      width: 40,
    },

    // Content
    scrollContent: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 20,
    },

    // Info Banner
    infoBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.accent + "10",
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.accent + "30",
    },
    infoText: {
      flex: 1,
      fontSize: 13,
      fontWeight: "500",
      color: colors.text,
      lineHeight: 18,
    },

    // Settings Card
    settingsCard: {
      backgroundColor: colors.option,
      borderRadius: 16,
      overflow: "hidden",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },

    // Row
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 16,
      backgroundColor: colors.option,
    },
    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      marginRight: 16,
    },
    iconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    label: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
      flex: 1,
    },
    divider: {
      height: 1,
      backgroundColor: colors.divider,
      marginLeft: 68,
    },

    // Toggle
    toggleContainer: {
      width: 50,
      height: 28,
      borderRadius: 14,
      justifyContent: "center",
      paddingHorizontal: 3,
    },
    toggleOn: {
      backgroundColor: colors.accent,
    },
    toggleOff: {
      backgroundColor: colors.muted,
    },
    toggleCircle: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: "#FFFFFF",
      position: "absolute",
      left: 3,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    toggleCircleOn: {
      transform: [{ translateX: 22 }],
    },

    // Location Card
    locationCard: {
      backgroundColor: colors.option,
      borderRadius: 16,
      padding: 18,
      marginTop: 20,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    locationHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 12,
    },
    locationTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
    },
    locationInfo: {
      paddingLeft: 30,
    },
    locationText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.success,
      marginBottom: 4,
    },
    locationCoords: {
      fontSize: 12,
      fontWeight: "400",
      color: colors.subtext,
    },
    locationFetching: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.muted,
      paddingLeft: 30,
    },
  });