import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";

const PipedGasDetailsScreen = ({ route, navigation }) => {
  const { provider } = route.params;
  const [customerId, setCustomerId] = useState("");

  const isValidCustomerId = customerId.length === 12;

  return (
    <View style={styles.container}>
      {/* Provider Info */}
      <View style={styles.providerContainer}>
        <Image source={provider.logo} style={styles.image} />
        <Text style={styles.name}>{provider.name}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>
      
      {/* Customer ID Input */}
      <Text style={styles.label}>Customer ID</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Customer ID"
          keyboardType="numeric"
          maxLength={12}
          value={customerId}
          onChangeText={setCustomerId}
        />
        <TouchableOpacity>
          <Text style={styles.sampleBillText}>View Sample Bill</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={[
          styles.helperText,
          !isValidCustomerId && customerId.length > 0 ? styles.errorText : null,
        ]}
      >
        {customerId.length > 0 && !isValidCustomerId
          ? "Customer ID must be exactly 12 digits"
          : "Please enter your 12-digit Customer ID"}
      </Text>

      {/* Proceed Button */}
      <TouchableOpacity
        style={[styles.proceedButton, !isValidCustomerId && styles.disabledButton]}
        disabled={!isValidCustomerId}
        // onPress={() => {
        //   // Example navigation to Payment screen or similar
        //   navigation.navigate("GasPayment", { provider, customerId });
        // }}
      >
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  providerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  changeText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  sampleBillText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  helperText: {
    fontSize: 12,
    color: "gray",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
  },
  proceedButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "lightgray",
  },
  proceedText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PipedGasDetailsScreen;
