import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "user_additional_details";

const dropdownOptions = {
  1: ["Male", "Female", "Other"],
  2: ["18-25", "26-35", "36-45", "46+"],
  3: ["Single", "Married", "Divorced", "Widowed"],
  4: ["School", "High School", "Graduate", "Postgraduate", "PhD"],
  5: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  6: ["Often", "Sometimes", "Rarely", "Never"],
  7: ["Often", "Sometimes", "Rarely", "Never"],
  8: ["Music", "Reading", "Sports", "Cooking", "Gaming", "Dance", "ArtCraft"],
  9: ["Action", "Drama", "Comedy", "Romance", "Horror"],
};

const sections = [
  {
    titleKey: "personal_information",
    data: [
      { id: 1, labelKey: "gender", subtextKey: "gender_subtext" },
      { id: 2, labelKey: "age", subtextKey: "age_subtext" },
      { id: 3, labelKey: "marital_status", subtextKey: "marital_status_subtext" },
      { id: 4, labelKey: "education_qualification", subtextKey: "education_qualification_subtext" },
      { id: 5, labelKey: "family_members", subtextKey: "family_members_subtext" },
    ],
  },
  {
    titleKey: "preferences",
    data: [
      { id: 6, labelKey: "domestic_travel", subtextKey: "domestic_travel_subtext" },
      { id: 7, labelKey: "international_travel", subtextKey: "international_travel_subtext" },
      { id: 8, labelKey: "personal_interests", subtextKey: "personal_interests_subtext" },
      { id: 9, labelKey: "movies", subtextKey: "movies_subtext" },
    ],
  },
];

const AdditionalDetails = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [expandedSection, setExpandedSection] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json != null) {
        setSelectedOptions(JSON.parse(json));
      }
    } catch (error) {
      console.log("Error loading saved data", error);
    }
  };

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.log("Error saving data", error);
    }
  };

  const toggleSection = (index) =>
    setExpandedSection(expandedSection === index ? null : index);

  const handleSelect = (id, value) => {
    const updated = { ...selectedOptions, [id]: value };
    setSelectedOptions(updated);
    saveData(updated);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlatList
        data={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.section}>
            <Pressable
              onPress={() => toggleSection(index)}
              style={styles.sectionHeader}
            >
              <Text style={styles.sectionTitle}>{t(item.titleKey)}</Text>
              <Ionicons
                name={expandedSection === index ? "chevron-up" : "chevron-down"}
                size={20}
                color="black"
              />
            </Pressable>

            {expandedSection === index &&
              item.data.map((detail) => (
                <View key={detail.id} style={styles.detailItem}>
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>{t(detail.labelKey)}</Text>
                    <Text style={styles.subtext}>{t(detail.subtextKey)}</Text>
                  </View>
                  <View style={styles.pickerWrapper}>
                    <Picker
                      selectedValue={selectedOptions[detail.id] || ""}
                      onValueChange={(value) => handleSelect(detail.id, value)}
                      style={styles.picker}
                      mode="dropdown"
                    >
                      <Picker.Item label={t("select_option")} value="" />
                      {(dropdownOptions[detail.id] || []).map((option) => (
                        <Picker.Item key={option} label={option} value={option} />
                      ))}
                    </Picker>
                  </View>
                </View>
              ))}
          </View>
        )}
      />
    </View>
  );
};

export default AdditionalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  detailItem: {
    flexDirection: "column",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  subtext: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 40,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    height: 55,
    marginTop: -10,
    fontSize: 16,
    width: "100%",
  },
});
