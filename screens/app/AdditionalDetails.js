import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const sections = [
  {
    titleKey: "personal_information",
    data: [
      { id: 1, labelKey: "gender", subtextKey: "gender_subtext" },
      { id: 2, labelKey: "age", subtextKey: "age_subtext" },
      { id: 3, labelKey: "marital_status", subtextKey: "marital_status_subtext" },
      { id: 4, labelKey: "education_qualification", subtextKey: "education_qualification_subtext" },
      { id: 5, labelKey: "family_members", subtextKey: "family_members_subtext" }
    ],
  },
  {
    titleKey: "preferences",
    data: [
      { id: 6, labelKey: "domestic_travel", subtextKey: "domestic_travel_subtext" },
      { id: 7, labelKey: "international_travel", subtextKey: "international_travel_subtext" },
      { id: 8, labelKey: "personal_interests", subtextKey: "personal_interests_subtext" },
      { id: 9, labelKey: "movies", subtextKey: "movies_subtext" }
    ],
  },
];

const AdditionalDetails = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [expandedSection, setExpandedSection] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  const toggleSection = (index) => setExpandedSection(expandedSection === index ? null : index);

  const handleSelect = (id, choice) => setSelectedOptions((prev) => ({ ...prev, [id]: choice }));

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlatList
        data={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.section}>
            <Pressable onPress={() => toggleSection(index)} style={styles.sectionHeader}>
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
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        selectedOptions[detail.id] === "Yes" && styles.selectedYes,
                      ]}
                      onPress={() => handleSelect(detail.id, "Yes")}
                    >
                      <Text style={[styles.buttonText, selectedOptions[detail.id] === "Yes" && styles.selectedText]}>
                        {t('yes')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        selectedOptions[detail.id] === "No" && styles.selectedNo,
                      ]}
                      onPress={() => handleSelect(detail.id, "No")}
                    >
                      <Text style={[styles.buttonText, selectedOptions[detail.id] === "No" && styles.selectedText]}>
                        {t('no')}
                      </Text>
                    </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#ffffff",
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 16,
    color: "#333",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  subtext: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#6c44d9",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 40,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6c44d9",
  },
  selectedYes: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  selectedNo: {
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
  },
  selectedText: {
    color: "#fff",
  },
  sectionIcon: {
    fontSize: 18,
    color: "#6c44d9",
  },
});