import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";
import { BackHandler } from "react-native";
import { useEffect } from "react";




let backAttemptCount = 0;
const MAX_ATTEMPTS = 3;


export async function requireBiometric() {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert(
        "Biometric not available",
        "Please enable fingerprint or face unlock"
      );
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Confirm your identity",
      fallbackLabel: "Use device PIN",
      cancelLabel: "Cancel",
      disableDeviceFallback: false,
    });

    if (result.success) {
      backAttemptCount = 0; // ✅ reset on success
      return true;
    }

    // ❌ User cancelled / failed
    backAttemptCount += 1;

    if (backAttemptCount >= MAX_ATTEMPTS) {
      Alert.alert(
        "Authentication Required",
        "Too many attempts. Exiting app.",
        [
          {
            text: "OK",
            onPress: () => BackHandler.exitApp(),
          },
        ]
      );
      return false;
    }

    // 🔁 Retry biometric (controlled recursion)
    await delay(400);
    return await requireBiometric();

  } catch (error) {
    Alert.alert("Error", "Biometric authentication failed");
    return false;
  }
}

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));
