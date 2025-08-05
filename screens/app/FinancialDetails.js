import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = "financial_details_selection";

const FinancialDetails = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [selectedOptions, setSelectedOptions] = useState({});

  const financialQuestions = [
    { id: 1, title: t("house_ownership"), subtitle: t("house_ownership_question"), options: ["Own", "Rent"] },
    { id: 2, title: t("car_ownership"), subtitle: t("car_ownership_question"), options: ["Yes", "No"] },
    { id: 3, title: t("two_wheeler_ownership"), subtitle: t("two_wheeler_ownership_question"), options: ["Yes", "No"] },
    { id: 4, title: t("annual_income"), subtitle: t("annual_income_question"), options: ["<1L", "1-5L", "5-10L", ">10L"] },
    { id: 5, title: t("occupation"), subtitle: t("occupation_question"), options: ["Salaried", "Self-employed", "Unemployed", "Student"] },
    { id: 6, title: t("earning_members"), subtitle: t("earning_members_question"), options: ["1", "2", "3+", "None"] },
    { id: 7, title: t("insurances"), subtitle: t("insurances_question"), options: ["Yes", "No"] },
    { id: 8, title: t("investments"), subtitle: t("investments_question"), options: ["Stocks", "FDs", "Real Estate", "None"] },
  ];

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json !== null) {
          setSelectedOptions(JSON.parse(json));
        }
      } catch (e) {
        console.log("Failed to load financial data:", e);
      }
    };
    loadStoredData();
  }, []);

  const handleSelect = async (id, value) => {
    const updated = { ...selectedOptions, [id]: value };
    setSelectedOptions(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log("Failed to save financial data:", e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        {financialQuestions.map((item) => (
          <View key={item.id} style={styles.questionContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedOptions[item.id] || ""}
                onValueChange={(value) => handleSelect(item.id, value)}
                style={styles.picker}
                mode="dropdown"
              >
                <Picker.Item label={t("select_option")} value="" />
                {item.options.map((option) => (
                  <Picker.Item key={option} label={t(option)} value={option} />
                ))}
              </Picker>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FinancialDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
  questionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  textContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    height: 48,
    justifyContent: "center",
  },
 picker: {
    height: 55,
    marginTop: -10,
    fontSize: 16,
    width: "100%",
  }
});

