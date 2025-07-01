import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPVerification = ({ navigation,route }) => {
  const [otp, setOtp] = useState('');
  const DEFAULT_OTP = '123456'; // Default OTP for testing
  const { name } = route.params;
const handleVerifyOTP = async () => {
  if (otp === DEFAULT_OTP) {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');  // ✅ Save logged-in state


      // Delay for 2 seconds before navigation
      setTimeout(() => {
              // Alert.alert('Success', 'OTP Verified Successfully!');

        navigation.replace('MainScreen', { name });
      }, 2000);

    } catch (error) {
      console.error("Failed to save login status", error);
    }
  } else {
    Alert.alert('Error', 'Invalid OTP. Try Again.');
  }
};

  return (
    <ImageBackground 
    source={require('./assets/bg-yellow.jpeg')}
    style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.info}>Enter OTP (Default: {DEFAULT_OTP})</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit OTP"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent card
    padding: 80,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#888',
    marginBottom: 25,
  },
  input: {
    width: '270',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#FF6F00',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FF6F00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensure the background covers the whole screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});