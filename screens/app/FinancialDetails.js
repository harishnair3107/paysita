import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from 'react-i18next'; // ✅ import i18n

const FinancialDetails = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); // ✅ get translation function
  const [selectedOptions, setSelectedOptions] = useState({});

  const financialQuestions = [
    { id: 1, title: t("house_ownership"), subtitle: t("house_ownership_question") },
    { id: 2, title: t("car_ownership"), subtitle: t("car_ownership_question") },
    { id: 3, title: t("two_wheeler_ownership"), subtitle: t("two_wheeler_ownership_question") },
    { id: 4, title: t("annual_income"), subtitle: t("annual_income_question") },
    { id: 5, title: t("occupation"), subtitle: t("occupation_question") },
    { id: 6, title: t("earning_members"), subtitle: t("earning_members_question") },
    { id: 7, title: t("insurances"), subtitle: t("insurances_question") },
    { id: 8, title: t("investments"), subtitle: t("investments_question") },
  ];

  const handleSelect = (id, choice) => {
    setSelectedOptions((prev) => ({ ...prev, [id]: choice }));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView>
        <View style={styles.content}>
          {financialQuestions.map((item) => (
            <View key={item.id} style={styles.questionContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedOptions[item.id] === "Yes" ? styles.yesSelected : styles.unselected,
                  ]}
                  onPress={() => handleSelect(item.id, "Yes")}
                >
                  <Text style={styles.buttonText}>{t("yes")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedOptions[item.id] === "No" ? styles.noSelected : styles.unselected,
                  ]}
                  onPress={() => handleSelect(item.id, "No")}
                >
                  <Text style={styles.buttonText}>{t("no")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      backgroundColor: "#f8f9fa",
      elevation: 2,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      marginLeft: 16,
      color: "#333",
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
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 3,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: "700",
      color: "#333",
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 14,
      color: "#666",
      marginTop: 4,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 30,
      marginLeft: 12,
      borderWidth: 2,
      borderColor: "#1D154A",
      width: 80,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontWeight: "bold",
      color: "#00000",
      fontSize: 14,
    },
    yesSelected: {
      backgroundColor: "#28a745", // Green for 'Yes'
      borderColor: "#28a745", // Matching border color
    },
    noSelected: {
      backgroundColor: "#dc3545", // Red for 'No'
      borderColor: "#dc3545", // Matching border color
    },
    unselected: {
      backgroundColor: "#f0f0f0", // Light gray for unselected options
      borderColor: "#ddd", // Gray border for unselected options
    },
  });

