import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const DTHrecharge = ({ navigation }) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedOperatorId, setSelectedOperatorId] = useState('');
  const [selectedOperatorName, setSelectedOperatorName] = useState('');
const [token1, setToken1] = useState(null);
const [token2, setToken2] = useState(null);
const [token3, setToken3] = useState(null);
console.log("token3",token2);
  // 🔐 Get Token from backend
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('http://192.168.29.22:5000/api/token');
        const data = await response.json();
        setToken1(data.token1);
         setToken2(data.token2);
          setToken3(data.token3);
      } catch (err) {
        console.error('❌ Token Error:', err);
      }
    };
    fetchToken();
  }, []);
  useEffect(() => {
    if (!token3) return;

    const fetchOperators = async () => {
      try {
        const response = await axios.post(
          'https://api.paysprint.in/api/v1/service/recharge/recharge/getoperator',
          {},
          {
            headers: {
              accept: 'application/json',
              Token: token3,
            },
          }
        );

        const jsondata = response.data;
        if (jsondata && Array.isArray(jsondata.data)) {
          const dthOperators = jsondata.data
            .filter(item => item.category === 'DTH')
            .map(item => ({
              name: item.name,
              id: item.id,
            }));

          setProviders(dthOperators);
        } else {
          console.warn('Invalid DTH response format');
          setProviders([]);
        }
      } catch (error) {
        console.error('Error fetching DTH operators:', error);
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOperators();
  }, [token3]);

  const handleViewPlans = async () => {
    // if (!phoneNumber || !selectedOperatorId) {
    //   Alert.alert('Validation Error', 'Please enter customer ID and select DTH provider');
    //   return;
    // }

    try {
      setLoading(true);

  const hlrResponse = await axios.post(
      'https://api.paysprint.in/api/v1/service/recharge/hlrapi/hlrcheck',
      {
        number: phoneNumber,
        type: "dth",
      },
      {
        headers: {
          accept: 'application/json',
          Token: token1, // 👉 use token1 here
          'Content-Type': 'application/json',
        },
      }
    );

      const hlrData = hlrResponse.data?.info || {};
      const circle = hlrData.circle || '';
      const operatorName = hlrData.operator || '';
console.log(hlrResponse.data)
      if (!circle) {
        Alert.alert('Error', 'Circle information missing from HLR response.');
        return;
      }

      const plansResponse = await axios.post(
        'https://api.paysprint.in/api/v1/service/recharge/hlrapi/dthinfo',
        {
          canumber:phoneNumber,
          op: operatorName,
        },
        {
          headers: {
            accept: 'application/json',
            Token: token2,
            'Content-Type': 'application/json',
          },
        }
      );

      navigation.navigate('dthplan', {
        operatorName: selectedOperatorName,
        phoneNumber,
        selectedOperatorId,
        plans: plansResponse.data,
      });
      console.log(plansResponse.data)
    } catch (err) {
      console.error('❌ Error fetching plans:', err.response?.data || err.message);
      Alert.alert('Error', 'Something went wrong while checking HLR or fetching plans.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>DTH Providers</Text>

      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading...</Text>
      ) : (
        <>
          <FlatList
            data={providers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.provider,
                  selectedOperatorId === item.id && { backgroundColor: '#cce5ff' },
                ]}
                onPress={() => {
                  setSelectedOperatorId(item.id);
                  setSelectedOperatorName(item.name);
                }}
              >
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          <TextInput
            placeholder="Enter DTH Customer ID"
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="number-pad"
          />

          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleViewPlans}
            disabled={loading}
          >
            <Text style={{ color: '#fff' }}>{loading ? 'Processing...' : 'View Plans'}</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingLeft: 20,
  },
  provider: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    margin: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  proceedButton: {
    backgroundColor: '#007bff',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default DTHrecharge;