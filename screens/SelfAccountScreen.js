import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

// Sample list of self-linked bank accounts
const selfAccounts = [
  { id: "1", name: "State Bank of India", upiId: "user@sbi", logo: require("../assets/sbi.png") },
  { id: "2", name: "HDFC Bank", upiId: "user@hdfcbank", logo: require("../assets/hdfc.png") },
  { id: "3", name: "ICICI Bank", upiId: "user@icici", logo: require("../assets/icici.jpeg") },
  { id: "3", name: "Axis Bank", upiId: "user@axis", logo: require("../assets/drawer/axis.png") },

];

const SelfAccountScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter accounts based on search query
  const filteredAccounts = selfAccounts.filter(account =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Transfer to Self Account</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search account..."
          placeholderTextColor="#555"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* List of Self Accounts */}
      <FlatList
        data={filteredAccounts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.accountCard}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("TransferScreen", { account: item })}
          >
            <Image source={item.logo} style={styles.bankLogo} />
            <View>
              <Text style={styles.bankName}>{item.name}</Text>
              <Text style={styles.upiId}>{item.upiId}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1d154a",
    textAlign: "center",
    marginBottom: 15,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchInput: {
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  accountCard: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  bankLogo: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 10,
  },
  bankName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  upiId: {
    fontSize: 14,
    color: "#666",
  },
});

export default SelfAccountScreen;
