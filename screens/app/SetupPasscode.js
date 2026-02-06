import React, { useRef, useState, useContext, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../theme/Theme';

const SetupPasscode = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);

  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputs = useRef([]);

  // Hide the default navigator header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      setTimeout(() => navigation.navigate('SetNewPasscode'), 300);
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
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
        <Text style={styles.headerTitle}>Setup Passcode</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconWrapper}>
          <Ionicons name="lock-closed" size={64} color={colors.accent} />
        </View>

        {/* Title & Subtitle */}
        <Text style={styles.title}>{t('enter_otp_message', 'Enter OTP')}</Text>
        <Text style={styles.subtitle}>
          Please enter the 5-digit code sent to your mobile
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              style={[
                styles.otpBox,
                otp[index] && styles.otpBoxFilled,
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={otp[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
              autoFocus={index === 0}
              placeholderTextColor={colors.muted}
            />
          ))}
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={20} color={colors.accent} />
          <Text style={styles.infoText}>
            Code auto-submits when all digits are entered
          </Text>
        </View>

        {/* Resend OTP */}
        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendText}>Didn't receive code? </Text>
          <Text style={styles.resendLink}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
      paddingTop: 40,
      alignItems: 'center',
    },

    // Icon
    iconWrapper: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.accent + '15',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 32,
    },

    // Title & Subtitle
    title: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
      letterSpacing: 0.2,
    },
    subtitle: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.subtext,
      textAlign: 'center',
      marginBottom: 40,
      lineHeight: 20,
      paddingHorizontal: 20,
    },

    // OTP Container
    otpContainer: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
    },
    otpBox: {
      width: 56,
      height: 64,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 12,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      backgroundColor: colors.option,
    },
    otpBoxFilled: {
      borderColor: colors.accent,
      borderWidth: 2.5,
    },

    // Info Banner
    infoBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: colors.accent + '10',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.accent + '30',
    },
    infoText: {
      flex: 1,
      fontSize: 13,
      fontWeight: '500',
      color: colors.text,
      lineHeight: 18,
    },

    // Resend
    resendButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    resendText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.subtext,
    },
    resendLink: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.accent,
    },
  });

export default SetupPasscode;