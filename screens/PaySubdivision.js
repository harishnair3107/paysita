import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = ''; // Replace with actual API if available

const PaySubdivision = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get name & logo from previous screen
  const { name, logo } = route.params || {};
  const resolvedLogo = typeof logo === 'number' ? logo : { uri: logo }; // Handle local & remote images

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (API_URL) {
          const response = await fetch(API_URL);
          const json = await response.json();
          setData(json);
        } else {
          throw new Error('No API URL provided');
        }
      } catch (error) {
        console.log('API failed, using hardcoded data.');
        setData([
          { id: '19', name: 'VASAI', code: '19 AG/STR S/DN' },
          { id: '27', name: 'VASAI E. AG/STR', code: '27 S/DN' },
          { id: '35', name: 'NALASOPARA', code: '35 AG/ST.SDN' },
          { id: '43', name: 'VIRAR AG/STR', code: '43 S/DN' },
          { id: '233', name: 'CHOPDA I', code: '233 S/DN' },
          { id: '235', name: 'ERANDOL', code: '235 S/DIVN' },
          { id: '236', name: 'JALGAON (U)-I', code: '236 S/DN' },
          { id: '240', name: 'CHALISGAON-U', code: '240' },
          { id: '306', name: 'ACHALPUR CAMP', code: '306 S/DN' },
          { id: '311', name: 'PANVEL', code: '311' },
          { id: '329', name: 'PANVEL I (BHINGARI)', code: '329' },
          { id: '337', name: 'URAN', code: '337' },
          { id: '345', name: 'KALAMBOLI', code: '345 SUB DIVN' },
        ]);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter list based on search query
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Company Logo and Name */}
      {logo && <Image source={resolvedLogo} style={styles.logo} />}
      {name && <Text style={styles.companyName}>{name}</Text>}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image source={require('../assets/electric/search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchtextStyle}
          placeholder="Select Sub Division/ERO/BU"
          keyboardType="default"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Loading Indicator */}
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}

      {/* List of Subdivisions */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PayConsumer', {
                name, // Company Name
                logo, // Logo
                subdivision: item, // Selected Subdivision
              })
            }
            style={styles.itemContainer}
          >
            <Image source={require('../assets/electric/best.png')} style={styles.itemIcon} />
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  logo: { width: 50, height: 50, alignSelf: 'center', marginBottom: 10, resizeMode: 'contain' },
  companyName: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  searchIcon: { width: 25, height: 25, marginRight: 5 },
  searchtextStyle: { flex: 1, fontSize: 16, color: '#807C7C' },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  itemIcon: { width: 30, height: 30, marginRight: 10 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemCode: { fontSize: 14, color: 'gray' },
});

export default PaySubdivision;