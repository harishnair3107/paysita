import { StyleSheet, Text, View, Pressable, StatusBar, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';

const banks = [
  { id: 1, nameKey: "bank.axis", logo: require("../../assets/drawer/axis.png") },
  { id: 2, nameKey: "bank.bob", logo: require("../../assets/drawer/hdfc.png") },
  { id: 3, nameKey: "bank.canara", logo: require("../../assets/drawer/icici.png") },
  { id: 4, nameKey: "bank.central", logo: require("../../assets/drawer/axis.png") },
  { id: 5, nameKey: "bank.city_union", logo: require("../../assets/drawer/hdfc.png") },
  { id: 6, nameKey: "bank.hdfc", logo: require("../../assets/drawer/icici.png") },
  { id: 7, nameKey: "bank.icici", logo: require("../../assets/drawer/icici.png") },
  { id: 8, nameKey: "bank.indian", logo: require("../../assets/drawer/axis.png") },
  { id: 9, nameKey: "bank.karnataka", logo: require("../../assets/drawer/hdfc.png") },
];
const AddCreditLine = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {/* White Status Bar */}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Select bank that has issued Credit Line to make UPI payments
      </Text>

      {/* Bank List */}
      <FlatList
        data={banks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.bankItem}>
            <Image source={item.logo} style={styles.bankLogo} />
             <Text style={styles.bankName}>{t(item.nameKey)}</Text>
          </Pressable>
        )}
      />

      {/* Footer - Powered by UPI */}
      <View style={styles.footer}>
        <Image source={require("../../assets/drawer/upi.png")} style={styles.bhimLogo} />
      </View>
    </View>
  );
};

export default AddCreditLine;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  bankItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  bankLogo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 15,
  },
  bankName: {
    fontSize: 16,
    color: "#000",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  bhimLogo: {
    width: 120,
    height: 30,
    resizeMode: "contain",
  },
});