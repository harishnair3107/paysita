import React, { useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { ThemeContext } from "../theme/Theme";

const CC_DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useContext(ThemeContext);

  const { provider } = route.params;

  const [cardDigits, setCardDigits] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState(provider?.network || "VISA");
  const [loading, setLoading] = useState(false);

  const remarks = "BILL PAYMENT";

  // Hide the default navigator header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const isFormValid =
    cardHolder.trim() &&
    payeeName.trim() &&
    cardDigits.length === 4 &&
    mobile.length === 10 &&
    parseFloat(amount) > 0;

  const handleConfirm = async () => {
    const refid = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const fullCardNumber = `XXXXXXXXXXXX${cardDigits}`;

    setLoading(true);

    const options = {
      method: "POST",
      url: "https://sit.paysprint.in/service-api/api/v1/service/cc-payment/ccpayment/generateotp",
      headers: {
        accept: "application/json",
        Token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDQxNzk3ODUsInBhcnRuZXJJZCI6IlBTMDAxOTg2IiwicmVxaWQiOiIxMjIzNTYifQ.kR-lBpUldQ22P4OtCwMu7T4stVT2EQ_pSbMoV9EYvYo",
        Authorisedkey: "MWM5YTI1NjRiMTk3OTA2NDQ1M2EwY2RjMjc4NjVjNzI=",
        "Content-Type": "application/json",
      },
      data: {
        refid,
        name: cardHolder,
        mobile,
        card_number: cardDigits,
        amount,
        remarks,
        network,
        payee_name: payeeName,
      },
    };

    try {
      const response = await axios.request(options);
      console.log("✅ OTP Sent:", response.data);
      setLoading(false);
      Alert.alert("Success", "OTP has been sent to your mobile number");
      navigation.navigate("changeupipins", {
        refid,
        name: cardHolder,
        payee_name: payeeName,
        mobile,
        card_number: fullCardNumber,
        amount,
        network,
        remarks,
        provider,
      });
    } catch (error) {
      setLoading(false);
      console.error("❌ API Error:", error);
      Alert.alert("Error", "Failed to generate OTP. Please try again.");
    }
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Credit Card Payment</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Provider Card */}
        <View style={styles.providerCard}>
          <View style={styles.providerIconWrapper}>
            <Ionicons name="card" size={28} color={colors.accent} />
          </View>
          <View style={styles.providerInfo}>
            <Text style={styles.providerLabel}>Payment to</Text>
            <Text style={styles.providerName}>{provider.name}</Text>
          </View>
        </View>

        {/* Form Container */}
        <View style={styles.formCard}>
          {/* Card Holder Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Holder Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color={colors.muted} />
              <TextInput
                style={styles.input}
                placeholder="Enter card holder name"
                placeholderTextColor={colors.muted}
                value={cardHolder}
                onChangeText={setCardHolder}
              />
            </View>
          </View>

          {/* Payee Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Payee Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-circle-outline" size={20} color={colors.muted} />
              <TextInput
                style={styles.input}
                placeholder="Enter payee name"
                placeholderTextColor={colors.muted}
                value={payeeName}
                onChangeText={setPayeeName}
              />
            </View>
          </View>

          {/* Last 4 Digits */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last 4 Digits of Card</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="card-outline" size={20} color={colors.muted} />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={4}
                placeholder="0000"
                placeholderTextColor={colors.muted}
                value={cardDigits}
                onChangeText={setCardDigits}
              />
            </View>
          </View>

          {/* Mobile Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color={colors.muted} />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={10}
                placeholder="Enter mobile number"
                placeholderTextColor={colors.muted}
                value={mobile}
                onChangeText={setMobile}
              />
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="person-add-outline" size={20} color={colors.accent} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Amount */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="cash-outline" size={20} color={colors.muted} />
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor={colors.muted}
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>

          {/* Network */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Network</Text>
            <View style={styles.pickerWrapper}>
              <Ionicons
                name="business-outline"
                size={20}
                color={colors.muted}
                style={styles.pickerIcon}
              />
              <Picker
                selectedValue={network}
                onValueChange={(itemValue) => setNetwork(itemValue)}
                style={styles.picker}
                dropdownIconColor={colors.text}
              >
                <Picker.Item label="VISA" value="VISA" />
                <Picker.Item label="MasterCard" value="MASTERCARD" />
                <Picker.Item label="RuPay" value="RUPAY" />
                <Picker.Item label="AMEX" value="AMEX" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={20} color={colors.accent} />
          <Text style={styles.infoText}>
            An OTP will be sent to your registered mobile number
          </Text>
        </View>

        {/* Spacer */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !isFormValid && styles.confirmButtonDisabled,
          ]}
          disabled={!isFormValid || loading}
          onPress={handleConfirm}
        >
          {loading ? (
            <>
              <Ionicons name="hourglass-outline" size={20} color="#FFFFFF" />
              <Text style={styles.confirmButtonText}>Processing...</Text>
            </>
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.confirmButtonText}>Confirm Payment</Text>
            </>
          )}
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
      paddingBottom: 20,
    },

    // Provider Card
    providerCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.option,
      padding: 16,
      borderRadius: 16,
      marginTop: 16,
      marginBottom: 20,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    providerIconWrapper: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: colors.accent + "15",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    providerInfo: {
      flex: 1,
    },
    providerLabel: {
      fontSize: 12,
      fontWeight: "500",
      color: colors.subtext,
      marginBottom: 3,
    },
    providerName: {
      fontSize: 17,
      fontWeight: "700",
      color: colors.text,
    },

    // Form Card
    formCard: {
      backgroundColor: colors.option,
      borderRadius: 16,
      padding: 18,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },

    // Input Group
    inputGroup: {
      marginBottom: 18,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 10,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
    },
    contactButton: {
      padding: 4,
    },
    currencySymbol: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },

    // Picker
    pickerWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 12,
      paddingLeft: 14,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    pickerIcon: {
      marginRight: 10,
    },
    picker: {
      flex: 1,
      color: colors.text,
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
      marginTop: 16,
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
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor: colors.background,
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
    confirmButton: {
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
    confirmButtonDisabled: {
      backgroundColor: colors.muted,
      opacity: 0.5,
    },
    confirmButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#FFFFFF",
      letterSpacing: 0.3,
    },
  });

export default CC_DetailsScreen;