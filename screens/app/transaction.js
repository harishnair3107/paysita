import { StyleSheet, Text, View, Pressable, StatusBar, TextInput, SectionList } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { Link } from "expo-router";
import { Image } from 'expo-image';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next"; // ✅ Import for i18next

// Helper to format month
const getMonthYear = (date) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const d = new Date(date);
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
};

// Helper to group transactions by month
const groupByMonth = (data) => {
  const grouped = {};
  data.forEach((item) => {
    const section = getMonthYear(item.date);
    if (!grouped[section]) grouped[section] = [];
    grouped[section].push(item);
  });

  return Object.entries(grouped).map(([title, data]) => ({ title, data }));
};

const getAvatar = (name, type) => {
  if (type === "corporate") {
    return require("../../assets/drawer/bhim.png");
  }
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const TransactionHistory = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { t } = useTranslation(); // ✅ Hook to access translations
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  const hardcodedData = [/* ... your hardcoded transactions here ... */];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.example.com/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions(hardcodedData);
      }
    };
    fetchData();
  }, []);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(search.toLowerCase())
  );

  const sections = groupByMonth(filteredTransactions);

  const formatDateTime = (date) => {
    const d = new Date(date);
    const options = {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return d.toLocaleString("en-GB", options).replace(",", " at").replace("am", "AM").replace("pm", "PM");
  };

  const getTransactionType = (amount) => (amount.startsWith("-") ? "Paid" : "Received");

  const getTransactionInfo = (amount) => {
    const result = amount.startsWith("-")
      ? { direction: "Debited from", icon: require("../../assets/drawer/bank-logo.png") }
      : { direction: "Credited from", icon: require("../../assets/drawer/bank-logo.png") };
    return result;
  };

  const getAvatar = (name, type) => {
    if (type === "corporate") {
      return require("../../assets/drawer/bhim.png");
    }
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    return initials;
  };

  const renderItem = useCallback(
    ({ item }) => {
      const { direction, icon } = getTransactionInfo(item.amount);
      return (
        <Link href={`/transaction/${item.id}`} asChild>
          <Pressable>
            <View style={styles.transactionItem}>
              {item.type === "individual" ? (
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{getAvatar(item.name, item.type)}</Text>
                </View>
              ) : (
                <Image source={item.icon} style={styles.icon} />
              )}

              <View style={styles.transactionDetails}>
                <Text style={styles.transactionName}>{item.name}</Text>
                <Text style={styles.transactionDate}>
                  {`${getTransactionType(item.amount)} on ${formatDateTime(item.date)}`}
                </Text>
              </View>

              <View style={styles.amountContainer}>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: item.amount.startsWith("+") ? "#4CAF50" : "#FF5733" },
                  ]}
                >
                  ₹{item.amount}
                </Text>

                <View style={styles.bankInfo}>
                  <Text style={styles.transactionBank}>{direction}</Text>
                  <Image source={icon} style={styles.bankIcon} />
                </View>
              </View>
            </View>
          </Pressable>
        </Link>
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 20, marginTop: 20 }}>
          <Ionicons name="arrow-back" size={25} color="#444" />
        </Pressable>
        <Text style={styles.headerTitle}>{t('transaction_history')}</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder={t("search_by_name")}
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <SectionList
        sections={sections}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{t(title)}</Text> // ✅ Localized section title
        )}
      />
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#F0F8FF",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  transactionName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  transactionDate: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  bankInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  bankIcon: {
    width: 20,
    height: 20,
    marginLeft: 0,
  },
  transactionBank: {
    fontSize: 12,
    color: "#777",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});


