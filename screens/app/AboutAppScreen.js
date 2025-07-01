import { View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import React from "react";

const AboutAppScreen = () => {
  // Static translations (English only for now)
  const translations = {
    en: {
      aboutUs: "About Us",
      aboutUsPara1:
        "Our goal is to make digital payments so easy, safe, and universally accepted that people never feel the need to carry cash or cards again. We believe India is at the cusp of a new mobile revolution, which will change the way we manage our money on the go. We see ourselves facilitating this change, through technology and dogged customer centricity.",
      updatedOn: "Updated On:",
      allVersions: "All Versions",
    },
  };

  const currentTranslations = translations.en;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>{currentTranslations.aboutUs}</Text>
      </View> */}

      {/* About Us Content */}
      <Text style={styles.title}>{currentTranslations.aboutUs}</Text>

      <Text style={styles.description}>{currentTranslations.aboutUsPara1}</Text>

      <Text style={styles.description}>
        IndiaaPay is a brand owned by{" "}
        <Text style={styles.boldText}>
          GURUDIPAK SALVI PRIVATE LIMITED (GSPL)
        </Text>{" "}
        (CIN - U66190MH2023PTC414067). It is licensed by the Government of
        India for issuance and operation of a Semi Closed Prepaid Payment
        system.
      </Text>

      <Text style={styles.updatedOn}>
        {currentTranslations.updatedOn} 24/6/2025, 3:58:34 pm (IST)
      </Text>

      <Pressable onPress={() => {}} style={styles.linkContainer}>
        <Text style={styles.linkText}>{currentTranslations.allVersions}</Text>
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
