import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, Alert, StyleSheet } from "react-native";
import * as Contacts from "expo-contacts";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const TransferMoneyScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchContacts() {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        setContacts(data.filter((c) => c.phoneNumbers && c.phoneNumbers.length > 0));
      } else {
        Alert.alert("Permission Denied", "Cannot access contacts.");
      }
    }
    fetchContacts();
  }, []);

  const handleSendMoney = () => {
    if (!selectedContact || !amount) {
      Alert.alert("Error", "Please select a contact and enter an amount.");
      return;
    }
    Alert.alert("Success", `₹${amount} sent to ${selectedContact.name}`, [
      { text: "OK", onPress: () =>   // Navigate to PaymentScreen with name and amount
        navigation.navigate("PaymentScreen", {
          name: selectedContact.name,
          amount: amount,
        }) }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Send Money</Text>
      <TextInput
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.amountInput}
      />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.contactItem, selectedContact?.id === item.id && styles.contactSelected]}
            onPress={() => setSelectedContact(item)}
          >
            <Text style={styles.contactName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
  
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSendMoney} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send Money</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("NewPaymentScreen")} style={styles.newPaymentButton}>
          <Text style={styles.newPaymentButtonText}>New Payment</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.splitButton}
        onPress={() => navigation.navigate("SplitExpenseScreen")}
      >
        <Text style={styles.splitButtonText}>Split Expenses</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransferMoneyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  contactSelected: {
    backgroundColor: "#d0f0c0",
  },
  contactName: { fontSize: 16 },
  amountInput: {
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 8,
    backgroundColor:"#ddd",
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  sendButton: {
    backgroundColor: "#ffa500",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  sendButtonText: { fontSize: 18, fontWeight: "bold", color: "#1d154a" },
  newPaymentButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 5,
  },
  newPaymentButtonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  splitButton: {
    backgroundColor: "#1d15a4",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  splitButtonText: { fontSize: 18, fontWeight: "bold",color:"#fff" },
});
