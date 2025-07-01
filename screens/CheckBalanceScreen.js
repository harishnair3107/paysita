import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const CheckBalanceScreen = ({ route }) => {
  const { t } = useTranslation();
  const bank = route?.params?.bank || { id: '1', name: 'Dummy Bank' };
  const [upiPin, setUpiPin] = useState('');
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkBalance = async () => {
    if (!upiPin) {
      Alert.alert(t('check_balance.error_title'), t('check_balance.enter_upi_pin'));
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (upiPin === '123456') {
        setBalance('₹95,000');
      } else {
        Alert.alert(t('check_balance.failed_title'), t('check_balance.invalid_upi_pin'));
      }
    }, 500);
  };

  return (
    <View style={styles.container}>
      {bank ? (
        <>
          <Image source={bank.logo} style={styles.bankLogo} />
          <Text style={styles.bankName}>{bank.name}</Text>
          <Text style={styles.subtitle}>
            {t('check_balance.subtitle')}
          </Text>

          <Text style={styles.label}>{t('check_balance.enter_upi_pin_label')}</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••"
            keyboardType="numeric"
            secureTextEntry
            maxLength={6}
            onChangeText={setUpiPin}
          />

          <TouchableOpacity style={styles.button} onPress={checkBalance} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>{t('check_balance.check_balance_button')}</Text>
            )}
          </TouchableOpacity>

          {balance && (
            <Text style={styles.balanceText}>
              {t('check_balance.available_balance')}: {balance}
            </Text>
          )}
        </>
      ) : (
        <Text style={styles.error}>{t('check_balance.no_bank_selected')}</Text>
      )}
    </View>
  );
};

export default CheckBalanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bankLogo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: -20,
  },
  bankName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: '#1e293b',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  button: {
    backgroundColor: '#1d154a',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
    marginTop: 260,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  balanceText: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  error: {
    color: '#dc2626',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
