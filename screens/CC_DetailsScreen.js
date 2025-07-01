import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const CC_DetailsScreen = ({ route, navigation }) => {
  const { provider } = route.params;

  const [cardDigits, setCardDigits] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState(provider?.network || "VISA");

  const remarks = "BILL PAYMENT";

  const isFormValid =
    cardHolder &&
    payeeName &&
    cardDigits.length === 4 &&
    mobile.length === 10 &&
    parseFloat(amount) > 0;

  const handleConfirm = async () => {
    const refid = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const fullCardNumber = `XXXXXXXXXXXX${cardDigits}`;
console.log(refid)
    const options = {
      method: "POST",
      url: "https://sit.paysprint.in/service-api/api/v1/service/cc-payment/ccpayment/generateotp",
      headers: {
        accept: 'application/json',
        Token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDQxNzk3ODUsInBhcnRuZXJJZCI6IlBTMDAxOTg2IiwicmVxaWQiOiIxMjIzNTYifQ.kR-lBpUldQ22P4OtCwMu7T4stVT2EQ_pSbMoV9EYvYo',
        Authorisedkey: 'MWM5YTI1NjRiMTk3OTA2NDQ1M2EwY2RjMjc4NjVjNzI=',
        "Content-Type": 'application/json',
      },
      data: {
        refid,
        name: 'cardHolder',
        mobile,
        card_number: cardDigits,
        amount,
        remarks,
        network,
        payee_name: 'payeeName',
      },
    };

    try {
      const response = await axios.request(options);
      console.log("✅ OTP Sent:", response.data);
    alert("OTP Has Been Sent");
      navigation.navigate("changeupipins", {
        refid,
        name: cardHolder,
        payee_name: payeeName,
        mobile,
        card_number: fullCardNumber,
        amount,
        network,
        remarks,provider,
      });
    } catch (error) {
      console.error("❌ API Error:", error);
      Alert.alert("Error", "Failed to generate OTP. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{provider.name}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={cardHolder}
            onChangeText={setCardHolder}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Payee Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter payee name"
            value={payeeName}
            onChangeText={setPayeeName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last 4 Digits of Card</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={4}
            placeholder="0000"
            value={cardDigits}
            onChangeText={setCardDigits}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.mobileInputWrapper}>
            <TextInput
              style={[styles.input, styles.mobileInput]}
              keyboardType="numeric"
              maxLength={10}
              placeholder="Enter mobile"
              value={mobile}
              onChangeText={setMobile}
            />
            <TouchableOpacity>
              <Image
                source={require("../assets/cc/contact.png")}
                style={styles.contactIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount (₹)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Network</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={network}
              onValueChange={(itemValue) => setNetwork(itemValue)}
            >
              <Picker.Item label="VISA" value="VISA" />
              <Picker.Item label="MasterCard" value="MASTERCARD" />
              <Picker.Item label="RuPay" value="RUPAY" />
              <Picker.Item label="AMEX" value="AMEX" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            isFormValid ? styles.enabled : styles.disabled,
          ]}
          disabled={!isFormValid}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>CONFIRM</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  header: {
    paddingVertical: 15,
    backgroundColor: "#FFA500",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  mobileInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
  },
  mobileInput: {
    flex: 1,
    padding: 10,
  },
  contactIcon: {
    width: 24,
    height: 24,
    margin: 10,
  },
  pickerWrapper: {
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    overflow: "hidden",
  },
  confirmButton: {
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  enabled: {
    backgroundColor: "#FFA500",
  },
  disabled: {
    backgroundColor: "#D3D3D3",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CC_DetailsScreen;
