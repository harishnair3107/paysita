import React, { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../theme/Theme';

const Paybill = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);

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

  const renderProvider = (provider, idx) => (
    <TouchableOpacity
      key={idx}
      style={[styles.provider, { backgroundColor: colors.option }]}
      onPress={() => {
        navigation.navigate('PaySubdivision', {
          name: provider.name,
          logo: provider.logo,
        });
      }}
    >
      <View style={[styles.logoWrapper, { backgroundColor: colors.background }]}>
        <Image source={provider.logo} style={styles.logo} />
      </View>
      <Text style={[styles.name, { color: colors.text }]}>{provider.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.section}>
      <View style={styles.stateHeader}>
        <Ionicons name="location" size={16} color="#4F46E5" />
        <Text style={[styles.state, { color: colors.text }]}>{item.state}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: colors.option }]}>
        {item.providers.map((provider, idx) => (
          <View key={idx}>
            {renderProvider(provider, idx)}
            {idx < item.providers.length - 1 && (
              <View style={[styles.divider, { backgroundColor: colors.border || '#E5E7EB' }]} />
            )}
          </View>
        ))}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconWrapper}>
        <Ionicons name="search" size={48} color="#9CA3AF" />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>No Results Found</Text>
      <Text style={styles.emptySubtitle}>Try searching with a different keyword</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top", "left", "right"]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Pay Bill</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={[styles.searchContainer, { backgroundColor: colors.option }]}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search Biller by Name"
            placeholderTextColor="#9CA3AF"
            keyboardType="default"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* List of Providers */}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  stateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    paddingLeft: 4,
  },
  state: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  provider: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  logoWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    marginHorizontal: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyIconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default Paybill;