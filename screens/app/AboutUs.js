import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

const AboutUs = ({ navigation }) => {
  const { t } = useTranslation();

  const cards = [
    { title: t("about_app"), screen: "AboutAppScreen", icon: "information" },
    { title: t("privacy_policy"), screen: "PrivacyPolicyScreen", icon: "shield-lock" },
    { title: t("terms_conditions"), screen: "TermsScreen", icon: "file-document-outline" },
    { title: t("grievance_redressal"), screen: "GrievanceScreen", icon: "account-alert" },
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
            <View style={styles.cardContent}>
              <Icon name={card.icon} size={24} color="#333" style={styles.icon} />
              <Text style={styles.cardTitle}>{card.title}</Text>
            </View>
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
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    color: "#333",
  },
});
