import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, StatusBar } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
const transactionsData = [
  { id: "1", amount: "93", type: "credit", descriptionKey: "txn.coins_credit", date: "2 APR" },
  { id: "2", amount: "100", type: "debit", descriptionKey: "txn.deal_unlocked", date: "2 APR" },
  { id: "3", amount: "1,000", type: "debit", descriptionKey: "txn.pay_and_win", date: "27 MAR" },
  { id: "4", amount: "500", type: "credit", descriptionKey: "txn.coins_credit", date: "25 MAR" },
  { id: "5", amount: "300", type: "debit", descriptionKey: "txn.coins_credit", date: "14 MAR" },
  { id: "6", amount: "500", type: "credit", descriptionKey: "txn.coins_earned", date: "11 FEB" },
  { id: "7", amount: "700", type: "debit", descriptionKey: "txn.coins_earned", date: "05 FEB" },
  { id: "8", amount: "650", type: "credit", descriptionKey: "txn.coins_credit", date: "03 FEB" },
  { id: "9", amount: "25", type: "debit", descriptionKey: "txn.coins_earned", date: "29 JAN" },
  { id: "10", amount: "50", type: "credit", descriptionKey: "txn.pay_and_win", date: "13 JAN" },
];
const CoinLedger = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [lifetimeEarnings, setLifetimeEarnings] = useState(1680965);
  const [lifetimeSpends, setLifetimeSpends] = useState(470700);

  useEffect(() => {
    let earnings = lifetimeEarnings;
    let spends = lifetimeSpends;

    transactionsData.forEach(transaction => {
      const amountInt = parseInt(transaction.amount.replace(/,/g, ""));
      if (transaction.type === "credit") {
        earnings += amountInt;
      } else {
        spends += amountInt;
      }
    });

    setLifetimeEarnings(earnings);
    setLifetimeSpends(spends);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Image source={require("../../assets/drawer/coins.png")} style={styles.coinImage} />
        <Text style={styles.coinBalance}>12,10,265</Text>
        <Text style={styles.subtitle}>{t("coin_total_balance")}</Text>
        <View style={styles.earningsContainer}>
          <View style={styles.earningsBox}>
            <Text style={styles.earningsText}>{lifetimeEarnings.toLocaleString()}</Text>
            <Text style={styles.earningsLabel}>{t("coin_lifetime_earnings")}</Text>
          </View>
          <View style={styles.earningsBox}>
            <Text style={styles.earningsText}>{lifetimeSpends.toLocaleString()}</Text>
            <Text style={styles.earningsLabel}>{t("coin_lifetime_spends")}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.ledgerTitle}>{t("coin_history")}</Text>

      <FlatList
        data={transactionsData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Feather
              name={item.type === "credit" ? "arrow-up-right" : "arrow-down-left"}
              size={18}
              color={item.type === "credit" ? "green" : "red"}
              style={styles.transactionIcon}
            />
            <View>
        <Text>{t("txn.amount", { amount: item.amount })}</Text>
              <Text style={styles.transactionDesc}>{t(item.descriptionKey)}</Text>
            </View>
            <Text style={styles.transactionDate}>{t("txn.date", { date: item.date })}</Text>

          </View>
        )}
      />
    </View>
  );
};

export default CoinLedger;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    marginTop: 20,
    marginLeft: 10,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  coinImage: {
    width: 60,
    height: 60,
  },
  coinBalance: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2B2B2B",
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#8A8A8A",
    marginTop: 5,
  },
  earningsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  earningsBox: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 15,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  earningsText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B2B2B",
  },
  earningsLabel: {
    fontSize: 12,
    color: "#8A8A8A",
  },
  ledgerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B",
    marginTop: 40,
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginVertical: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionIcon: {
    marginRight: 15,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2B2B2B",
  },
  transactionDesc: {
    fontSize: 14,
    color: "#8A8A8A",
    marginTop: 5,
  },
  transactionDate: {
    marginLeft: "auto",
    fontSize: 14,
    color: "#8A8A8A",
  },
});

