import { StyleSheet, Text, View, Pressable, StatusBar, Image } from 'react-native';
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';

const CurrentBank = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* White Status Bar */}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Bank Icon */}
      <View style={styles.bankIconContainer}>
        <Image source={require('../../assets/drawer/hdfc.png')} style={styles.bankIcon} />
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <View style={styles.optionRow}>
          <Feather name="home" size={22} color="black" />
          <Text style={styles.optionText}>{t('default_bank_receive')}</Text>
          <Feather name="check-circle" size={22} color="green" />
        </View>

        <Pressable style={styles.optionRow}>
          <Feather name="credit-card" size={22} color="black" />
          <Text style={styles.optionText}>{t('check_-balance')}</Text>
          <Text style={styles.optionAction} onPress={() => navigation.navigate("BankUPISelectionScreen")}>
            {t('check')}
          </Text>
        </Pressable>

        {/* Account Details */}
        <View style={styles.accountDetails}>
          <Text style={styles.sectionTitle}>{t('account_details')}</Text>
          <Text style={styles.detailText}>{t('account_number')} : XX6178</Text>
          <Text style={styles.detailText}>{t('ifsc')} : SBIN002025</Text>
          <Text style={styles.detailText}>{t('account_type')} : {t('savings')}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {t('powered_by')} <Text style={{ fontWeight: 'bold' }}>UPI</Text>
        </Text>
        <Image
          source={require("../../assets/drawer/upi.png")}
          style={{ width: 120, height: 30, resizeMode: "contain", marginTop: 5 }}
        />
      </View>
    </View>
  );
};


export default CurrentBank;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  bankName: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  bankIconContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  bankIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  optionAction: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
  accountDetails: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#555",
  },
});