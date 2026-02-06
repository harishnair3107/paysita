import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../theme/Theme';

const API_URL = ''; // Replace with actual API if available

const PaySubdivision = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useContext(ThemeContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hide the default navigator header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Get name & logo from previous screen
  const { name, logo } = route.params || {};
  const resolvedLogo = typeof logo === 'number' ? logo : { uri: logo };

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

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PayConsumer', {
          name,
          logo,
          subdivision: item,
        })
      }
      style={[
        styles.itemContainer,
        { backgroundColor: colors.option },
        index < filteredData.length - 1 && [styles.itemDivider, { borderBottomColor: colors.border || '#E5E7EB' }],
      ]}
    >
      <View style={[styles.itemIconWrapper, { backgroundColor: colors.background }]}>
        <Ionicons name="layers" size={18} color="#4F46E5" />
      </View>
      <View style={styles.itemTextGroup}>
        <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.itemCode, { color: colors.text, opacity: 0.5 }]}>{item.code}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconWrapper}>
        <Ionicons name="search" size={44} color="#9CA3AF" />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>No Results Found</Text>
      <Text style={styles.emptySubtitle}>Try a different search term</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Select Sub Division</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Company Logo Card */}
      <View style={[styles.companyCard, { backgroundColor: colors.option }]}>
        {logo && (
          <View style={[styles.logoWrapper, { backgroundColor: colors.background }]}>
            <Image source={resolvedLogo} style={styles.logo} />
          </View>
        )}
        {name && <Text style={[styles.companyName, { color: colors.text }]}>{name}</Text>}
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={[styles.searchContainer, { backgroundColor: colors.option }]}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search Sub Division"
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

      {/* Loading or List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
        </View>
      ) : (
        <View style={[styles.listCard, { backgroundColor: colors.option }]}>
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
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

  // Company card
  companyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 16,
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  logoWrapper: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },

  // Search
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

  // List card wrapper
  listCard: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  // List items
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  itemDivider: {
    borderBottomWidth: 1,
  },
  itemIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemTextGroup: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemCode: {
    fontSize: 13,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIconWrapper: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default PaySubdivision;