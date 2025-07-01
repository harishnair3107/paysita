import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
const HARD_CODED_BANKS = {
  popular: [
    { id: "1", name: "HDFC Bank Credit Card", logo: require("../assets/cc/hdfc.png") },
    { id: "2", name: "Axis Bank Credit Card", logo: require("../assets/cc/axis.png") },
    { id: "3", name: "State Bank of India Credit", logo: require("../assets/cc/sbi.png") },
    { id: "4", name: "ICICI Bank Credit Card", logo: require("../assets/cc/icici.png") },
    { id: "5", name: "Kotak Mahindra Bank", logo: require("../assets/cc/kotak.png") },
    { id: "6", name: "RBL Credit Card", logo: require("../assets/cc/rbl.png") },
  ],
  allBanks: [
    { id: "7", name: "AU SMALL Finance Bank Credit Card", logo: require("../assets/cc/au.png") },
    { id: "8", name: "Dhanlaxmi Bank Limited", logo: require("../assets/cc/dhanlaxmi.jpeg") },
  ],
};
const CC_repayment = ({ navigation }) => {
  const [banks, setBanks] = useState(HARD_CODED_BANKS);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://api.example.com/banks"); // Replace with actual API URL
        if (response.data) {
          setBanks(response.data);
        }
      } catch (error) {
        console.error("API Error, using hardcoded data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);
  const handleSelectBank = (bank) => {
    navigation.navigate("CC_DetailsScreen", { provider: bank });
  };
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Search Container */}
      <View style={styles.searchContainer}>
        <Image source={require("../assets/cc/search.png")} style={styles.image} />
        <TextInput placeholder="Search banks" style={styles.input} />
      </View>

      {/* Popular Banks */}
      <Text style={styles.sectionTitle}>Popular banks</Text>
      <FlatList
        data={banks.popular}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bankItem} onPress={() => handleSelectBank(item)}>
            <Image source={item.logo} style={styles.bankLogo} />
            <Text style={styles.bankName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* All Banks */}
      <Text style={styles.sectionTitle}>ALL banks</Text>
      <FlatList
        data={banks.allBanks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.allBankItem} onPress={() => handleSelectBank(item)}>
            <Image source={item.logo} style={styles.allBankLogo} />
            <Text style={styles.bankName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bankItem: {
    flex: 1,
    alignItems: "center",
    margin: 8,
  },
  bankLogo: {
    width: 50,
    height: 50,
  },
  bankName: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  allBankItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
  },
  allBankLogo: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
});

export default CC_repayment;