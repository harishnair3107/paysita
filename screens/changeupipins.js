import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Pressable,
  Alert
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const ChangeUpiPins = ({ route }) => {
  const { t } = useTranslation();
  const {
    refid,
    name: cardHolder,
    payee_name: payeeName,
    mobile,
    card_number: fullCardNumber,
    amount,
    network,
    remarks,
    provider
  } = route.params || {};

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const navigation = useNavigation();
  const defaultOtp = "222111";

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      const enteredOtp = newOtp.join('');
      if (enteredOtp === defaultOtp) {
        Alert.alert(t("change_upi.success_title"), t("change_upi.success_message"));
        navigation.navigate('ccpaybill', {
          refid,
          name: cardHolder,
          payee_name: payeeName,
          mobile,
          card_number: fullCardNumber,
          amount,
          network,
          remarks,
          otp,
          provider
        });
      } else {
        Alert.alert(t("change_upi.invalid_title"), t("change_upi.invalid_message"));
        setOtp(['', '', '', '', '', '']);
        inputs.current[0].focus();
      }
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
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </Pressable>
      </View>

      <Text style={styles.headerText}>{mobile}</Text>
      <Text style={styles.headerText}>{t("change_upi.enter_otp")}</Text>

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
    paddingHorizontal: 20,
    gap: 12,
  },
  otpBox: {
    width: 40,
    height: 50,
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ChangeUpiPins;
