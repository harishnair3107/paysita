import { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';

const Paybill = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setData([
      {
        state: 'Maharashtra',
        providers: [
          {
            name: 'Adani Electricity Mumbai Limited (AEML)',
            logo: require('../assets/electric/adani-mumbai.png'),
          },
          {
            name: 'BEST Mumbai - Brihanmumbai Electricity',
            logo: require('../assets/electric/best.png'),
          },
        ],
      },
      {
        state: 'Delhi',
        providers: [
          {
            name: 'Tata Power Delhi Distribution Limited',
            logo: require('../assets/electric/tata-delhi.png'),
          },
        ],
      },
    ]);
  }, []);

  const filteredData = data
    .map(stateObj => ({
      ...stateObj,
      providers: stateObj.providers.filter(provider =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(stateObj => stateObj.providers.length > 0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screen}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image source={require('../assets/electric/search.png')} style={{ width: 25, height: 25 }} />
          <TextInput
            style={styles.searchtextStyle}
            placeholder="Search Biller by Name"
            keyboardType="default"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* List of Providers */}
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.state}>{item.state}</Text>
              {item.providers.map((provider, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.provider}
                  onPress={() => {
                    navigation.navigate('PaySubdivision', {
                      name: provider.name,
                      logo: provider.logo,
                    });
                  }}
                >
                  <Image source={provider.logo} style={styles.logo} />
                  <Text style={styles.name}>{provider.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: { padding: 10, backgroundColor: '#FFF', borderRadius: 10, margin: 20, flexDirection: 'row', alignItems: 'center' },
  searchtextStyle: { flex: 1, fontSize: 16, color: '#807C7C' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, elevation: 3, marginBottom: 10 },
  state: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  provider: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 8, backgroundColor: '#fff' },
  logo: { width: 40, height: 40, marginRight: 10, resizeMode: 'contain' },
  name: { fontSize: 16 },
});

export default Paybill;