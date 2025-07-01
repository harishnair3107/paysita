import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const banks = [
  { id: '1', name: 'SBI', logo: require('../assets/sbi.png') },
  { id: '2', name: 'HDFC Bank', logo: require('../assets/hdfc1.png') },
  { id: '3', name: 'ICICI Bank', logo: require('../assets/icici.jpeg') },
];

const BankUPISelectionScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBanks = banks.filter(bank =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`🔍 ${t('screen.search_placeholder')}`}
          placeholderTextColor="#555"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredBanks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.bankCard}>
            <Image source={item.logo} style={styles.bankLogo} />
            <View style={styles.bankInfo}>
              <Text style={styles.bankName}>{item.name}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('UPILinkScreen', { bank: item })}
                >
                  <Text style={styles.buttonText}>{t('screen.link_upi')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#28a745' }]}
                  onPress={() => navigation.navigate('CheckBalanceScreen', { bank: item })}
                >
                  <Text style={styles.buttonText}>{t('screen.check_balance')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  searchContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  searchInput: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingLeft: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  bankCard: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  bankLogo: {
    width: 55,
    height: 55,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0066CC',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default BankUPISelectionScreen;
