import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const DthSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [rechargeResult, setRechargeResult] = useState('');
  const { successdata, selectedPlan, name,subscriberId } = route.params;
  console.log('sucessdata:', successdata);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DTH Recharge Successful!</Text>

      <View style={styles.detailsBox}>
        <Text style={styles.detailsTitle}>Transaction Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>DTH Name:</Text>
          <Text style={styles.detailValue}>{name}</Text>
        </View>
           <View style={styles.detailRow}>
                   <Text style={styles.detailLabel}>Subscriber ID:</Text>
                   <Text style={styles.detailValue}>{subscriberId}</Text>
                 </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount:</Text>
          <Text style={styles.detailValue}>₹{selectedPlan?.amount}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Plan:</Text>
          <Text style={styles.detailValue}>{selectedPlan?.name}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Reference ID:</Text>
          <Text style={styles.detailValue}>{successdata?.refid}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={styles.detailValue}>{successdata?.message}</Text>
        </View>
      </View>
{/* 
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("Dthrecharge")}
      >
        <Text style={styles.buttonText}>Back to Recharge</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default DthSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  detailsBox: {
    backgroundColor: "#fff",
    width: "107%",
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