export const hardcodedData = [
  {
    id: "1",
    name: "Deven Computers",
    amount: "-7",
    date: "2025-02-19T10:13:00",
    icon: require("../../assets/drawer/supermarket.png"),
    type: "corporate",
  },
  {
    id: "2",
    name: "Mom",
    amount: "-1",
    date: "2025-02-06T12:53:00",
    type: "individual",
  },
  {
    id: "3",
    name: "Daddy",
    amount: "+500",
    date: "2025-01-31T20:46:00",
    type: "individual",
  },
  {
    id: "4",
    name: "Mikado Solutions",
    amount: "-25000",
    date: "2024-08-07T12:53:00",
    icon: require("../../assets/drawer/supermarket.png"),
    type: "corporate",
  },
  {
    id: "5",
    name: "Ramesh Kumar",
    amount: "+10000",
    date: "2025-03-15T09:30:00",
    type: "individual",
  },
  {
    id: "6",
    name: "Tech Innovators",
    amount: "-1500",
    date: "2025-02-25T11:45:00",
    icon: require("../../assets/drawer/supermarket.png"),
    type: "corporate",
  },
  {
    id: "7",
    name: "Priya Sharma",
    amount: "+750",
    date: "2025-03-01T14:20:00",
    type: "individual",
  },
  {
    id: "8",
    name: "ABC Enterprises",
    amount: "-20000",
    date: "2025-01-22T16:00:00",
    icon: require("../../assets/drawer/supermarket.png"),
    type: "corporate",
  },
  {
    id: "9",
    name: "Amit Verma",
    amount: "+3200",
    date: "2024-12-10T18:45:00",
    type: "individual",
  },
  {
    id: "10",
    name: "Global Solutions",
    amount: "-4500",
    date: "2024-11-30T12:10:00",
    icon: require("../../assets/drawer/supermarket.png"),
    type: "corporate",
  },
  {
    id: "11",
    name: "Neha Gupta",
    amount: "+900",
    date: "2024-10-18T08:25:00",
    type: "individual",
  },
  {
    id: "12",
    name: "Bright Tech",
    amount: "-6000",
    date: "2024-09-05T10:00:00",
    icon: require("../../assets/drawer/supermarket.png"),
    type: "corporate",
  },
  { id: "13", name: "Ananya", amount: "+1200", date: "2024-08-12T09:00:00", type: "individual" },
  { id: "14", name: "Aishwarya", amount: "-450", date: "2024-07-11T11:15:00", type: "individual" },
  { id: "15", name: "Sanya", amount: "+3000", date: "2024-06-10T14:30:00", type: "individual" },
  { id: "16", name: "Priya", amount: "-600", date: "2024-05-09T16:45:00", type: "individual" },
  { id: "17", name: "Radha", amount: "+800", date: "2024-04-08T18:00:00", type: "individual" },
  { id: "18", name: "Aaradhya", amount: "-350", date: "2024-03-07T08:10:00", type: "individual" },
  { id: "19", name: "Kiara", amount: "+2500", date: "2024-02-06T12:20:00", type: "individual" },
  { id: "20", name: "Ishita", amount: "-900", date: "2024-01-05T14:40:00", type: "individual" },
  { id: "21", name: "Misha", amount: "+1300", date: "2024-08-04T17:55:00", type: "individual" },
  { id: "22", name: "Rhea", amount: "-780", date: "2024-07-03T10:30:00", type: "individual" },
  { id: "23", name: "Sita", amount: "+1800", date: "2024-06-02T12:50:00", type: "individual" },
  { id: "24", name: "Lakshmi", amount: "-2200", date: "2024-05-01T09:25:00", type: "individual" },
  { id: "25", name: "Parvati", amount: "+950", date: "2024-04-29T14:10:00", type: "individual" },
  { id: "26", name: "Gauri", amount: "-1250", date: "2024-03-28T16:35:00", type: "individual" },
  { id: "27", name: "Durga", amount: "+2100", date: "2024-02-27T18:45:00", type: "individual" },
  { id: "28", name: "Aarini", amount: "-400", date: "2024-01-26T08:05:00", type: "individual" },
  { id: "29", name: "Tanvi", amount: "+2900", date: "2024-08-25T11:55:00", type: "individual" },
  { id: "30", name: "Madhavi", amount: "-1300", date: "2024-07-24T14:15:00", type: "individual" },
  { id: "31", name: "Veda", amount: "+700", date: "2024-06-23T16:20:00", type: "individual" },
  { id: "32", name: "Ira", amount: "-600", date: "2024-05-22T18:40:00", type: "individual" },
  { id: "33", name: "Shanaya", amount: "+1500", date: "2024-04-21T08:15:00", type: "individual" },
  { id: "34", name: "Anjali", amount: "-500", date: "2024-03-20T11:30:00", type: "individual" },
  { id: "35", name: "Divya", amount: "+2800", date: "2024-02-19T14:45:00", type: "individual" },
  { id: "36", name: "Meera", amount: "-950", date: "2024-01-18T17:10:00", type: "individual" },
  { id: "37", name: "Asha", amount: "+1200", date: "2024-08-17T09:40:00", type: "individual" },
  { id: "38", name: "Neha", amount: "-650", date: "2024-07-16T12:25:00", type: "individual" },
  { id: "39", name: "Tara", amount: "+3200", date: "2024-06-15T14:55:00", type: "individual" },
  { id: "40", name: "Rani", amount: "-1400", date: "2024-05-14T16:45:00", type: "individual" },
  { id: "41", name: "Zara", amount: "+1700", date: "2024-04-13T18:20:00", type: "individual" },
  { id: "42", name: "Shruti", amount: "-800", date: "2024-03-12T08:50:00", type: "individual" },
];