import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get params from navigation
  const { name, amount } = route.params || {}; // Extract values

  const [scaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated Checkmark */}
      <Animated.View style={[styles.circle, { transform: [{ scale: scaleValue }] }]}>
        <MaterialIcons name="check-circle" size={80} color="#34A853" />
      </Animated.View>

      {/* Success Message */}
      <Text style={styles.successText}>Payment Successful</Text>

      {/* Transaction Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsText}>₹{amount} sent to {name}</Text>
        <Text style={styles.transactionID}>Txn ID: {Math.floor(Math.random() * 100000000)}</Text>
      </View>

      {/* Back to Home Button */}
     
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F0F0F0" },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0F7E9",
    justifyContent: "center",
    alignItems: "center",
  },
  successText: { fontSize: 22, fontWeight: "bold", color: "#34A853", marginTop: 15 },
  detailsCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
    alignItems: "center",
  },
  detailsText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  transactionID: { fontSize: 14, color: "#666", marginTop: 5 },
  button: {
    backgroundColor: "#6a0dad",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});