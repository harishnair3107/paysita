import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const gasProviders = [
  {
    category: "Top Piped Gas Provider",
    data: [
      { name: "Gujarat Gas Limited", logo: require("../assets/gujarat-Gas.png") },
      { name: "Mahanagar Gas- Mumbai", logo: require("../assets/mahanagar-Gas.png") },
      { name: "Adani Total Gas Limited", logo: require("../assets/adani-Gas.png") },
      { name: "AGP CGD India Pvt Ltd", logo: require("../assets/AGP-CGD.png") },
    ],
  },
  {
    category: "Other Piped Gas Provider",
    data: [
      { name: "AGP City Gas Pvt Ltd", logo: require("../assets/AGP-City.png") },
      { name: "Aavantika Gas Ltd", logo: require("../assets/Aavantiks-Gas.png") },
      { name: "Assam Gas Company Limited", logo: require("../assets/Assam-Gas.png") },
    ],
  },
  {
    category: "Select Gas Provider",
    data: [
      { name: "Gujarat Gas Limited", logo: require("../assets/gujarat-Gas.png") },
      { name: "Mahanagar Gas- Mumbai", logo: require("../assets/mahanagar-Gas.png") },
      { name: "Adani Total Gas Limited", logo: require("../assets/adani-Gas.png") },
      { name: "AGP CGD India Pvt Ltd", logo: require("../assets/AGP-CGD.png") },
    ],
  },
];

const PipedGasList = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("Pay Gas Bill");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProviders = selectedOption === "Book a Cylinder"
    ? [gasProviders[2]]
    : gasProviders.slice(0, 2);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      {/* Radio Buttons */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <RadioButton
          value="Pay Gas Bill"
          status={selectedOption === "Pay Gas Bill" ? "checked" : "unchecked"}
          onPress={() => setSelectedOption("Pay Gas Bill")}
        />
        <Text>Pay Gas Bill</Text>
        <RadioButton
          value="Book a Cylinder"
          status={selectedOption === "Book a Cylinder" ? "checked" : "unchecked"}
          onPress={() => setSelectedOption("Book a Cylinder")}
        />
        <Text>Book a Cylinder</Text>
      </View>

      {/* Search Bar */}
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
      }}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          style={{ flex: 1, marginLeft: 10 }}
          placeholder="Search Piped Gas Provider"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Providers List */}
      <FlatList
        data={filteredProviders}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View>
            <Text style={{
              fontSize: 16,
              fontWeight: "bold",
              backgroundColor: "#f2f2f2",
              padding: 10,
            }}>
              {item.category}
            </Text>
            {item.data
              .filter((provider) =>
                provider.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((provider, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ddd",
                  }}
                  onPress={() => navigation.navigate("PipedGasDetailsScreen", { provider })}
                >
                  <Image
                    source={provider.logo}
                    style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
                  />
                  <Text style={{ fontSize: 16 }}>{provider.name}</Text>
                </TouchableOpacity>
              ))}
          </View>
        )}
      />
    </View>
  );
};

export default PipedGasList;
