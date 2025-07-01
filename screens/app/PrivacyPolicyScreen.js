import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.content}>
        We value your privacy and are committed to safeguarding your data. This policy outlines the types of personal information we collect and how we use, disclose, and protect that information...
      </Text>
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1D154A",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    textAlign: "justify",
  },
});
