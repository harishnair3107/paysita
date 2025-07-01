import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next"; // 🆕 i18n import

const SetupPasscode = () => {
  const { t } = useTranslation(); // 🆕 i18n init
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputs = useRef([]);
  const navigation = useNavigation();

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      setTimeout(() => navigation.navigate("SetNewPasscode"), 300);
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* Header */}
      <Text style={styles.headerText}>{t('enter_otp_message')}</Text>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={[styles.otpBox, otp[index] ? styles.otpBoxFocused : null]}
            keyboardType="numeric"
            maxLength={1}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            autoFocus={index === 0}
          />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 30,
    marginVertical: 20,
    marginHorizontal: 20,
    fontWeight: "bold",
    color: "#1D154A",
  },
  otpContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 8,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  otpBoxFocused: {
    borderColor: '#4CAF50',
  },
});

export default SetupPasscode;