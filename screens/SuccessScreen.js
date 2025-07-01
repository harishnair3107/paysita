import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';

const SuccessScreen = ({route}) => {
  const navigation = useNavigation();
  // const route = useRoute();
  const [rechargeResult, setRechargeResult] = useState('');
  
  // Extracting params from the route
  const {  successData,
        phoneNumber,
        selectedPlan,
        operatorName,amount
  } = route.params || {};
  console.log('Route params:', route.params);
  console.log('sucessdata:', successData);

  // Check if sucessdata is undefined or missing refid
  if (!successData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error: Recharge data not available.</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LottieView 
        // source={require("../assets/mobile/success.json")} 
        autoPlay 
        loop={false} 
        style={styles.animation}
      />

      <Text style={styles.title}>Recharge Successful!</Text>
      {/* Detailed Transaction Box */}
      <View style={styles.detailsBox}>
        <Text style={styles.detailsTitle}>Transaction Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone Number: {phoneNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount: {amount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Operator: { operatorName}</Text>
        </View>
        {/* Check if refid exists */}
        {successData.refid ? (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reference ID: {successData.refid}</Text>
          </View>
        ) : (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reference ID: Not Available</Text>
          </View>
        )}

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status: {successData.message}</Text>
        </View>
      </View>

      {/* <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("DoRecharge")}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 20,
  },
  animation: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  detailsBox: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});