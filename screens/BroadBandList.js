import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icon library
import { useTranslation } from "react-i18next";

const broadbandProviders = [
  { id: "1", nameKey: "provider.bsnl", image: require("../assets/BSNL.png") },
  { id: "2", nameKey: "provider.act", image: require("../assets/ACT.png") },
  { id: "3", nameKey: "provider.airtel_broadband", image: require("../assets/Airtel.png") },
  { id: "4", nameKey: "provider.airtel_landline", image: require("../assets/Airtel1.png") },
  { id: "5", nameKey: "provider.airtel_wifi", image: require("../assets/Airtel.png") },
  { id: "6", nameKey: "provider.alliance", image: require("../assets/Alliance.png") },
  { id: "7", nameKey: "provider.excell", image: require("../assets/Excell.png") },
];

const BroadBandList = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const filteredProviders = broadbandProviders.filter((provider) =>
    provider.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
  <Text style={styles.header}>{t("broadband_list.select_provider")}</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
            placeholder={t("broadband_list.search_placeholder")}

          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Broadband List */}
      <FlatList
        data={filteredProviders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.providerContainer}>
            {/* Provider Logo & Name */}
            <TouchableOpacity
              style={styles.providerInfo}
              onPress={() =>
                navigation.navigate("BroadBandDetailsScreen", {
                  providerName: item.name,
                  providerImage: item.image,
                })
              }
            >
              <Image source={item.image} style={styles.providerImage} />
              <Text style={styles.providerText}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default BroadBandList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  providerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    justifyContent: "space-between",
  },
  providerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  providerImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  providerText: {
    fontSize: 16,
  },
  infoButton: {
    padding: 5,
  },
});