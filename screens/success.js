import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const Success = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {  refid,
    name: cardHolder,
    payee_name: payeeName,
    mobile,
    card_number: cardNumber,
    amount,
    network,
    remarks,
    otp,
    provider, } = route.params ;


  const options = {
    method: 'POST',
    url: 'https://sit.paysprint.in/service-api/api/v1/service/cc-payment/ccpayment/status',
    headers: {
      accept: 'application/json',
      Token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQQVlTUFJJTlQiLCJ0aW1lc3RhbXAiOjE2MTAwMjYzMzgsInBhcnRuZXJJZCI6IlBTMDAxIiwicHJvZHVjdCI6IldBTExFVCIsInJlcWlkIjoxNjEwMDI2MzM4fQ.buzD40O8X_41RmJ0PCYbBYx3IBlsmNb9iVmrVH9Ix64',
      'Content-Type': 'application/json'
    },
    data: {refid: 20210428}
  };
  
  axios
    .request(options)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));

  return (
    <View style={styles.container}>
      <LottieView 
        source={require("../assets/success.json")} 
        autoPlay 
        loop={false} 
        style={styles.animation}
      />

 
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

export default Success;

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