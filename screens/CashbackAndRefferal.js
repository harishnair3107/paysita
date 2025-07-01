import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const CashbackAndReferral = () => {
  const [activeTab, setActiveTab] = useState("Cashback");
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [referralData, setReferralData] = useState({
    name: "",
    email: "",
    contact: "",
    category: "",
    message: "",
  });

  const handleInputChange = (field, value) => {
    setReferralData({ ...referralData, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Referral Data:", referralData);
    alert(t("cashback_referral.referral_submitted"));
  };

  const cashbackOffers = {
    [t("cashback_referral.recharge")]: [
      { id: "1", action: t("cashback_referral.mobile_recharge"), cashback: 30 },
      { id: "2", action: t("cashback_referral.friend_recharge"), cashback: 30 },
    ],
    [t("cashback_referral.pay_bills")]: [
      { id: "3", action: t("cashback_referral.electricity_bill"), cashback: 50 },
      { id: "4", action: t("cashback_referral.dth_recharge"), cashback: 25 },
    ],
  };

  const renderCashbackCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.actionText}>{item.action}</Text>
      </View>
      <Text style={styles.descriptionText}>
        {t("cashback_referral.earn")} <Text style={styles.boldText}>₹{item.cashback}</Text> {t("cashback_referral.on_action", { action: item.action.toLowerCase() })}
      </Text>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.claimButton}>
          <Text style={styles.claimButtonText}>{t("cashback_referral.claim_now")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

      <View style={{ backgroundColor: "#f8f9fa", alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>
          {t("cashback_referral.title")}
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Cashback" && styles.activeTab]}
          onPress={() => setActiveTab("Cashback")}
        >
          <Text style={[styles.tabText, activeTab === "Cashback" && styles.activeTabText]}>
            {t("cashback_referral.cashback")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Referral" && styles.activeTab]}
          onPress={() => setActiveTab("Referral")}
        >
          <Text style={[styles.tabText, activeTab === "Referral" && styles.activeTabText]}>
            {t("cashback_referral.referral")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === "Cashback" ? (
          <FlatList
            data={Object.entries(cashbackOffers)}
            keyExtractor={([category]) => category}
            renderItem={({ item }) => {
              const [category, offers] = item;
              return (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{category}</Text>
                  <FlatList
                    data={offers}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCashbackCard}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    scrollEnabled={false}
                  />
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>{t("cashback_referral.refer_and_earn")}</Text>

            <TextInput
              style={styles.input}
              placeholder={t("cashback_referral.full_name")}
              value={referralData.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder={t("cashback_referral.email")}
              keyboardType="email-address"
              value={referralData.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
            <TextInput
              style={styles.input}
              placeholder={t("cashback_referral.contact_number")}
              keyboardType="phone-pad"
              value={referralData.contact}
              onChangeText={(text) => handleInputChange("contact", text)}
            />

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={referralData.category}
                onValueChange={(itemValue) => handleInputChange("category", itemValue)}
                style={styles.picker}
              >
                <Picker.Item label={t("cashback_referral.select_service")} value="" />
                <Picker.Item label={t("cashback_referral.loan")} value="Loans" />
                <Picker.Item label={t("cashback_referral.taxation")} value="Taxation" />
                <Picker.Item label={t("cashback_referral.real_estate")} value="Real Estate" />
                <Picker.Item label={t("cashback_referral.home_services")} value="Home Services" />
                <Picker.Item label={t("cashback_referral.tour_travel")} value="Tour and Travel" />
                <Picker.Item label={t("cashback_referral.education")} value="Educational Services" />
                <Picker.Item label={t("cashback_referral.donation")} value="Donation and Charity" />
                <Picker.Item label={t("cashback_referral.others")} value="Other Services" />
              </Picker>
            </View>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder={t("cashback_referral.message")}
              value={referralData.message}
              onChangeText={(text) => handleInputChange("message", text)}
              multiline={true}
              numberOfLines={4}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>{t("cashback_referral.submit_referral")}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CashbackAndReferral;

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#f8f9fa", padding: 10 },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  tab: { flex: 1, alignItems: "center" },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#FFA500",
  },
  tabText: { fontSize: 20, fontWeight: "500", color: "#555" },
  activeTabText: { color: "#FFA500", fontWeight: "bold" },
  listContainer: { paddingVertical: 10 },
  section: { marginBottom: 10 },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D154A",
    marginLeft: 10,
    marginBottom: 5,
  },
  row: { justifyContent: "space-between" },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    padding: 15,
    marginVertical: 5,
    marginRight: 15,
    width: "47%",
    height: 220,
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  actionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA500",
    textAlign: "justify",
  },
  descriptionText: {
    fontSize: 18,
    color: "#444",
    textAlign: "justify",
  },
  boldText: { fontWeight: "bold", color: "#000" },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
  },
  claimButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  claimButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
