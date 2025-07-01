import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native";
const AboutUs = ({ navigation }) => {
  const cards = [
    { title: "About IndiayaPay", screen: "AboutAppScreen" },
    { title: "Privacy Policy", screen: "PrivacyPolicyScreen" },
    { title: "Terms & Conditions", screen: "TermsScreen" },
    { title: "Grievance Redressal", screen: "GrievanceScreen" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView>

        

        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(card.screen)}
          >
            <Text style={styles.cardTitle}>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1D154A",
  },
  card: {
    backgroundColor: "#Fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    color: "#333",
  },
});
