import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoanDetailsScreen = ({ route, navigation }) => {
  const { provider } = route.params;
  const [agreementNumber, setAgreementNumber] = useState("");

  const isValid = agreementNumber.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header (Shifted Up) */}
      <View style={styles.header}>
        <Image source={provider.logo} style={styles.logo} />
        <View style={styles.headerText}>
          <Text style={styles.providerName}>{provider.name}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Agreement Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Agreement Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Agreement Number"
          value={agreementNumber}
          onChangeText={setAgreementNumber}
        />
        <Text style={styles.errorText}>Please enter your valid Agreement Number</Text>
      </View>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoText}>6 lakh users made EMI payment in the last month.</Text>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity style={[styles.proceedButton, !isValid && styles.disabledButton]} disabled={!isValid}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>

      {/* Footer Info */}
      <Text style={styles.footerText}>
        Paying this bill allows Paytm to fetch your bills and remind you whenever a bill is due
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 10, // Reduce top padding
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Reduced space below header
    position: "absolute", // Shift up
    top: 10, // Moves it to the top
    left: 20,
    right: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  providerName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  changeText: {
    color: "#007BFF",
    fontSize: 14,
  },
  inputContainer: {
    marginTop: 80, // Added space so input does not overlap with header
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: "#888",
    fontSize: 12,
    marginTop: 5,
  },
  infoBanner: {
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    color: "#388E3C",
    fontSize: 14,
  },
  proceedButton: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
  },
  proceedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
});

export default LoanDetailsScreen;