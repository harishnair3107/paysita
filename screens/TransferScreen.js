import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

const TransferScreen = ({ route, navigation }) => {
  const { account } = route.params;
  const [amount, setAmount] = useState("");

  const handleTransfer = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
      return;
    }
    Alert.alert("Transaction Successful", `₹${amount} sent to ${account.name}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={account.logo} style={styles.bankLogo} />
        <Text style={styles.title}>{account.name}</Text>
        <Text style={styles.upiId}>{account.upiId}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <TouchableOpacity style={styles.button} onPress={handleTransfer}>
          <Text style={styles.buttonText}>Send Money</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransferScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bankLogo: {
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1e293b",
  },
  upiId: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderColor: "#cbd5e1",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1e293b",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1d154a",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
