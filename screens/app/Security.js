import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next"; // Import i18n hook

const Security = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); // i18n hook

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Pressable style={styles.option} onPress={() => navigation.navigate("Permisions")}> 
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>{t("permissions")}</Text>
          <Text style={styles.optionSubtitle}>{t("permissions_subtitle")}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </Pressable>

      <Pressable style={styles.option} onPress={() => navigation.navigate("SetupPasscode")}> 
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>{t("setup_passcode")}</Text>
          <Text style={styles.optionSubtitle}>{t("setup_passcode_subtitle")}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </Pressable>

      <Pressable style={styles.option} onPress={() => navigation.navigate("ChangePassword")}> 
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>{t("change_passcode")}</Text>
          <Text style={styles.optionSubtitle}>{t("change_passcode_subtitle")}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});