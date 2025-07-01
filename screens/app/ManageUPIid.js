import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useTranslation } from 'react-i18next';

const ManageUPIid = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [upiAccounts, setUpiAccounts] = useState([
    { bank: "SBI", upiId: "9632587412@ptsbi" },
    { bank: "Axis Bank", upiId: "912325412@ptaxis" },
    { bank: "HDFC Bank", upiId: "93785587412@pthdfc" },
    { bank: "YES Bank", upiId: "8882587412@ptyes", primary: true },
  ]);

  const primaryAccount = upiAccounts.find(account => account.primary);

  const handleActivate = (indexToActivate) => {
    const updatedAccounts = upiAccounts.map((acc, idx) => ({
      ...acc,
      primary: idx === indexToActivate,
    }));
    setUpiAccounts(updatedAccounts);
  };

  const handleCopy = (upiId) => {
    Clipboard.setStringAsync(upiId);
    Alert.alert(t('copied'), `${upiId} ${t('copied_to_clipboard')}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Primary UPI ID */}
      <View style={styles.primaryBox}>
        <Text style={styles.primaryLabel}>{t('your_primary_upi_id')}</Text>
        <View style={styles.primaryRow}>
          <Text style={styles.primaryUpiId}>{primaryAccount?.upiId}</Text>
          <Pressable onPress={() => handleCopy(primaryAccount?.upiId)}>
            <Feather name="copy" size={20} color="black" />
          </Pressable>
        </View>
        <Text style={styles.subText}>
          {t('others_see_this')}
        </Text>
      </View>

      {/* All UPI IDs */}
      <Text style={styles.sectionTitle}>{t('all_upi_ids')}</Text>
      <Text>{t('activate_all_note')}</Text>

      <ScrollView>
        {upiAccounts.map((account, index) => (
          <View key={index} style={styles.upiBox}>
            <Text style={styles.poweredBy}>{t('powered_by')} {account.bank}</Text>
            <View style={styles.upiRow}>
              <Text style={styles.upiId}>{account.upiId}</Text>
              {account.primary ? (
                <View style={styles.primaryBadge}>
                  <Text style={styles.primaryBadgeText}>{t('primary')}</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={() => handleActivate(index)}>
                  <Text style={styles.activateText}>{t('activate')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ManageUPIid;


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
    gap: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  primaryBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  primaryLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  primaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  primaryUpiId: {
    fontSize: 16,
    flex: 1,
  },
  subText: {
    color: "#888",
    marginTop: 5,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  knowMore: {
    color: "#007bff",
    marginBottom: 10,
  },
  upiBox: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  poweredBy: {
    color: "#888",
    marginBottom: 5,
  },
  upiRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  upiId: {
    fontSize: 16,
    flex: 1,
  },
  activateText: {
    color: "#007bff",
    fontSize: 16,
  },
  primaryBadge: {
    backgroundColor: "#90ee90",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  primaryBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "green",
  },
});