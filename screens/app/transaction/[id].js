import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, ToastAndroid, Platform, Clipboard, Share } from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@react-native-vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { captureRef } from "react-native-view-shot";  // Import captureRef from react-native-view-shot

// Function to generate random numbers
const getRandomNumber = (length) =>
  Math.floor(Math.random() * 10 ** length).toString().padStart(length, "0");

const TransactionDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;  // Get ID from params
  const [transaction, setTransaction] = useState(null);
  const [showDetails, setShowDetails] = useState(true);
  const viewRef = useRef(null);  // Reference for capturing the view

  // Dummy data for the transaction (replace with real data fetching)
  useEffect(() => {
    const selectedTransaction = {
      id: id,
      sender: "1234",
      receiver: "5678",
      amount: 500,
      transactionId: "T12345678901234567890",
      utr: "UTR123456789012",
      date: Date.now(),
    };
    
    setTransaction({
      ...selectedTransaction,
      sender: selectedTransaction.sender || getRandomNumber(4),
      receiver: selectedTransaction.receiver || getRandomNumber(4),
      transactionId: selectedTransaction.transactionId || `T${getRandomNumber(20)}`,
      utr: selectedTransaction.utr || getRandomNumber(12),
    });
  }, [id]);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    if (Platform.OS === "android") {
      ToastAndroid.show("Transaction ID copied!", ToastAndroid.SHORT);
    }
  };

  const shareScreenshot = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 0.8,
      });
      Share.share({ url: uri });
    } catch (error) {
      console.error("Error sharing screenshot:", error);
    }
  };

  if (!transaction) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
          <Ionicons name="arrow-back" size={25} color="#444" />
        </Pressable>
        <View>
          <Text style={styles.headerText}>Transaction Successful</Text>
          <Text style={styles.dateText}>{new Date(transaction.date || Date.now()).toDateString()}</Text>
        </View>
      </View>
      

      {/* Transaction Card */}
      <View style={styles.card} ref={viewRef} collapsable={false}>
        <Text style={styles.sectionTitle}>{transaction.amount > 0 ? "Received from" : "Sent to"}</Text>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            {transaction.amount > 0 ? (
              <Feather name="arrow-down-left" size={27} color="white" />
            ) : (
              <Image source={require("../../assets/drawer/person.png")} style={styles.iconImage} />
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>XXXXX{(transaction.sender || "0000").slice(-4)}</Text>
            <Text style={styles.amountText}>₹{transaction.amount}</Text>
          </View>
        </View>

        {/* Transfer Details */}
        <View style={styles.transferDetails}>
          <Pressable onPress={() => setShowDetails(!showDetails)} style={styles.dropdownHeader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={require("../../assets/drawer/details.png")} style={{ width: 20, height: 20 }} />
              <Text style={styles.transferDetailsTitle}>Transfer Details</Text>
            </View>
            <Ionicons name={showDetails ? "chevron-up" : "chevron-down"} size={20} color="black" />
          </Pressable>

          {showDetails && (
            <View style={styles.transferDetailsText}>
              <View>
                <Text style={styles.detailLabel}>Transaction ID</Text>
                <Pressable onPress={() => copyToClipboard(transaction.transactionId)}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.detailValue}>{transaction.transactionId}</Text>
                    <Image source={require("../../assets/drawer/copy.png")} style={{ width: 20, height: 20, marginLeft: "auto" }} />
                  </View>
                </Pressable>
              </View>
              <View>
                <Text style={styles.detailLabel}>
                  {transaction.amount > 0 ? "Credited to" : "Debited from"}
                </Text>
                <View style={styles.row}>
                  <View style={styles.iconWithText}>
                    <Image source={require("../../assets/drawer/bank-logo.png")} style={{ width: 50, height: 50 }} />
                    <View>
                      <Text style={styles.detailValue}>XXXXXX{transaction.receiver.slice(-4)}</Text>
                      <Text style={styles.detailLabel}>UTR: {transaction.utr}</Text>
                    </View>
                  </View>
                  <Text style={styles.detailValue}>₹{transaction.amount}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {[ 
            { label: "Send Money", icon: <Feather name="arrow-up-right" size={28} color="white" /> },
            { label: "Check Balance", icon: <MaterialIcons name="account-balance" size={28} color="white" /> },
            { label: "View History", icon: <Ionicons name="time-outline" size={28} color="white" /> },
            { label: "Share Receipt", icon: <Feather name="share-2" size={28} color="white" />, action: shareScreenshot },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.actionButton} onPress={item.action || (() => {})}>
              <View style={styles.iconWrapper}>{item.icon}</View>
              <Text style={styles.actionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { backgroundColor: "#FFA500", paddingVertical: 10, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", gap: 20 },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#FFF" },
  dateText: { color: "#FFFFFF", fontSize: 15 },
  card: { margin: 10, padding: 10, borderRadius: 16, borderWidth: 1, borderColor: "#E0E0E0", backgroundColor: "#fff", elevation: 5 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  iconContainer: { backgroundColor: "#FFA500", padding: 10, borderRadius: 50 },
  iconImage: { width: 40, height: 40, borderRadius: 20 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", flex: 1 },
  infoText: { fontSize: 16, color: "#333" },
  amountText: { fontSize: 16, color: "#00C853" },
  transferDetails: { marginTop: 20 },
  dropdownHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  transferDetailsTitle: { fontSize: 18, fontWeight: "bold" },
  transferDetailsText: { marginTop: 10, paddingLeft: 10 },
  detailLabel: { fontSize: 14, color: "#666" },
  detailValue: { fontSize: 16, color: "#333", marginTop: 5 },
  actions: { marginTop: 20 },
  actionButton: { flexDirection: "row", alignItems: "center", marginVertical: 10, padding: 10, backgroundColor: "#FFA500", borderRadius: 8 },
  iconWrapper: { marginRight: 10 },
  actionText: { fontSize: 16, color: "#FFF" },
});

export default TransactionDetails;
