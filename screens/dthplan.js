import React, { useState, useContext, useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../theme/Theme';

const DTHPlansScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useContext(ThemeContext);

  const {
    operatorName: selectedOperatorName,
    phoneNumber,
    selectedOperatorId,
    plans,
  } = route.params;

  const info = plans?.info?.[0] || {};
  const {
    Balance,
    customerName,
    NextRechargeDate,
    status,
    planname,
    MonthlyRecharge,
  } = info;

  // Hide the default navigator header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Parse planname into objects with name & price
  const parsedPlans = planname
    ? planname
        .split(',')
        .map((p, index) => {
          const match = p.trim().match(/(.+?)\s*-\s*Rs\s*(\d+(\.\d+)?)/i);
          if (match) {
            return {
              id: index,
              name: match[1].trim(),
              price: parseFloat(match[2]),
            };
          }
          return null;
        })
        .filter((p) => p !== null)
    : [];

  const [selectedPlans, setSelectedPlans] = useState([]);

  const togglePlanSelection = (plan) => {
    const exists = selectedPlans.some((p) => p.id === plan.id);
    if (exists) {
      setSelectedPlans((prev) => prev.filter((p) => p.id !== plan.id));
    } else {
      setSelectedPlans((prev) => [...prev, plan]);
    }
  };

  const totalAmount = selectedPlans.reduce((sum, p) => sum + p.price, 0);

  const handleProceed = () => {
    if (selectedPlans.length === 0) {
      Alert.alert('No Plans Selected', 'Select at least one plan to proceed');
      return;
    }

    navigation.navigate('DthDetailsScreen', {
      selectedPlans,
      selectedOperatorId,
      totalAmount,
      customerName,
      phoneNumber,
      operatorName: selectedOperatorName,
    });
  };

  const handleSelectAll = () => {
    if (selectedPlans.length === parsedPlans.length) {
      setSelectedPlans([]); // Deselect all
    } else {
      setSelectedPlans(parsedPlans); // Select all
    }
  };

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>DTH Plans</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Customer Details Card */}
        <View style={[styles.card, { backgroundColor: colors.option }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="person-circle" size={24} color={colors.accent} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Customer Details</Text>
          </View>

          <DetailRow label="Operator" value={selectedOperatorName} colors={colors} />
          <DetailRow label="Phone Number" value={phoneNumber} colors={colors} />
          <DetailRow label="Customer Name" value={customerName} colors={colors} />
          <DetailRow
            label="Status"
            value={status}
            valueStyle={status === 'Active' ? styles.active : styles.inactive}
            colors={colors}
          />
          <DetailRow label="Balance" value={`₹${Balance}`} colors={colors} />
          <DetailRow label="Next Recharge Date" value={NextRechargeDate} colors={colors} />
          <DetailRow label="Monthly Recharge" value={`₹${MonthlyRecharge}`} colors={colors} />
        </View>

        {/* Plans Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrapper}>
            <Ionicons name="list" size={20} color={colors.accent} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Plans</Text>
          </View>
          {parsedPlans.length > 0 && (
            <TouchableOpacity
              style={[styles.selectAllButton, { backgroundColor: colors.accent }]}
              onPress={handleSelectAll}
            >
              <Ionicons
                name={selectedPlans.length === parsedPlans.length ? 'checkbox' : 'checkbox-outline'}
                size={16}
                color={colors.accentText}
              />
              <Text style={[styles.selectAllText, { color: colors.accentText }]}>
                {selectedPlans.length === parsedPlans.length ? 'Deselect All' : 'Select All'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.card, { backgroundColor: colors.option }]}>
          {parsedPlans.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="document-text-outline" size={48} color={colors.muted} />
              <Text style={[styles.noPlansText, { color: colors.muted }]}>No plans available</Text>
            </View>
          ) : (
            parsedPlans.map((plan, index) => {
              const isSelected = selectedPlans.some((p) => p.id === plan.id);
              return (
                <TouchableOpacity
                  key={plan.id}
                  style={[
                    styles.planItem,
                    { backgroundColor: colors.background, borderColor: colors.border },
                    isSelected && [styles.planSelected, { backgroundColor: colors.accent + '15', borderColor: colors.accent }],
                    index < parsedPlans.length - 1 && { marginBottom: 10 },
                  ]}
                  onPress={() => togglePlanSelection(plan)}
                >
                  <View style={styles.planLeft}>
                    <View
                      style={[
                        styles.checkbox,
                        { borderColor: isSelected ? colors.accent : colors.border },
                        isSelected && { backgroundColor: colors.accent },
                      ]}
                    >
                      {isSelected && <Ionicons name="checkmark" size={14} color={colors.accentText} />}
                    </View>
                    <Text style={[styles.planText, { color: colors.text }]} numberOfLines={2}>
                      {plan.name}
                    </Text>
                  </View>
                  <Text style={[styles.planPrice, { color: colors.text }]}>₹{plan.price.toFixed(2)}</Text>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {/* Total Card */}
        {selectedPlans.length > 0 && (
          <View style={[styles.totalCard, { backgroundColor: colors.successBg, borderColor: colors.success }]}>
            <View style={styles.totalContent}>
              <View style={styles.totalLeft}>
                <Ionicons name="calculator" size={20} color={colors.success} />
                <Text style={[styles.totalLabel, { color: colors.success }]}>Total Amount</Text>
              </View>
              <Text style={[styles.totalAmount, { color: colors.success }]}>
                ₹{totalAmount.toFixed(2)}
              </Text>
            </View>
            <Text style={[styles.totalCount, { color: colors.success }]}>
              {selectedPlans.length} {selectedPlans.length === 1 ? 'plan' : 'plans'} selected
            </Text>
          </View>
        )}

        {/* Spacer */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Proceed Button */}
      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.proceedButton, { backgroundColor: colors.button }]}
          onPress={handleProceed}
        >
          <Text style={styles.proceedText}>Proceed to Payment</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const DetailRow = ({ label, value, valueStyle, colors }) => (
  <View style={styles.row}>
    <Text style={[styles.label, { color: colors.subtext }]}>{label}</Text>
    <Text style={[styles.value, { color: colors.text }, valueStyle]}>{value}</Text>
  </View>
);

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

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  // Cards
  card: {
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
  },

  // Detail rows
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  active: {
    color: '#10B981',
    fontWeight: '700',
  },
  inactive: {
    color: '#EF4444',
    fontWeight: '700',
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  selectAllText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Plan items
  planItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  planSelected: {
    borderWidth: 2,
  },
  planLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  planText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  planPrice: {
    fontSize: 15,
    fontWeight: '700',
  },

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noPlansText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },

  // Total card
  totalCard: {
    padding: 16,
    borderRadius: 14,
    marginTop: 16,
    borderWidth: 1.5,
  },
  totalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  totalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  totalCount: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
  },

  // Footer
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  proceedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default DTHPlansScreen;