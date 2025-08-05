import { View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

const AboutAppScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Text style={styles.title}>{t("about_us")}</Text>

      <Text style={styles.description}>{t("about_us_para1")}</Text>

      <Text style={styles.description}>
        {t("company_info", {
          company: "GURUDIPAK SALVI PRIVATE LIMITED (GSPL)",
          cin: "U66190MH2023PTC414067",
        })}
      </Text>

      <Text style={styles.updatedOn}>
        {t("updated_on")} 24/6/2025, 3:58:34 pm (IST)
      </Text>

      <Pressable onPress={() => {}} style={styles.linkContainer}>
        <Text style={styles.linkText}>{t("all_versions")}</Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1D154A",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 24,
    color: "#333",
    marginBottom: 15,
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },
  updatedOn: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    color: "#444",
  },
  linkContainer: {
    marginTop: 5,
    alignItems: "center",
  },
  linkText: {
    fontSize: 16,
    color: "#4B0082",
    fontWeight: "bold",
  },
});

export default AboutAppScreen;
