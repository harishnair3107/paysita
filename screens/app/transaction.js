import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // You can change to MaterialIcons if needed

const DummyTransactionScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');

  const dummyTransactions = [
    {
      id: 1,
      name: "Electricity Bill",
      amount: 500,
      date: "2025-07-21",
      status: "Success",
      icon: "zap",
    },
    {
      id: 2,
      name: "Mobile Recharge",
      amount: 249,
      date: "2025-07-20",
      status: "Pending",
      icon: "smartphone",
    },
    {
      id: 3,
      name: "Water Bill",
      amount: 300,
      date: "2025-07-19",
      status: "Failed",
      icon: "droplet",
    },
    {
      id: 4,
      name: "Gas Bill",
      amount: 550,
      date: "2025-07-18",
      status: "Success",
      icon: "wind",
    },
    {
      id: 5,
      name: "DTH Recharge",
      amount: 399,
      date: "2025-07-17",
      status: "Success",
      icon: "tv",
    },
    {
      id: 6,
      name: "Broadband",
      amount: 999,
      date: "2025-07-15",
      status: "Failed",
      icon: "wifi",
    },
  ];

  useEffect(() => {
    console.log("Loading dummy transaction data...");
    setTransactions(dummyTransactions);
  }, []);

  const filteredTransactions = transactions.filter((txn) =>
    txn?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Failed':
        return 'red';
      default:
        return 'black';
    }
  };

  const renderTransaction = ({ item }) => {
    console.log("Rendering:", item.name);
    return (
      <View style={styles.card}>
        <Icon name={item.icon} size={24} color="#333" style={styles.icon} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.amount}>₹{item.amount}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={{ color: getStatusColor(item.status), fontWeight: 'bold',marginLeft:250,marginTop:-25 }}>
            {item.status}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍 Search transactions..."
        value={search}
        onChangeText={(text) => {
          console.log("Search query:", text);
          setSearch(text);
        }}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransaction}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions found.</Text>
        }
      />
    </View>
  );
};

export default DummyTransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  icon: {
    marginRight: 12,
    alignSelf: 'center',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    color: '#444',
  },
  date: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 16,
  },
});
