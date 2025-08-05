import { StyleSheet, Text, View, FlatList, StatusBar } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

const CashbackHistory = () => {
  const { t } = useTranslation();

  const transactions = [
    { id: "1", description: t('electricity_bill_payment'), amount: 50, date: "2025-04-08" },
    { id: "2", description: t('mobile_recharge'), amount: 30, date: "2025-04-06" },
    { id: "3", description: t('dth_recharge'), amount: 20, date: "2025-04-04" },
    { id: "4", description: t('grocery_purchase'), amount: 40, date: "2025-04-02" },
    { id: "5", description: t('restaurant_cashback'), amount: 25, date: "2025-04-01" },
    { id: "6", description: t('movie_ticket_booking'), amount: 15, date: "2025-03-30" },
    { id: "7", description: t('online_shopping_cashback'), amount: 60, date: "2025-03-28" },
    { id: "8", description: t('petrol_pump_cashback'), amount: 35, date: "2025-03-26" },
    { id: "9", description: t('insurance_payment_reward'), amount: 50, date: "2025-03-24" },
    { id: "10", description: t('credit_card_bill_cashback'), amount: 70, date: "2025-03-22" },
    { id: "11", description: t('ev_charging_cashback'), amount: 30, date: "2025-03-20" },
    { id: "12", description: t('online_course_enrollment'), amount: 20, date: "2025-03-18" },
    { id: "13", description: t('travel_booking_cashback'), amount: 80, date: "2025-03-16" },
    { id: "14", description: t('water_bill_payment'), amount: 45, date: "2025-03-14" },
    { id: "15", description: t('gym_membership_cashback'), amount: 50, date: "2025-03-12" },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.amount}>+ ₹{item.amount}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />


      <FlatList data={transactions} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
};

export default CashbackHistory;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 16,
    textAlign: "center",
  },
  transactionItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 6,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745", // Green
  },
});
