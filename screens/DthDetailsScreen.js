import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const DthDetailsScreen = ({ route }) => {
  const {
    selectedPlans = [],
    totalAmount = 0,
    customerName,
    phoneNumber,
    operatorName,
   selectedOperatorId
  } = route.params || {};
    const { t } = useTranslation();

  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const refid = `REF${Date.now()}`;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('http://192.168.29.22:5000/api/token');
        const data = await response.json();
        setToken(data.token);
        console.log('📲 Token from server:', data.token);
      } catch (err) {
        console.error('❌ Error fetching token:', err);
      }
    };
    fetchToken();
  }, []);

  const DoRecharge = async () => {
    if (!token) {
      Alert.alert('Token Missing', 'Please wait, authentication in progress.');
      return;
    }

    const rechargeData = {
      operator: selectedOperatorId,
      canumber: phoneNumber,
      amount: totalAmount,
      referenceid: refid,
    };

    const options = {
      method: 'POST',
      url: 'https://api.paysprint.in/api/v1/service/recharge/recharge/dorecharge',
      headers: {
        accept: 'text/plain',
        'content-type': 'application/json',
        Token: token,
      },
      data: rechargeData,
    };

    try {
      const res = await axios.request(options);
      const result = res.data;

      console.log('✅ Recharge Success:', result);

      if (!result.status) {
        Alert.alert('Recharge Failed', result.message || 'Transaction failed.');
        return;
      }

      navigation.navigate('successdth', {
        successdata: result,
        customerName,
        phoneNumber,
        selectedPlans,
        totalAmount,
      });
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Something went wrong';
      console.error('❌ Recharge Error:', err?.response?.data);
      Alert.alert('Recharge Failed', errorMessage);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        <Text style={styles.contactText}>
          {t('dth_account')}: {customerName}
        </Text>

        {/* Payment Summary Card */}
        <View style={styles.card}>
          <Text style={styles.totalText}>
            {t('total_payable')} ₹{totalAmount.toFixed(2)}
          </Text>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>{t('operator')}:</Text>
            <Text style={styles.value}>{operatorName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>{t('phone_number')}:</Text>
            <Text style={styles.value}>{phoneNumber}</Text>
          </View>

          <View style={styles.planContainer}>
            <Text style={styles.title}>{t('selected_plans')}</Text>
            {selectedPlans.map((plan, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.text}>• {plan.name}</Text>
                <Text style={styles.textSmall}>
                  {t('amount')}: ₹{plan.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Pay Button */}
        <TouchableOpacity style={styles.payButton} onPress={DoRecharge}>
          <Text style={styles.payButtonText}>
            {t('proceed_to_pay', { amount: totalAmount.toFixed(2) })}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DthDetailsScreen;

const styles = StyleSheet.create({
  contactText: {
    fontSize: 20,
    color: '#333',
    padding: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#F9F9F9',
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    color: '#777',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  planContainer: {
    marginTop: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#444',
  },
  textSmall: {
    fontSize: 14,
    color: '#666',
  },
  offerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  offerText: {
    fontSize: 16,
    color: '#333',
  },
  viewAll: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  payButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 25,
    elevation: 6,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  payButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
});