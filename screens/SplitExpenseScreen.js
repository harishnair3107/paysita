import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from "react-native";
import * as Contacts from "expo-contacts";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const SplitExpenseScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
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

  const handleSplitSelection = (contact) => {
    if (selectedContacts.find((c) => c.id === contact.id)) {
      setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
    } else {
      if (selectedContacts.length < 8) {
        setSelectedContacts([...selectedContacts, contact]);
      } else {
        Alert.alert("Limit Reached", "You can split expenses with a maximum of 8 friends.");
      }
    }
  };
  const calculateSplitAmount = () => {
    if (amount && selectedContacts.length > 0) {
      return (parseFloat(amount) / (selectedContacts.length + 1)).toFixed(2);
    }
    return "0.00";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Split Expenses</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.contactItem, selectedContacts.find((c) => c.id === item.id) && styles.contactSelected]}
            onPress={() => handleSplitSelection(item)}
          >
            <Text style={styles.contactName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.amountInput}
      />
      <Text style={styles.splitAmountText}>Each Pays: ₹{calculateSplitAmount()}</Text>
      <TouchableOpacity style={styles.confirmButton} onPress={() => Alert.alert("Split Confirmed")}> 
        <Text style={styles.confirmButtonText}>Confirm Split</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplitExpenseScreen;

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
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  splitAmountText: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  confirmButton: {
    backgroundColor: "#6a0dad",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});
