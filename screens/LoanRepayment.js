import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const LoanRepayment = ({ navigation }) => {
  const [loanProviders, setLoanProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]); // Stores filtered results
  const [searchText, setSearchText] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    axios.get("YOUR_API_URL")
      .then(response => {
        setLoanProviders(response.data);
        setFilteredProviders(response.data); // Set filtered data initially
      })
      .catch(() => {
        const fallbackData = [
          { id: 1, name: "TVS Credit", logo: require("../assets/loan/tvs.png") },
          { id: 2, name: "Bajaj Finance LTD", logo: require("../assets//loan/bajaj.png") },
          { id: 3, name: "DMI Finance", logo: require("../assets//loan/DMI.png") },
        ];
        setLoanProviders(fallbackData);
        setFilteredProviders(fallbackData); // Set filtered data initially
      });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredProviders(loanProviders); // Reset list if search is empty
    } else {
      const filtered = loanProviders.filter(provider =>
        provider.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProviders(filtered);
    }
  };

  const handleSelectProvider = (provider) => {
    setSelectedProvider(provider);
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image source={require("../assets/loan/search.png")} style={styles.searchImage} />
        <TextInput
          placeholder="Search by Lender"
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleSearch} // Calls search function
        />
      </View>

      {/* Loan Providers List */}
      <View style={styles.card}>
        <Text style={styles.title}>All Loan Billers</Text>
        <FlatList
          data={filteredProviders} // Uses filtered data
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.provider}
              onPress={() => navigation.navigate("LoanDetailsScreen", { provider: item })} // Navigate to Details
            >
              <Image source={item.logo} style={styles.providerImage} />
              <Text style={styles.providerText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: "90%",
  },
  searchImage: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  provider: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  providerImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  providerText: {
    fontSize: 16,
  },
});

export default LoanRepayment;