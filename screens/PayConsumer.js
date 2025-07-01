import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useNavigation } from '@react-navigation/native';

const PayConsumer = ({ route, navigation }) => {
  const { name, logo, subdivision } = route.params || {};
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Provider & Subdivision Info Card */}
      <View style={styles.card}>
        {logo && (
          <Image
            source={typeof logo === 'string' ? { uri: logo } : logo}
            style={styles.logo}
          />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name || 'Consumer Screen'}</Text>
          {subdivision && (
            <Text style={styles.subdivision}>
              {subdivision.name} ({subdivision.code})
            </Text>
          )}
        </View>
      </View>

      {/* Consumer Number Input Field */}
      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Consumer Number"
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={styles.sampleText}>View Sample Bill</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.helperText}>Please enter your 12-digit Consumer Number</Text>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity 
        style={styles.proceedButton} 
      >
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>  

      {/* Modal for Image Viewing with Zoom Support */}
      <Modal visible={visible} transparent={true} onRequestClose={() => setVisible(false)}>
        <ImageViewer
          imageUrls={[{ url: 'https://www.adanielectricity.com/-/media/Project/ElectricityNew/knowYourBill/Know-Your-Bill.png' }]}
          enableSwipeDown={true}
          onSwipeDown={() => setVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F9F9F9', // Slightly lighter background color for a fresher look
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    width: '100%',
    gap: 15,
    elevation: 5,
    marginTop:50,
    marginBottom: 25,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
  },
  subdivision: {
    fontSize: 14,
    color: '#888',
    marginTop: 25,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    height: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 8,
    color: '#333',
    marginRight: 10,
  },
  sampleText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helperText: {
    marginTop: 8,
    fontSize: 14,
    color: '#777',
  },
  proceedButton: {
    backgroundColor: '#1d154a',
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 320,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  proceedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PayConsumer;
