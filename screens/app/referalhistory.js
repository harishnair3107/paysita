import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from "axios";
import { Image } from 'expo-image';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';

const referralData = [
   { id: "1", name: "name_anita_rao", mobile: "9012345678", product: "product_painting", amount: "₹15,000", status: "status_pending", dateTime: "2025-03-25T12:15:00", coins: 15 },
  { id: "2", name: "name_ananya_sharma", mobile: "9765432101", product: "product_credit_card", amount: "₹2,00,000", status: "status_rejected", dateTime: "2025-03-24T14:15:00", coins: 200 },
  { id: "3", name: "name_ishita_verma", mobile: "9823456789", product: "product_personal_loan", amount: "₹5,00,000", status: "status_approved", dateTime: "2025-03-23T10:45:00", coins: 500 },
  { id: "4", name: "name_neha_kapoor", mobile: "9234567890", product: "product_car_loan", amount: "₹9,00,000", status: "status_process", dateTime: "2025-03-22T09:30:00", coins: 900 },
  { id: "5", name: "name_meera_nair", mobile: "9456789012", product: "product_interior_design", amount: "₹1,20,000", status: "status_hold", dateTime: "2025-03-21T13:00:00", coins: 120 },
  { id: "6", name: "name_priya_iyer", mobile: "9101234567", product: "product_home_renovation", amount: "₹2,50,000", status: "status_disbursed", dateTime: "2025-03-20T11:15:00", coins: 250 },
  { id: "7", name: "name_sneha_yadav", mobile: "9023456789", product: "product_insurance", amount: "₹5,00,000", status: "status_not_interested", dateTime: "2025-03-19T15:45:00", coins: 500 },
  { id: "8", name: "name_divya_menon", mobile: "9876543201", product: "product_web_developer", amount: "₹60,000", status: "status_completed", dateTime: "2025-03-18T16:00:00", coins: 60 },
  { id: "9", name: "name_riya_das", mobile: "9678901234", product: "product_home_loan", amount: "₹8,00,000", status: "status_approved", dateTime: "2025-03-17T17:30:00", coins: 800 },
  { id: "10", name: "name_aarohi_joshi", mobile: "9890123456", product: "product_pest_control", amount: "₹2,000", status: "status_completed", dateTime: "2025-03-16T08:00:00", coins: 2 },
];

const ReferalHistory = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(referralData);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredData(referralData);
    } else {
      const filtered = referralData.filter(
        (item) =>
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.product.toLowerCase().includes(text.toLowerCase()) ||
          item.status.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    if (isNaN(date)) return "Invalid Date";

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved": return { color: "#2ECC71" };
      case "Completed": return { color: "#27AE60" };
      case "Disbursed": return { color: "#1E8449" };
      case "Pending": return { color: "#F39C12" };
      case "Rejected": return { color: "#E74C3C" };
      case "Process": return { color: "#9B59B6" };
      case "Hold": return { color: "#E67E22" };
      case "Purchased": return { color: "#3498DB" };
      case "Not Interested": return { color: "#8E44AD" };
      default: return { color: "#7F8C8D" };
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={require("../../assets/drawer/person.png")} style={styles.avatar} />
        <View style={styles.details}>
          <Text style={styles.name}>{t(item.name)}</Text>
          <Text style={styles.info}>{t("mobile")}: {item.mobile}</Text>
          <Text style={styles.info}>{t("product")}: {t(item.product)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{item.amount}</Text>
          <Text style={styles.time}>{formatDateTime(item.dateTime)}</Text>
          <Text style={[styles.status, getStatusStyle(item.status)]}>{t(item.status)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
          <Ionicons name="arrow-back" size={25} color="#444" />
        </Pressable>
        <Text style={styles.headertext}>{t("referral_title")}</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#333" />
        <TextInput
          placeholder={t("search_placeholder")}
          value={searchText}
          onChangeText={handleSearch}
          style={styles.searchInput} />
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ReferalHistory;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F9" },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  headertext: { fontSize: 20, fontWeight: 'bold', marginLeft: 25, color: '#1D154A' },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 30, paddingHorizontal: 20, paddingVertical: 10, margin: 20, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
  searchInput: { flex: 1, fontSize: 16, color: "#333", paddingRight: 10 },
  card: { backgroundColor: "#fff", borderRadius: 15, marginBottom: 15, marginHorizontal: 10, padding: 12, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 },
  row: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  details: { flex: 1 },
  name: { fontSize: 18, fontWeight: "600", color: "#333" },
  info: { fontSize: 14, color: "#777" },
  amountContainer: { alignItems: "flex-end" },
  amount: { fontSize: 16, fontWeight: "bold", color: "#1D154A" },
  time: { fontSize: 12, color: "#999" },
  status: { fontSize: 14, fontWeight: "bold", marginTop: 8 }
});  