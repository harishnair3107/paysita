
import React, { useState, useEffect,useRef } from 'react';
import {
  View, Text, StyleSheet, Image, TextInput, TouchableOpacity,
  Alert, FlatList, Modal, ActivityIndicator, Dimensions, Platform,ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Contacts from 'expo-contacts';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const ads = [
  {
    
    image: require('../assets/ad2.png')
  }
  
];
const MobileRecharge = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [Prepaidoperator, setPrepaidoperator] = useState([]);
  const [selectedOperatorId, setSelectedOperatorId] = useState(null);
  const [loading, setLoading] = useState(false);
const [token1, setToken1] = useState(null);
const [token2, setToken2] = useState(null);
const [token3, setToken3] = useState(null);

  const navigation = useNavigation();

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

  // 📡 Fetch Prepaid Operators
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
        const data = response.data;
        const filtered = data.data.filter((item) => item.category === "Prepaid");
        setPrepaidoperator(filtered);
      } catch (err) {
        console.error('❌ Operator Fetch Error:', err);
      }
    };
    fetchOperators();
  }, );

  // 📇 Open Contacts
  const openContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow access to contacts.');
      return;
    }
    const { data } = await Contacts.getContactsAsync({ fields: [Contacts.Fields.PhoneNumbers] });
    if (data.length > 0) {
      setContacts(data.filter(c => c.phoneNumbers && c.phoneNumbers.length > 0));
      setModalVisible(true);
    } else {
      Alert.alert('No contacts found');
    }
  };

  // 📌 Select Contact
  const selectContact = (contact) => {
    setPhoneNumber(contact.phoneNumbers?.[0]?.number || '');
    setModalVisible(false);
  };

  const handleViewPlans = async () => {
  try {
    setLoading(true);

    // ✅ Step 1: HLR Check (using token1)
    const hlrResponse = await axios.post(
      'https://api.paysprint.in/api/v1/service/recharge/hlrapi/hlrcheck',
      {
        number: phoneNumber,
        type: 'mobile',
      },
      {
        headers: {
          accept: 'application/json',
          Token: token1, // 👉 use token1 here
          'Content-Type': 'application/json',
        },
      }
    );
// console.log(token1)
    const hlrData = hlrResponse.data?.info || {};
    console.log('HLR Info:', hlrData);

    const circle = hlrData.circle || '';
    const operatorName = hlrData.operator || '';

    if (!circle || !operatorName) {
      Alert.alert('Error', 'Circle or Operator info missing from HLR response.');
      setLoading(false);
      return;
    }

    // ✅ Step 2: Fetch Plans (using token2)
    const plansResponse = await axios.post(
      'https://api.paysprint.in/api/v1/service/recharge/hlrapi/browseplan',
      {
        circle: circle,
        op: operatorName,
      },
      {
        headers: {
          accept: 'application/json',
          Token: token2, // 👉 use token2 here
          'Content-Type': 'application/json',
        },
      }
    );

    const plans = plansResponse.data;
    // console.log('📦 Plans:', plans);

    navigation.navigate('ViewPlans', {
      operatorName: Prepaidoperator.find(op => op.id === selectedOperatorId)?.name,
      phoneNumber,
      selectedOperatorId,
      plans: plans, // or plans.info if needed
    });

  } catch (err) {
    console.error('❌ Error fetching plans:', err.response?.data || err.message);
    Alert.alert('Error', 'Something went wrong while checking HLR or fetching plans.');
  } finally {
    setLoading(false);
  }
};


  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % ads.length;
      scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex]);


  
  return (
    
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.containers}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        {ads.map((ad, index) => (
          <View key={index} style={styles.adContainers}>
            <Image source={ad.image} style={styles.image} resizeMode="cover" />
            <Text style={styles.title}>{ad.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
      <View style={styles.screen}>

        {/* 🔢 Phone Input */}
        <View style={styles.searchContainer}>
          <Image source={require('../assets/mobile/search.png')} style={{ width: 25, height: 25 }} />
          <TextInput
            style={styles.searchtextStyle}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity onPress={openContacts}>
            <Image source={require('../assets/mobile/contact.png')} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        </View>

        {/* 🏢 Operator Picker */}
        {/* <Text style={styles.label}>Select Operator:</Text> */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedOperatorId}
            onValueChange={(value) => setSelectedOperatorId(value)}
          >
            <Picker.Item label="Select Operator" value={null} />
            {Prepaidoperator.map((op, index) => (
              <Picker.Item key={index} label={op.name} value={op.id} />
            ))}
          </Picker>
        </View>

        {/* 🚀 Proceed */}
        <TouchableOpacity
          style={styles.proceedButtons}
          onPress={handleViewPlans}
          disabled={loading}
        >
          <Text style={{ color: '#fff' }}>{loading ? 'Processing...' : 'View Plans'} </Text>
          
        </TouchableOpacity>
      </View>

      {/* 📇 Contact Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectContact(item)} style={styles.contactItem}>
                <Text>{item.name}</Text>
                <Text>{item.phoneNumbers?.[0]?.number}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MobileRecharge;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: width * 0.05,
    marginTop: Platform.OS === 'ios' ? 30 : 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    elevation: 2,
    marginBottom: 20,
  },
  searchtextStyle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  pickerWrapper: {
    backgroundColor: '#FFFBE6',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#FFC107',
    marginBottom: 30,
  },
  proceedButtons: {
    backgroundColor: '#1d154a',
    padding: width * 0.04,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: width * 0.05,
  },
  contactItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
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
  card: {
    width: width,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
 containers: {
    width,
    height: 200,
  },
  adContainers: {
    width,
    height: 160,
    position: 'relative',
  },
  image: {
    width,
    height: 180,
  },
 
});
