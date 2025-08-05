import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const ReferalHistory = () => {
  const { t } = useTranslation();

  // Dummy referral data
  const referralData = [
    {
      id: '1',
      name: 'name_aarohi_joshi',
      mobile: '9876543210',
      product: 'product_home_loan',
      dateTime: '2024-07-15T10:30:00',
      coins: 50,
      status: 'status_approved',
    },
    {
      id: '2',
      name: 'name_ravi_kumar',
      mobile: '7890123456',
      product: 'product_credit_card',
      dateTime: '2024-07-18T15:00:00',
      coins: 30,
      status: 'status_pending',
    },
    {
      id: '3',
      name: 'name_sneha_patil',
      mobile: '9123456780',
      product: 'product_insurance',
      dateTime: '2024-07-20T12:45:00',
      coins: 40,
      status: 'status_approved',
    },
  ];

  const formatDateTime = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(dateString).toLocaleString('en-IN', options);
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return styles.approved;
      case 'pending':
        return styles.pending;
      case 'rejected':
        return styles.rejected;
      default:
        return {};
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{t(item.name)}</Text>
          <Text style={styles.info}>{t('mobile')}: {item.mobile}</Text>
          <Text style={styles.info}>{t('product')}: {t(item.product)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>+{item.coins} 🪙</Text>
          <Text style={styles.time}>{formatDateTime(item.dateTime)}</Text>
          <Text style={[styles.status, getStatusStyle(t(item.status).toLowerCase())]}>
            {t(item.status)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={referralData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ReferalHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
  amountContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007E33',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    textTransform: 'capitalize',
    overflow: 'hidden',
  },
  approved: {
    backgroundColor: '#DFF6DD',
    color: '#2E7D32',
  },
  pending: {
    backgroundColor: '#FFF4CC',
    color: '#B26A00',
  },
  rejected: {
    backgroundColor: '#FFCDD2',
    color: '#C62828',
  },
});
