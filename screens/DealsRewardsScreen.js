import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, FlatList, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';

const HorizontalCards = ({ data }) => (
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={[styles.hCard, { backgroundColor: item.bgColor }]}> 
        <Image source={item.logo} style={styles.hImage} />
        <Text style={styles.hTitle}>{item.title}</Text>
        <Text style={styles.hDesc}>{item.description}</Text>
      </View>
    )}
    contentContainerStyle={{ paddingLeft: 16 }}
  />
);

const VerticalCards = ({ data }) => (
  <View style={styles.vList}>
    {data.map((item) => (
      <View key={item.id} style={[styles.vCard, { backgroundColor: item.bgColor }]}> 
        <Image source={item.logo} style={styles.vImage} />
        <View style={styles.vContent}>
          <Text style={styles.vTitle}>{item.title}</Text>
          <Text style={styles.vDesc}>{item.description}</Text>
        </View>
      </View>
    ))}
  </View>
);

const Deals = () => {
  const { t } = useTranslation();
  const dealsData = [
    { id: '1', title: t('deals.dominos_title'), description: t('deals.dominos_desc'), logo: require('../assets/dominos.png'), bgColor: '#FF6F61' },
    { id: '2', title: t('deals.amazon_title'), description: t('deals.amazon_desc'), logo: require('../assets/amazon.png'), bgColor: '#F57C00' },
    { id: '3', title: t('deals.flight_title'), description: t('deals.flight_desc'), logo: require('../assets/flight.jpeg'), bgColor: '#87CEFA' },
    { id: '4', title: t('deals.swiggy_title'), description: t('deals.swiggy_desc'), logo: require('../assets/swiggy.png'), bgColor: '#D81B60' },
    { id: '5', title: t('deals.bigbasket_title'), description: t('deals.bigbasket_desc'), logo: require('../assets/bigbasket.png'), bgColor: '#43A047' },
    { id: '6', title: t('deals.myntra_title'), description: t('deals.myntra_desc'), logo: require('../assets/myntra.png'), bgColor: '#d32f2f' },
    { id: '7', title: t('deals.uber_title'), description: t('deals.uber_desc'), logo: require('../assets/uber.png'), bgColor: '#1976d2' },
    { id: '9', title: t('deals.amazon_grocery_title'), description: t('deals.amazon_grocery_desc'), logo: require('../assets/amazon-grocery.jpeg'), bgColor: '#388e3c' },
    { id: '10', title: t('deals.coffee_title'), description: t('deals.coffee_desc'), logo: require('../assets/coffee.jpeg'), bgColor: '#d32f2f' }
  ];

  return (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>{t('deals.trending_now')}</Text>
      <HorizontalCards data={dealsData} />

      <Text style={styles.sectionTitle}>{t('deals.featured')}</Text>
      <View style={[styles.hCard, styles.largeCard]}>
        <Image source={require('../assets/coffee.jpeg')} style={styles.hImage} />
        <Text style={styles.hTitle}>{t('deals.featured_title')}</Text>
        <Text style={styles.hDesc}>{t('deals.featured_desc')}</Text>
      </View>

      <VerticalCards data={dealsData.slice(5)} />
      <Text style={styles.sectionTitle}>{t('deals.partner_offers')}</Text>
      <HorizontalCards data={dealsData.slice(1,3)} />
    </ScrollView>
  );
};

const Rewards = () => {
  const { t } = useTranslation();
  const rewardsData = [
    { id: '1', title: t('rewards.cashback_50'), description: t('rewards.cashback_50_desc'), logo: require('../assets/cash.jpeg'), bgColor: '#87CEFA' },
    { id: '2', title: t('rewards.wallet_20'), description: t('rewards.wallet_20_desc'), logo: require('../assets/card.png'), bgColor: '#00897B' },
    { id: '3', title: t('rewards.scratch_card'), description: t('rewards.scratch_card_desc'), logo: require('../assets/scratch.jpeg'), bgColor: '#546E7A' },
    { id: '4', title: t('rewards.referral'), description: t('rewards.referral_desc'), logo: require('../assets/refer.jpeg'), bgColor: '#1a237e' },
    { id: '5', title: t('rewards.loyalty'), description: t('rewards.loyalty_desc'), logo: require('../assets/loyalty.jpg'), bgColor: '#263238' },
    { id: '6', title: t('rewards.recharge_cashback'), description: t('rewards.recharge_cashback_desc'), logo: require('../assets/cashback.png'), bgColor: '#0288d1' },
    { id: '7', title: t('rewards.bonus_points'), description: t('rewards.bonus_points_desc'), logo: require('../assets/bonus.jpeg'), bgColor: '#9c27b0' },
    { id: '8', title: t('rewards.voucher'), description: t('rewards.voucher_desc'), logo: require('../assets/voucher.png'), bgColor: '#388e3c' },
    { id: '9', title: t('rewards.exclusive_access'), description: t('rewards.exclusive_access_desc'), logo: require('../assets/access.jpeg'), bgColor: '#0288d1' }
  ];

  return (
    <ScrollView style={styles.tabContent}>
      <View style={[styles.hCard, styles.largeCard]}>
        <Image source={require('../assets/bonus.jpeg')} style={styles.hImage} />
        <Text style={styles.hTitle}>{t('rewards.big_reward_title')}</Text>
        <Text style={styles.hDesc}>{t('rewards.big_reward_desc')}</Text>
      </View>
      <Text style={styles.sectionTitle}>{t('rewards.daily_offers')}</Text>
      <HorizontalCards data={rewardsData.slice(0, 4)} />

      <Text style={styles.sectionTitle}>{t('rewards.earned')}</Text>
      <VerticalCards data={rewardsData} />

      <Text style={styles.sectionTitle}>{t('rewards.top_rewards')}</Text>
      <HorizontalCards data={rewardsData.slice(4)} />
    </ScrollView>
  );
};

export default function DealsRewardsScreen() {
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();
  const routes = [
    { key: 'deals', title: 'Deals' },
    { key: 'rewards', title: 'Rewards' },
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIndex(1);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const renderScene = SceneMap({
    deals: Deals,
    rewards: Rewards,
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabHeader}>
   
        <TouchableOpacity
          style={[styles.tabButton, index === 0 && styles.activeTab]}
          onPress={() => setIndex(0)}>
          <Text style={index === 0 ? styles.activeText : styles.inactiveText}>Deals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, index === 1 && styles.activeTab]}
          onPress={() => setIndex(1)}>
          <Text style={index === 1 ? styles.activeText : styles.inactiveText}>Rewards</Text>
        </TouchableOpacity>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={() => null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 0,
    backgroundColor: '#ffffff'
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'transparent'
  },
  activeTab: {
    borderColor: '#00e676'
  },
  activeText: {
    color: '#1d154a',
    fontWeight: 'bold',
    fontSize: 16
  },
  inactiveText: {
    color: '#000000',
    fontSize: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 16
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  hCard: {
    width: 260,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6
  },
  hImage: {
    width: 220,
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover'
  },
  hTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  hDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center'
  },
  vList: {
    padding: 16
  },
  vCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3
  },
  vImage: {
    width: 180,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
    resizeMode: 'cover'
  },
  vContent: {
    flex: 1
  },
  largeCard: {
    width: '100%',
    height: 220,
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#FFE7E7',
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6
  },
  vTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  vDesc: {
    fontSize: 14,
    color: '#666'
  }
});
