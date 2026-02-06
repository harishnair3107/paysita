import React, { useContext, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../theme/Theme';
import { useRoute } from "@react-navigation/native";

const RealEstateFormScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);
  const styles= createStyles(colors);
  const route = useRoute();
  const { urls, type } = route.params ?? {};

  // Hide the default navigator header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleAction = (action) => {
  const link = urls?.[action];

  if (!link) {
    console.log("No link found for", action);
    return;
  }

  Linking.openURL(link);
};


  const actionButtons = [
    {
      id: 'buy',
      title: t('Buy', 'Buy'),
      icon: 'home',
      color: colors.accent,
      bgColor: colors.accent + '15',
      description: 'Find your dream property',
    },
    {
      id: 'sell',
      title: t('Sell', 'Sell'),
      icon: 'pricetag',
      color: colors.success,
      bgColor: colors.successBg,
      description: 'List your property for sale',
    },
    {
      id: 'rent',
      title: t('Rent', 'Rent'),
      icon: 'key',
      color: colors.warning,
      bgColor: colors.warningBg,
      description: 'Rent or lease a property',
    },
  ];

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
        <Text style={styles.headerTitle}>Real Estate</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIconWrapper}>
            <Ionicons name="business" size={48} color={colors.accent} />
          </View>
          <Text style={styles.heroTitle}>What would you like to do?</Text>
          <Text style={styles.heroSubtitle}>
            Choose an option to get started with your {type?? "property"} needs
          </Text>
        </View>

        {/* Action Cards */}
        <View style={styles.actionsContainer}>
          {actionButtons.map((action, index) => (
            <TouchableOpacity
              key={action.id}
              style={[
                styles.actionCard,
                { backgroundColor: colors.option },
                index < actionButtons.length - 1 && styles.actionCardMargin,
              ]}
              onPress={() => handleAction(action.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconWrapper, { backgroundColor: action.bgColor }]}>
                <Ionicons name={action.icon} size={32} color={action.color} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Section */}
        <View style={[styles.infoCard, { backgroundColor: colors.option }]}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={22} color={colors.accent} />
            <Text style={styles.infoTitle}>Why Choose Us?</Text>
          </View>
          <View style={styles.infoContent}>
            <InfoItem
              icon="checkmark-circle"
              text="Verified property listings"
              colors={colors}
              styles={styles}
            />
            <InfoItem
              icon="checkmark-circle"
              text="Expert guidance and support"
              colors={colors}
               styles={styles}
            />
            <InfoItem
              icon="checkmark-circle"
              text="Best deals in the market"
              colors={colors}
              styles={styles}
            />
            <InfoItem
              icon="checkmark-circle"
              text="Quick and hassle-free process"
              colors={colors}
              styles={styles}
            />
          </View>
        </View>

        {/* Terms */}
        <Text style={styles.termsText}>
          {t('termsOfUse', 'By using this service, you agree to our terms and conditions')}
        </Text>

        {/* Spacer */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({ icon, text, colors, styles }) => (
  <View style={styles.infoItem}>
    <Ionicons name={icon} size={18} color={colors.success} />
    <Text style={[styles.infoItemText, { color: colors.text }]}>
      {text}
    </Text>
  </View>
);


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
    scrollContent: {
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 20,
    },

    // Hero Section
    heroSection: {
      alignItems: 'center',
      paddingVertical: 30,
      paddingHorizontal: 20,
    },
    heroIconWrapper: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: colors.accent + '15',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    heroTitle: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
      letterSpacing: 0.2,
    },
    heroSubtitle: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.subtext,
      textAlign: 'center',
      lineHeight: 20,
      paddingHorizontal: 20,
    },

    // Action Cards
    actionsContainer: {
      marginTop: 10,
    },
    actionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 18,
      borderRadius: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    actionCardMargin: {
      marginBottom: 14,
    },
    actionIconWrapper: {
      width: 64,
      height: 64,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    actionContent: {
      flex: 1,
    },
    actionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    actionDescription: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.subtext,
      lineHeight: 18,
    },

    // Info Card
    infoCard: {
      marginTop: 24,
      padding: 18,
      borderRadius: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    infoHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14,
    },
    infoTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
    },
    infoContent: {
      gap: 10,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    infoItemText: {
      fontSize: 14,
      fontWeight: '500',
      flex: 1,
    },

    // Terms
    termsText: {
      fontSize: 12,
      fontWeight: '400',
      color: colors.muted,
      textAlign: 'center',
      marginTop: 20,
      lineHeight: 18,
      paddingHorizontal: 20,
    },
  });

export default RealEstateFormScreen;