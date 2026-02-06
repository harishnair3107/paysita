import React, { useContext, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../theme/Theme";

const DthSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useContext(ThemeContext);

  const { successdata, selectedPlan, name, subscriberId } = route.params;

  // Hide the default navigator header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

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
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Success</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Success Icon */}
        <View style={styles.successIconWrapper}>
          <View style={styles.successIconCircle}>
            <Ionicons name="checkmark" size={64} color={colors.success} />
          </View>
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Recharge Successful!</Text>
        <Text style={styles.subtitle}>
          Your DTH recharge has been completed successfully
        </Text>

        {/* Transaction Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="document-text" size={22} color={colors.accent} />
            <Text style={styles.cardTitle}>Transaction Details</Text>
          </View>

          <View style={styles.detailsContent}>
            <DetailRow
              icon="business"
              label="DTH Provider"
              value={name}
              colors={colors}
            />
            <DetailRow
              icon="card"
              label="Subscriber ID"
              value={subscriberId}
              colors={colors}
            />
            <DetailRow
              icon="cash"
              label="Amount"
              value={`₹${selectedPlan?.amount}`}
              colors={colors}
              highlight
            />
            <DetailRow
              icon="list"
              label="Plan"
              value={selectedPlan?.name}
              colors={colors}
            />
            <DetailRow
              icon="key"
              label="Reference ID"
              value={successdata?.refid}
              colors={colors}
            />
            <DetailRow
              icon="checkmark-circle"
              label="Status"
              value={successdata?.message || "Success"}
              colors={colors}
              statusSuccess
            />
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={20} color={colors.accent} />
          <Text style={styles.infoText}>
            Your recharge will be activated within a few minutes
          </Text>
        </View>

        {/* Spacer */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Dthrecharge")}
        >
          <Ionicons name="refresh" size={20} color={colors.accent} />
          <Text style={styles.secondaryButtonText}>Recharge Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.primaryButtonText}>Done</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const DetailRow = ({ icon, label, value, colors, highlight, statusSuccess }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailLeft}>
      <Ionicons
        name={icon}
        size={18}
        color={statusSuccess ? colors.success : colors.muted}
      />
      <Text style={[styles.detailLabel, { color: colors.subtext }]}>
        {label}
      </Text>
    </View>
    <Text
      style={[
        styles.detailValue,
        { color: colors.text },
        highlight && styles.detailValueHighlight,
        statusSuccess && { color: colors.success, fontWeight: "700" },
      ]}
    >
      {value}
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
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
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

    // Success Icon
    successIconWrapper: {
      alignItems: "center",
      marginBottom: 24,
    },
    successIconCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.successBg,
      justifyContent: "center",
      alignItems: "center",
      elevation: 4,
      shadowColor: colors.success,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },

    // Title
    title: {
      fontSize: 24,
      fontWeight: "800",
      color: colors.text,
      textAlign: "center",
      marginBottom: 8,
      letterSpacing: 0.2,
    },
    subtitle: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.subtext,
      textAlign: "center",
      marginBottom: 28,
      paddingHorizontal: 20,
      lineHeight: 20,
    },

    // Details Card
    detailsCard: {
      backgroundColor: colors.option,
      borderRadius: 16,
      marginBottom: 16,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    },
    cardTitle: {
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
    detailValueHighlight: {
      fontSize: 18,
      fontWeight: "800",
      color: colors.success,
    },

    // Info Banner
    infoBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.accent + "10",
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.accent + "30",
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
      paddingHorizontal: 16,
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

export default DthSuccessScreen;