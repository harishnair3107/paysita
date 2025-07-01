import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
const UPILinkScreen = ({ route}) => {
const { bank } = route.params;
  return (
    <View style={styles.container}>
      <Image source={bank.logo} style={styles.bankLogo} />
      <Text style={styles.title}>{bank.name}</Text>
      <Text style={styles.subtitle}>Enter your UPI ID linked to {bank.name}</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter UPI ID or Account Number"
          placeholderTextColor="#bbb"
          keyboardType="default"/>
        <TextInput
          style={styles.input}
          placeholder="IFSC Code (Optional)"
          placeholderTextColor="#bbb"/>

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('UPI ID Linked Successfully!')} >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );};
export default UPILinkScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bankLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 28,
  },
  form: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  button: {
    backgroundColor: '#1d154a',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
