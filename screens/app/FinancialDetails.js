import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from '../../theme/Theme';

const STORAGE_KEY = "financial_details_selection";

// Individual Question Component
const FormQuestion = ({ 
  icon, 
  title, 
  subtitle, 
  id, 
  options, 
  value, 
  onChange, 
  colors, 
  t 
}) => {
  const styles = createStyles(colors);

  return (
    <View style={styles.formField}>
      <View style={styles.fieldIconBox}>
        <Ionicons name={icon} size={24} color={colors.text} />
      </View>
      
      <View style={styles.fieldContent}>
        <Text style={styles.fieldLabel}>{title}</Text>
        <Text style={styles.fieldHelper}>{subtitle}</Text>
        
        <View style={styles.fieldPickerContainer}>
          <Picker
            selectedValue={value || ""}
            onValueChange={onChange}
            style={styles.fieldPicker}
            dropdownIconColor={colors.text}
            mode="dropdown"
          >
            <Picker.Item label={t("select_option")} value="" />
            {options.map((option) => (
              <Picker.Item
                key={option}
                label={t(option)}
                value={option}
              />
            ))}
          </Picker>
        </View>

        {value && (
          <View style={styles.valueTag}>
            <Ionicons name="checkmark-circle-sharp" size={14} color={colors.text} />
            <Text style={styles.valueText}>{t(value)}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const FinancialDetails = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);

  const [selectedOptions, setSelectedOptions] = useState({});

  const styles = createStyles(colors);

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

  const completedCount = Object.keys(selectedOptions).length;
  const totalQuestions = 8;
  const progressPercent = (completedCount / totalQuestions) * 100;

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={colors.background === "#ffffff" ? "dark-content" : "light-content"}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <Pressable 
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          >
            <Ionicons name="arrow-back" size={26} color={colors.text} />
          </Pressable>

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{t("financial_details")}</Text>
            <Text style={styles.headerProgress}>{completedCount}/{totalQuestions} completed</Text>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formSection}>
          {/* Section 1: Housing & Transport */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Housing & Transport</Text>
            <View style={styles.sectionDivider} />

            <FormQuestion
              icon="home-outline"
              title={t("house_ownership")}
              subtitle={t("house_ownership_question")}
              id={1}
              options={["Own", "Rent"]}
              value={selectedOptions[1]}
              onChange={(val) => handleSelect(1, val)}
              colors={colors}
              t={t}
            />

            <FormQuestion
              icon="car-outline"
              title={t("car_ownership")}
              subtitle={t("car_ownership_question")}
              id={2}
              options={["Yes", "No"]}
              value={selectedOptions[2]}
              onChange={(val) => handleSelect(2, val)}
              colors={colors}
              t={t}
            />

            <FormQuestion
              icon="bicycle-outline"
              title={t("two_wheeler_ownership")}
              subtitle={t("two_wheeler_ownership_question")}
              id={3}
              options={["Yes", "No"]}
              value={selectedOptions[3]}
              onChange={(val) => handleSelect(3, val)}
              colors={colors}
              t={t}
            />
          </View>

          {/* Section 2: Income & Employment */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Income & Employment</Text>
            <View style={styles.sectionDivider} />

            <FormQuestion
              icon="cash-outline"
              title={t("annual_income")}
              subtitle={t("annual_income_question")}
              id={4}
              options={["<1L", "1-5L", "5-10L", ">10L"]}
              value={selectedOptions[4]}
              onChange={(val) => handleSelect(4, val)}
              colors={colors}
              t={t}
            />

            <FormQuestion
              icon="briefcase-outline"
              title={t("occupation")}
              subtitle={t("occupation_question")}
              id={5}
              options={["Salaried", "Self-employed", "Unemployed", "Student"]}
              value={selectedOptions[5]}
              onChange={(val) => handleSelect(5, val)}
              colors={colors}
              t={t}
            />

            <FormQuestion
              icon="people-outline"
              title={t("earning_members")}
              subtitle={t("earning_members_question")}
              id={6}
              options={["1", "2", "3+", "None"]}
              value={selectedOptions[6]}
              onChange={(val) => handleSelect(6, val)}
              colors={colors}
              t={t}
            />
          </View>

          {/* Section 3: Financial Security */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Financial Security</Text>
            <View style={styles.sectionDivider} />

            <FormQuestion
              icon="shield-checkmark-outline"
              title={t("insurances")}
              subtitle={t("insurances_question")}
              id={7}
              options={["Yes", "No"]}
              value={selectedOptions[7]}
              onChange={(val) => handleSelect(7, val)}
              colors={colors}
              t={t}
            />

            <FormQuestion
              icon="trending-up-outline"
              title={t("investments")}
              subtitle={t("investments_question")}
              id={8}
              options={["Stocks", "FDs", "Real Estate", "None"]}
              value={selectedOptions[8]}
              onChange={(val) => handleSelect(8, val)}
              colors={colors}
              t={t}
            />
          </View>
        </View>

        {/* Completion Message */}
        <View style={styles.footer}>
          {completedCount === totalQuestions ? (
            <View style={styles.completionBox}>
              <Ionicons name="checkmark-done-outline" size={32} color={colors.text} />
              <Text style={styles.completionText}>All set!</Text>
              <Text style={styles.completionSubtext}>Your financial profile is complete</Text>
            </View>
          ) : (
            <Text style={styles.pendingText}>
              {totalQuestions - completedCount} more to complete your profile
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FinancialDetails;

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    header: {
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 16,
    },

    headerInner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 14,
    },

    backButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: colors.option,
      justifyContent: "center",
      alignItems: "center",
    },

    backButtonPressed: {
      opacity: 0.6,
    },

    headerInfo: {
      flex: 1,
    },

    headerTitle: {
      fontSize: 22,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 4,
    },

    headerProgress: {
      fontSize: 12,
      color: colors.upi,
      fontWeight: "500",
    },

    progressBar: {
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      overflow: "hidden",
    },

    progressBarFill: {
      height: "100%",
      backgroundColor: colors.text,
      borderRadius: 2,
    },

    formContainer: {
      paddingHorizontal: 12,
      paddingTop: 12,
      paddingBottom: 32,
    },

    formSection: {
      gap: 28,
    },

    section: {
      marginHorizontal: 4,
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 12,
      letterSpacing: 0.2,
    },

    sectionDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginBottom: 16,
    },

    formField: {
      flexDirection: "row",
      backgroundColor: colors.card,
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 14,
      marginBottom: 12,
      alignItems: "flex-start",
      gap: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },

    fieldIconBox: {
      width: 44,
      height: 44,
      borderRadius: 8,
      backgroundColor: colors.option,
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
    },

    fieldContent: {
      flex: 1,
      gap: 8,
    },

    fieldLabel: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.text,
    },

    fieldHelper: {
      fontSize: 12,
      color: colors.upi,
      fontWeight: "400",
      lineHeight: 16,
    },

    fieldPickerContainer: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 6,
      height: 40,
      overflow: "hidden",
      backgroundColor: colors.option,
      justifyContent: "center",
    },

    fieldPicker: {
      height: 44,
      marginTop: -2,
      width: "100%",
      color: colors.text,
      fontSize: 13,
      fontWeight: "500",
    },

    valueTag: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: colors.option,
      alignSelf: "flex-start",
    },

    valueText: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.text,
    },

    footer: {
      marginTop: 16,
      paddingHorizontal: 4,
      paddingVertical: 20,
      alignItems: "center",
    },

    completionBox: {
      alignItems: "center",
      gap: 8,
      paddingVertical: 16,
    },

    completionText: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
    },

    completionSubtext: {
      fontSize: 13,
      color: colors.upi,
      fontWeight: "500",
    },

    pendingText: {
      fontSize: 13,
      color: colors.upi,
      fontWeight: "500",
      letterSpacing: 0.2,
    },
  });