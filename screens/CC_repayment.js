import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { ThemeContext } from "../theme/Theme";

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

const CC_repayment = () => {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);

  const [banks, setBanks] = useState(HARD_CODED_BANKS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Hide the default navigator header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://api.example.com/banks");
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

  // Filter banks based on search query
  const filteredPopular = banks.popular.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredAllBanks = banks.allBanks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = createStyles(colors);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar
          backgroundColor={colors.background}
          barStyle="dark-content"
          translucent={false}
        />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.loadingText}>Loading banks...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Credit Card Payment</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Container */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.muted} />
          <TextInput
            placeholder="Search banks"
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={colors.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.content}>
        {/* Popular Banks */}
        {filteredPopular.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Ionicons name="star" size={20} color={colors.accent} />
              <Text style={styles.sectionTitle}>Popular Banks</Text>
            </View>
            <View style={styles.popularGrid}>
              {filteredPopular.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.bankItem}
                  onPress={() => handleSelectBank(item)}
                >
                  <View style={styles.bankLogoWrapper}>
                    <Image source={item.logo} style={styles.bankLogo} />
                  </View>
                  <Text style={styles.bankName} numberOfLines={2}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* All Banks */}
        {filteredAllBanks.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Ionicons name="business" size={20} color={colors.accent} />
              <Text style={styles.sectionTitle}>All Banks</Text>
            </View>
            <View style={styles.allBanksCard}>
              <FlatList
                data={filteredAllBanks}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[
                      styles.allBankItem,
                      index < filteredAllBanks.length - 1 && styles.allBankItemBorder,
                    ]}
                    onPress={() => handleSelectBank(item)}
                  >
                    <View style={styles.allBankLogoWrapper}>
                      <Image source={item.logo} style={styles.allBankLogo} />
                    </View>
                    <Text style={styles.allBankName}>{item.name}</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                  </TouchableOpacity>
                )}
                scrollEnabled={false}
              />
            </View>
          </>
        )}

        {/* Empty State */}
        {filteredPopular.length === 0 && filteredAllBanks.length === 0 && (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrapper}>
              <Ionicons name="search" size={48} color={colors.muted} />
            </View>
            <Text style={styles.emptyTitle}>No Banks Found</Text>
            <Text style={styles.emptySubtitle}>Try a different search term</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    // Header
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      letterSpacing: 0.3,
    },
    headerSpacer: {
      width: 40,
    },

    // Loading
    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.subtext,
      marginTop: 12,
    },

    // Search
    searchWrapper: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.option,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 10,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
    },

    // Content
    content: {
      flex: 1,
      paddingHorizontal: 16,
    },

    // Section Header
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 20,
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: colors.text,
    },

    // Popular Grid
    popularGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 12,
    },
    bankItem: {
      width: "30%",
      alignItems: "center",
      backgroundColor: colors.option,
      padding: 14,
      borderRadius: 16,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    bankLogoWrapper: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    bankLogo: {
      width: 44,
      height: 44,
      resizeMode: "contain",
    },
    bankName: {
      fontSize: 11,
      fontWeight: "600",
      color: colors.text,
      textAlign: "center",
      lineHeight: 14,
    },

    // All Banks
    allBanksCard: {
      backgroundColor: colors.option,
      borderRadius: 16,
      overflow: "hidden",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    allBankItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      paddingVertical: 14,
      backgroundColor: colors.option,
    },
    allBankItemBorder: {
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    },
    allBankLogoWrapper: {
      width: 44,
      height: 44,
      borderRadius: 10,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    allBankLogo: {
      width: 32,
      height: 32,
      resizeMode: "contain",
    },
    allBankName: {
      flex: 1,
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },

    // Empty State
    emptyContainer: {
      alignItems: "center",
      paddingTop: 80,
    },
    emptyIconWrapper: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: colors.divider,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 6,
    },
    emptySubtitle: {
      fontSize: 14,
      color: colors.muted,
    },
  });

export default CC_repayment;