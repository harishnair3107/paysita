import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../theme/Theme";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useContext(ThemeContext);

  const { name, amount } = route.params || {};

  const [scaleValue] = useState(new Animated.Value(0));
  const [fadeValue] = useState(new Animated.Value(0));
  const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

  // Hide the default navigator header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    // Animate success icon
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Fade in content
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDone = () => {
    navigation.navigate("scan");
  };

  const handleShare = () => {
    // Implement share receipt functionality
    console.log("Share receipt");
  };

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.navigate("scan")}
        >
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Success Animation */}
        <Animated.View
          style={[
            styles.successIconWrapper,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <View style={styles.successIconCircle}>
            <Ionicons name="checkmark" size={80} color="#FFFFFF" />
          </View>
        </Animated.View>

        {/* Success Message */}
        <Animated.View style={{ opacity: fadeValue, alignItems: "center" }}>
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successSubtitle}>
            Your transaction has been completed
          </Text>
        </Animated.View>

        {/* Amount Card */}
        <Animated.View
          style={[styles.amountCard, { opacity: fadeValue }]}
        >
          <Text style={styles.amountLabel}>Amount Paid</Text>
          <Text style={styles.amountValue}>₹{amount || "0.00"}</Text>
        </Animated.View>

        {/* Transaction Details Card */}
        <Animated.View
          style={[styles.detailsCard, { opacity: fadeValue }]}
        >
          <View style={styles.detailsHeader}>
            <Ionicons name="receipt" size={22} color={colors.accent} />
            <Text style={styles.detailsTitle}>Transaction Details</Text>
          </View>

          <View style={styles.detailsContent}>
            <DetailRow
              icon="person"
              label="Paid to"
              value={name || "Receiver"}
              colors={colors}
              styles={styles}
            />
            <DetailRow
              icon="key"
              label="Transaction ID"
              value={transactionId}
              colors={colors}
              styles={styles}
            />
            <DetailRow
              icon="time"
              label="Date & Time"
              value={new Date().toLocaleString()}
              colors={colors}
              styles={styles}
            />
            <DetailRow
              icon="checkmark-circle"
              label="Status"
              value="Completed"
              colors={colors}
              styles={styles}
              valueColor={colors.success}
            />
          </View>
        </Animated.View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="shield-checkmark" size={20} color={colors.success} />
          <Text style={styles.infoText}>
            Your payment is secure and has been processed successfully
          </Text>
        </View>

        {/* Spacer */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleShare}
        >
          <Ionicons name="share-social" size={20} color={colors.accent} />
          <Text style={styles.secondaryButtonText}>Share Receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleDone}>
          <Text style={styles.primaryButtonText}>Done</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const DetailRow = ({ icon, label, value, colors, valueColor,styles }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailLeft}>
      <Ionicons name={icon} size={18} color={colors.muted} />
      <Text style={[styles.detailLabel, { color: colors.subtext }]}>
        {label}
      </Text>
    </View>
    <Text
      style={[
        styles.detailValue,
        { color: valueColor || colors.text },
      ]}
      numberOfLines={1}
    >
      {value}
    </Text>
  </View>
);

export default PaymentScreen;

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    // Header
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: "flex-end",
    },
    closeButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.option,
      justifyContent: "center",
      alignItems: "center",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },

    // Content
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 20,
      alignItems: "center",
    },

    // Success Icon
    successIconWrapper: {
      marginBottom: 32,
    },
    successIconCircle: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: colors.success,
      justifyContent: "center",
      alignItems: "center",
      elevation: 8,
      shadowColor: colors.success,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
    },

    // Success Text
    successTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 8,
      letterSpacing: 0.3,
    },
    successSubtitle: {
      fontSize: 15,
      fontWeight: "500",
      color: colors.subtext,
      textAlign: "center",
      marginBottom: 32,
    },

    // Amount Card
    amountCard: {
      width: "100%",
      backgroundColor: colors.successBg,
      borderRadius: 20,
      padding: 24,
      alignItems: "center",
      marginBottom: 24,
      borderWidth: 1.5,
      borderColor: colors.success + "40",
    },
    amountLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.success,
      marginBottom: 8,
      letterSpacing: 0.5,
      textTransform: "uppercase",
    },
    amountValue: {
      fontSize: 48,
      fontWeight: "800",
      color: colors.success,
      letterSpacing: -1,
    },

    // Details Card
    detailsCard: {
      width: "100%",
      backgroundColor: colors.option,
      borderRadius: 16,
      marginBottom: 20,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    detailsHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    },
    detailsTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: colors.text,
    },
    detailsContent: {
      paddingHorizontal: 18,
      paddingVertical: 14,
    },

    // Detail Row
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    detailLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      flex: 1,
    },
    detailLabel: {
      fontSize: 14,
      fontWeight: "500",
    },
    detailValue: {
      fontSize: 14,
      fontWeight: "600",
      textAlign: "right",
      flex: 1,
    },

    // Info Banner
    infoBanner: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.successBg,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.success + "30",
    },
    infoText: {
      flex: 1,
      fontSize: 13,
      fontWeight: "500",
      color: colors.text,
      lineHeight: 18,
    },

    // Footer
    footer: {
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 20,
      paddingVertical: 14,
      backgroundColor: colors.background,
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
    secondaryButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.option,
      paddingVertical: 16,
      borderRadius: 16,
      gap: 8,
      borderWidth: 1.5,
      borderColor: colors.accent,
    },
    secondaryButtonText: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.accent,
    },
    primaryButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.button,
      paddingVertical: 16,
      borderRadius: 16,
      gap: 8,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    primaryButtonText: {
      fontSize: 15,
      fontWeight: "700",
      color: "#FFFFFF",
      letterSpacing: 0.3,
    },
  });