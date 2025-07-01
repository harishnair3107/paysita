import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
Alert,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useNavigation } from '@react-navigation/native'; // <--- Add this line
const Ccpaybill = ({ route ,navigation}) => {
  const {
    refid,
    name: cardHolder,
    payee_name: payeeName,
    mobile,
    card_number: cardNumber,
    amount,
    network,
    remarks,
    otp,
    provider,
  } = route.params || {};

  const handlePayBill = async () => {
    // Clean card number (digits only)
    const cleanCardNumber = cardNumber?.replace(/\D/g, "");

    if (!otp) {
      Alert.alert("Missing OTP", "Please enter the OTP before proceeding.");
      return;
    }

    const options = {
      method: "POST",
      url: 'https://sit.paysprint.in/service-api/api/v1/service/cc-payment/ccpayment/paybill',
      headers: {
        accept: 'application/json',
        Token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDQyNjIzMTAsInBhcnRuZXJJZCI6IlBTMDAxOTg2IiwicmVxaWQiOiIxMjIzOTEifQ.SzipmqvpbV4Vt1L-PgEBCl-f03CiciQWyipfvHsPNG0',        Authorisedkey: 'MWM5YTI1NjRiMTk3OTA2NDQ1M2EwY2RjMjc4NjVjNzI=',
        Authorisedkey: 'MWM5YTI1NjRiMTk3OTA2NDQ1M2EwY2RjMjc4NjVjNzI=',
        'Content-Type': 'application/json',
      },
      data: {
        refid: '800909876543',  
        name: 'pooja',
        mobile: 9137849491,
        card_number: '12341234567845678',
        amount: '200.00',
        remarks: 'BILL PAYMENT',
        network: 'VISA',
        otp: 222111,
        payee_name: 'raj'
      
      },
    };

    try {
      const response = await axios.request(options);
      console.log("✅ Pay Bill Success:", response.data);

      if (response.data.message === "Transaction Successful") {
        navigation.navigate("success ",{ refid,
          name: cardHolder,
          payee_name: payeeName,
          mobile,
          card_number: cardNumber,
          amount,
          network,
          remarks,
          otp,
          provider,})

        // Optionally navigate or reset here
      } else {
        Alert.alert("Failed", response.data.message);
      }
    } catch (error) {
      console.error("❌ Payment API Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LinearGradient colors={["#FFA500", "#FFA500"]} style={styles.cardHeader}>
          <Image
            // source={require("../assets/mobile/logo.png")}
            style={styles.bankLogo}
          />
          <View>
            <Text style={styles.bankName}>{provider?.name || "Provider"}</Text>
            <Text style={styles.cardNumber}>{cardNumber}</Text>
            <Text style={styles.cardNumber}>{mobile}</Text>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Bill Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValue}>{amount}</Text>
        </View>

        <Text style={styles.sectionTitle}>Transaction Details</Text>
        {[
          ["Ref ID", refid],
          ["Name", cardHolder],
          ["Mobile", mobile],
          ["Card No", cardNumber],
          ["Amount", amount],
          ["Remarks", remarks],
          ["Network", network],
          ["OTP", otp],
          ["Payee Name", payeeName],
        ].map(([label, value]) => (
          <View style={styles.detailRow} key={label}>
            <Text style={styles.detailLabel}>{label}:</Text>
            <Text style={styles.detailValue}>{value}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={handlePayBill}>
        <LinearGradient colors={["#1D154A", "#1D154A"]} style={styles.payButton}>
          <Text style={styles.payButtonText} >PAY YOUR BILL</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Ccpaybill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bankLogo: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cardNumber: {
    fontSize: 14,
    color: "#ddd",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    paddingHorizontal: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  payButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 15,
  },
  payButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});
