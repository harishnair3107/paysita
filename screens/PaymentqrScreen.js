import React, { useState, useContext, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../theme/Theme';

export default function PaymentqrScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useContext(ThemeContext);

  const { scannedData } = route.params || {};
  const [amount, setAmount] = useState('');

  // Hide the default navigator header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handlePay = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    // Handle UPI Payment API here (Paysprint or other API)
    Alert.alert(
      'Confirm Payment',
      `Pay ₹${amount} to ${scannedData || 'Receiver'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay',
          onPress: () => {
            // Navigate to success page after payment
           navigation.navigate("PaymentScreen")
            // navigation.navigate('PaymentSuccess', { amount, receiver: scannedData });
          },
        },
      ]
    );
  };

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>QR Payment</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Receiver Info */}
        <View style={styles.receiverCard}>
          <View style={styles.receiverIconWrapper}>
            <Image
              source={require('../assets/drawer/JohnDoe.png')}
              style={styles.userIcon}
            />
          </View>
          <Text style={styles.receiverLabel}>Paying to</Text>
          <Text style={styles.receiverName}>{scannedData || 'Receiver Name'}</Text>
        </View>

        {/* Amount Section */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Enter Amount</Text>
          <View style={styles.amountInputWrapper}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={colors.muted}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        {/* Quick Amount Buttons */}
        <View style={styles.quickAmountSection}>
          <Text style={styles.quickAmountLabel}>Quick Amount</Text>
          <View style={styles.quickAmountGrid}>
            {['100', '500', '1000', '2000'].map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.quickAmountButton}
                onPress={() => setAmount(value)}
              >
                <Text style={styles.quickAmountText}>₹{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="shield-checkmark" size={20} color={colors.success} />
          <Text style={styles.infoText}>
            Secure payment via UPI
          </Text>
        </View>
      </View>

      {/* Pay Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.payButton,
            (!amount || parseFloat(amount) <= 0) && styles.payButtonDisabled,
          ]}
          onPress={handlePay}
          disabled={!amount || parseFloat(amount) <= 0}
        >
          <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
          <Text style={styles.payButtonText}>
            {amount ? `Pay ₹${amount}` : 'Enter Amount'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    // Header
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
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
      color: colors.text,
      letterSpacing: 0.3,
    },
    headerSpacer: {
      width: 40,
    },

    // Content
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 30,
    },

    // Receiver Card
    receiverCard: {
      backgroundColor: colors.option,
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
      marginBottom: 32,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    receiverIconWrapper: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    userIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    receiverLabel: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.subtext,
      marginBottom: 6,
    },
    receiverName: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
    },

    // Amount Section
    amountSection: {
      marginBottom: 28,
    },
    amountLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.subtext,
      marginBottom: 12,
      textAlign: 'center',
    },
    amountInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 2,
      borderBottomColor: colors.accent,
      paddingBottom: 8,
    },
    currencySymbol: {
      fontSize: 48,
      fontWeight: '700',
      color: colors.text,
      marginRight: 8,
    },
    amountInput: {
      fontSize: 48,
      fontWeight: '700',
      color: colors.text,
      minWidth: 120,
      textAlign: 'left',
    },

    // Quick Amount
    quickAmountSection: {
      marginBottom: 24,
    },
    quickAmountLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.subtext,
      marginBottom: 12,
    },
    quickAmountGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    quickAmountButton: {
      width: '47%',
      backgroundColor: colors.option,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    quickAmountText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },

    // Info Banner
    infoBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: colors.successBg,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.success + '30',
    },
    infoText: {
      flex: 1,
      fontSize: 13,
      fontWeight: '500',
      color: colors.text,
      lineHeight: 18,
    },

    // Footer
    footer: {
      paddingHorizontal: 20,
      paddingVertical: 14,
      backgroundColor: colors.background,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
    payButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.button,
      paddingVertical: 16,
      borderRadius: 16,
      gap: 8,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    payButtonDisabled: {
      backgroundColor: colors.muted,
      opacity: 0.5,
    },
    payButtonText: {
      fontSize: 17,
      fontWeight: '700',
      color: '#FFFFFF',
      letterSpacing: 0.3,
    },
  });