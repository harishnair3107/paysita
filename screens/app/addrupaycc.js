import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const AddRuPayCC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const HARD_CODED_BANKS = {
    popular: [
      { id: "1", name: t("bank_hdfc"), logo: require("../../assets/drawer/hdfc.png") },
      { id: "2", name: t("bank_axis"), logo: require("../../assets/drawer/axis.png") },
      { id: "3", name: t("bank_sbi"), logo: require("../../assets/drawer/sbi.png") },
      { id: "4", name: t("bank_icici"), logo: require("../../assets/drawer/icici.png") },
      { id: "5", name: t("bank_kotak"), logo: require("../../assets/drawer/kotak.png") },
      { id: "6", name: t("bank_rbl"), logo: require("../../assets/drawer/rbl.png") },
    ],
    allBanks: [
      { id: "7", name: t("bank_au"), logo: require("../../assets/drawer/au.png") },
      { id: "8", name: t("bank_dhanlaxmi"), logo: require("../../assets/drawer/dhanlaxmi.jpeg") },
    ],
  };

  const [banks, setBanks] = useState(HARD_CODED_BANKS);

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
    navigation.navigate("Details", { provider: bank });
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
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Search */}
      <View style={styles.searchContainer}>
        <Image source={require("../../assets/drawer/search.png")} style={styles.image} />
        <TextInput placeholder={t("search_banks")} style={styles.input} />
      </View>

      {/* Popular Banks */}
      <Text style={styles.sectionTitle}>{t("popular_banks")}</Text>
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
      <Text style={styles.sectionTitle}>{t("all_banks")}</Text>
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

export default AddRuPayCC;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
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
