import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default function PaymentqrScreen({ route, navigation }) {
  const { scannedData } = route.params; // You pass this from Scan screen
  const [amount, setAmount] = React.useState('');

  const handlePay = () => {
    if (!amount) {
      alert('Enter amount');
      return;
    }

    // You can handle UPI Payment API here (your Paysprint or other API)
    alert(`Paying ₹${amount} to ${scannedData}`);
    // After successful payment you can navigate to success page
  };

  return (
    <View style={styles.container}>
      <View style={styles.receiverInfo}>
        <Image
          source={require('../assets/drawer/JohnDoe.png')} // your local image for user icon
          style={styles.userIcon}
        />
        <Text style={styles.receiverName}>{scannedData || 'Receiver Name'}</Text>
      </View>

      <Text style={styles.label}>Enter Amount</Text>
      <TextInput
        style={styles.amountInput}
        placeholder="₹0.00"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    backgroundColor: '#fff',
  },
  receiverInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  userIcon: {
    width: 80,
    height: 80,
    borderRadius: 0,
    marginBottom: 10,
  },
  receiverName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  amountInput: {
    fontSize: 36,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
  },
  payButton: {
    backgroundColor: '#5D3FD3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});