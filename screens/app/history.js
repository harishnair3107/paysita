import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";
import React,{useContext} from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next"; // i18n hook
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../theme/Theme";

const History = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); // use translation
  const {colors}=useContext(ThemeContext);
  const styles=createStyles(colors);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Pressable style={styles.option} onPress={() => navigation.navigate("transaction")}>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>{t("Transaction History")}</Text>
          <Text style={styles.optionSubtitle}>{t("view_all_transactions")}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#333" />
      </Pressable>

      <Pressable style={styles.option} onPress={() => navigation.navigate("referalhistory")}>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>{t("Referral History")}</Text>
          <Text style={styles.optionSubtitle}>{t("check_referral_bonuses")}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#333" />
      </Pressable>

      <Pressable style={styles.option} onPress={() => navigation.navigate("cashbackhistory")}>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>{t("Cashback History")}</Text>
          <Text style={styles.optionSubtitle}>{t("track_cashback_earnings")}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#333" />
      </Pressable>
    </SafeAreaView>
  );
};

export default History;

const createStyles =(colors)=> StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
    color: "#1E1E1E",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.option,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E1E1E",
  },
  optionSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
});
