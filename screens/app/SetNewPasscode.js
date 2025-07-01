import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next"; // ✅ i18n hook

const SetNewPasscode = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const navigation = useNavigation();
  const { t } = useTranslation(); // ✅ use translation

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      setTimeout(() => {
        Alert.alert(t("passcode_success"), "", [{ text: t("ok") }]);
      }, 300);
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
      <Text style={styles.headerText}>{t("set_new_passcode")}</Text>

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
  container: { flex: 1, backgroundColor: "#fff" },
  headerText: {
    fontSize: 30,
    marginVertical: 20,
    marginHorizontal: 20,
    fontWeight: "bold",
    color: "#1D154A",
  },
  otpContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
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

export default SetNewPasscode;
