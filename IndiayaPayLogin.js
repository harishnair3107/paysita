import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IndiayaPayLogin = () => {
   const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const isValid = mobileNumber.length === 10;
  const navigation = useNavigation();
  const [scale] = useState(new Animated.Value(1));

  const handleProceed = async () => {
    if (isValid && name) {
      try {
        const response = await axios.post('http://192.168.29.22:5000/api/auth/createUser', {
          mobile: mobileNumber,
          name,
        });

        if (response.status === 201) {
          // Save user data in AsyncStorage after successful creation
          await AsyncStorage.setItem('user', JSON.stringify({ name, mobile: mobileNumber }));
          Alert.alert('Success', response.data.message);
          navigation.navigate('OTP-Verification', { mobileNumber, name });
        } else {
          Alert.alert('Error', response.data.message);
        }
      } catch (error) {
        Alert.alert('Error', 'There was an error creating the user.');
        console.error(error);
      }
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid mobile number and name.');
    }
  };

  // Check if user is already logged in when the app starts
  useEffect(() => {
    const checkUserLogin = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        // If user data exists, navigate to OTP verification or home screen
navigation.replace('MainScreen', { 
  name: parsedUser.name, 
  mobile: parsedUser.mobileNumber 
});
      }
    };  

    checkUserLogin();
  }, []);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground source={require('./assets/bg-yellow.jpeg')} style={styles.background}>
      <View style={styles.card}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            {/* <Icon name="user" size={40} color="#fff" /> */}
          </View>
        </View>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to use IndiayaPay</Text>

        <View style={styles.inputContainer}>
          <TextInput placeholder="Enter your name" value={name} onChangeText={setName} style={styles.input} />
        </View>

        <View style={styles.inputContainer}>
          {/* <Icon name="phone" size={20} color="#FF6F00" style={styles.icon} /> */}
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="numeric"
            maxLength={10}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholderTextColor="#999"
          />
        </View>

        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity
            style={[styles.loginButton, !isValid && styles.disabledButton]}
            onPress={handleProceed}
            disabled={!isValid}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <Text style={styles.loginText}>Create Account</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* <Text style={styles.orText}>Or sign up with</Text>
        <View style={styles.socialRow}>
          <Icon name="google" size={24} color="#DB4437" style={styles.socialIcon} />
          <Icon name="facebook" size={24} color="#4267B2" style={styles.socialIcon} />
          <Icon name="apple" size={24} color="#000" style={styles.socialIcon} />
        </View> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'absolute',
    top: -40,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1d154a',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#fcbf49',
    width: '150',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 15,
    color: '#888',
    fontSize: 14,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
});

export default IndiayaPayLogin;