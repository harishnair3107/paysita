import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const DTHPlansScreen = ({ route, navigation }) => {
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
      Alert.alert('Select at least one plan to proceed');
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
  // console.log(selectedPlans)

const handleSelectAll = () => {
  if (selectedPlans.length === parsedPlans.length) {
    setSelectedPlans([]); // Deselect all
  } else {
    setSelectedPlans(parsedPlans); // Select all
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>DTH Customer Details</Text>

      <View style={styles.card}>
        <DetailRow label="Operator" value={selectedOperatorName} />
        <DetailRow label="Phone Number" value={phoneNumber} />
        <DetailRow label="Customer Name" value={customerName} />
        <DetailRow
          label="Status"
          value={status}
          valueStyle={status === 'Active' ? styles.active : styles.inactive}
        />
        <DetailRow label="Balance" value={`₹${Balance}`} />
        <DetailRow label="Next Recharge Date" value={NextRechargeDate} />
        <DetailRow label="Monthly Recharge" value={`₹${MonthlyRecharge}`} />
      </View>

<View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Select Plans</Text>
  {parsedPlans.length > 0 && (
    <TouchableOpacity onPress={handleSelectAll}>
      <Text style={styles.selectAllText}>
        {selectedPlans.length === parsedPlans.length ? 'Deselect All' : 'Select All'}
      </Text>
    </TouchableOpacity>
  )}
</View>
      <View style={styles.card}>
        {parsedPlans.length === 0 ? (
          <Text style={styles.noPlansText}>No plans found</Text>
        ) : (
          parsedPlans.map((plan) => {
            const isSelected = selectedPlans.some((p) => p.id === plan.id);
            return (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planItem,
                  isSelected ? styles.planSelected : null,
                ]}
                onPress={() => togglePlanSelection(plan)}
              >
                <Text style={styles.planText}>• {plan.name}</Text>
                <Text style={styles.planText}>₹{plan.price.toFixed(2)}</Text>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      {selectedPlans.length > 0 && (
        <View style={styles.totalCard}>
          <Text style={styles.totalText}>Total: ₹{totalAmount.toFixed(2)}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const DetailRow = ({ label, value, valueStyle }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, valueStyle]}>{value}</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fafd',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '600',
    flex: 1,
  },
  value: {
    fontSize: 15,
    color: '#111827',
    flex: 1,
    textAlign: 'right',
  },
  active: {
    color: '#059669', // green
    fontWeight: '700',
  },
  inactive: {
    color: '#dc2626', // red
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1e293b',
  },
  planItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  planSelected: {
    backgroundColor: '#dbeafe', // light blue
    borderColor: '#3b82f6', // blue border
  },
  planText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  noPlansText: {
    fontStyle: 'italic',
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 10,
  },
  totalCard: {
    backgroundColor: '#ecfdf5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#065f46',
  },
  proceedButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  proceedText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},
selectAllText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#3b82f6',
},

});


export default DTHPlansScreen;