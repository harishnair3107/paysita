import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import kindnessImg from "../assets/itr 2.png";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PAYMENT_METHODS = [
  {
    key: "upi",
    label: "UPI",
    icon: { lib: Ionicons, name: "qr-code-outline" },
  },
  {
    key: "net_banking",
    label: "NetBank",
    icon: { lib: MaterialCommunityIcons, name: "bank-outline" },
  },
  {
    key: "credit_card",
    label: "Credit",
    icon: { lib: MaterialCommunityIcons, name: "credit-card-outline" },
  },
];

const DEDUCTION_CHIPS = [
  { key: "section80c", label: "80C" },
  { key: "health_ins", label: "80D (Health)" },
  { key: "home_loan_interest", label: "Home Loan" },
  { key: "education_loan", label: "Education Loan" },
  { key: "charity", label: "Charity" },
  { key: "other", label: "Other" },
];

const TAX_YEARS = [
  "2025-26",
  "2024-25",
  "2023-24",
  "2022-23",
  "2021-22",
  "2020-21",
];

const Chip = ({
  label,
  selected,
  onPress,
  onRemove,
  showClose = true,
  icon = null,
  style,
}) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
    style={[styles.chip, selected && styles.chipSelected, style]}
  >
    {icon}
    <Text
      style={[styles.chipText, selected && styles.chipTextSelected]}
      numberOfLines={1}
    >
      {label}
    </Text>

    {selected && showClose && (
      <TouchableOpacity onPress={onRemove} style={styles.chipClose}>
        <Ionicons name="close-circle" size={16} color="#FF6A00" />
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

export default function ITRFormScreen() {
  const [form, setForm] = useState({
    name: "",
    pan: "",
    aadhar: "",
    email: "",
    income: "",
    taxYear: "2024-25",
    itrType: "ITR-1",
    paymentMethod: "",
    deductions: [],
    deductionOther: "",
    notes: "",
  });

  const [yearModalVisible, setYearModalVisible] = useState(false);

  const anim = useRef(new Animated.Value(0)).current;
  const p1 = useRef(new Animated.Value(0)).current;
  const p2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const loopP = (a, d, delay = 0) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(a, {
            toValue: 1,
            duration: d,
            useNativeDriver: true,
          }),
          Animated.timing(a, {
            toValue: 0,
            duration: d,
            useNativeDriver: true,
          }),
        ])
      ).start();

    loopP(p1, 9000, 0);
    loopP(p2, 12000, 2500);
  }, []);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH * 0.9, SCREEN_WIDTH * 0.9],
  });

  const particleStyle = (a, sx, sy, s) => ({
    transform: [
      {
        translateX: a.interpolate({
          inputRange: [0, 1],
          outputRange: [sx, sx + 30],
        }),
      },
      {
        translateY: a.interpolate({
          inputRange: [0, 1],
          outputRange: [sy, sy - 20],
        }),
      },
      {
        scale: a.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [s, s * 1.04, s],
        }),
      },
    ],
    opacity: a.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.18, 0.85, 0.18],
    }),
  });

  const update = (field, val) => setForm((s) => ({ ...s, [field]: val }));

  const togglePayment = (key) =>
    update("paymentMethod", form.paymentMethod === key ? "" : key);

  const toggleDeduction = (key) => {
    const exists = form.deductions.includes(key);
    if (exists) {
      update(
        "deductions",
        form.deductions.filter((d) => d !== key)
      );
      if (key === "other") update("deductionOther", "");
    } else {
      update("deductions", [...form.deductions, key]);
    }
  };

  const validate = () => {
    const panOk = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(form.pan.trim());
    const aadharOk = /^\d{12}$/.test(form.aadhar.trim());
    const emailOk = /\S+@\S+\.\S+/.test(form.email.trim());
    const incomeOk = form.income.trim() !== "";
    const dedOk =
      form.deductions.length > 0 || form.deductionOther.trim() !== "";

    return (
      form.name.trim() &&
      panOk &&
      aadharOk &&
      emailOk &&
      incomeOk &&
      dedOk &&
      form.paymentMethod
    );
  };

  const submit = () => {
    if (!validate())
      return Alert.alert("Validation", "Please fill all fields correctly.");
    Alert.alert("Submitted", "ITR form submitted successfully.");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Animated Background */}
      <Animated.View
        style={[
          styles.animatedGradientContainer,
          { transform: [{ translateX }] },
        ]}
      >
        <LinearGradient
          colors={["#FFB57A", "#FF8A3C", "#FF6A00"]}
          style={styles.animatedGradient}
        />
      </Animated.View>

      <Animated.View
        style={[styles.particle, particleStyle(p1, -40, 60, 1.05)]}
      />
      <Animated.View
        style={[
          styles.particle,
          particleStyle(p2, SCREEN_WIDTH * 0.6, 10, 1.15),
        ]}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.wrapper}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <LinearGradient
            colors={["#6D28D9", "#7C3AED", "#A78BFA"]}
            style={styles.headerCard}
          >
            <View style={styles.headerRow}>
              <Image source={kindnessImg} style={styles.headerImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>
                  <Text style={{ fontWeight: "900", fontSize: 22 }}>
                    ITR Filing
                  </Text>{" "}
                  — Taxation Form
                </Text>
                <Text style={styles.headerSub}>
                  Submit your income tax details
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* FORM */}
          <View style={styles.formCard}>
            {/* NAME */}
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputBox}>
              <Ionicons name="person-outline" size={20} color="#FF6A00" />
              <TextInput
                style={styles.textInput}
                placeholder="Enter full name"
                value={form.name}
                onChangeText={(v) => update("name", v)}
              />
            </View>

            {/* PAN */}
            <Text style={styles.label}>PAN</Text>
            <View style={styles.inputBox}>
              <MaterialCommunityIcons
                name="card-text-outline"
                size={20}
                color="#FF6A00"
              />
              <TextInput
                style={styles.textInput}
                placeholder="ABCDE1234F"
                value={form.pan}
                onChangeText={(v) => update("pan", v.toUpperCase())}
              />
            </View>

            {/* AADHAR */}
            <Text style={styles.label}>Aadhar</Text>
            <View style={styles.inputBox}>
              <MaterialCommunityIcons
                name="fingerprint"
                size={20}
                color="#FF6A00"
              />
              <TextInput
                style={styles.textInput}
                placeholder="12 digit Aadhar"
                keyboardType="numeric"
                maxLength={12}
                value={form.aadhar}
                onChangeText={(v) => update("aadhar", v.replace(/[^0-9]/g, ""))}
              />
            </View>

            {/* EMAIL */}
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputBox}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#FF6A00"
              />
              <TextInput
                style={styles.textInput}
                placeholder="you@example.com"
                value={form.email}
                onChangeText={(v) => update("email", v)}
              />
            </View>

            {/* INCOME */}
            <Text style={styles.label}>Taxable Income</Text>
            <View style={styles.inputBox}>
              <FontAwesome5 name="rupee-sign" size={18} color="#FF6A00" />
              <TextInput
                style={styles.textInput}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={form.income}
                onChangeText={(v) => update("income", v.replace(/[^0-9]/g, ""))}
              />
            </View>

            {/* TAX YEAR */}
            <Text style={styles.label}>Tax Year</Text>
            <TouchableOpacity
              onPress={() => setYearModalVisible(true)}
              style={styles.yearBox}
            >
              <MaterialCommunityIcons
                name="calendar-range"
                size={22}
                color="#FF6A00"
              />
              <Text style={styles.yearText}>{form.taxYear}</Text>
            </TouchableOpacity>

            {/* ITR TYPE */}
            <Text style={styles.label}>ITR Type</Text>
            <View style={styles.typeRow}>
              {["ITR-1", "ITR-2", "ITR-3", "ITR-4"].map((t) => {
                const sel = form.itrType === t;
                return (
                  <TouchableOpacity
                    key={t}
                    onPress={() => update("itrType", t)}
                    style={[styles.itrBtn, sel && styles.itrBtnSelected]}
                  >
                    <Text
                      style={[styles.itrText, sel && styles.itrTextSelected]}
                    >
                      {t}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* PAYMENT */}
            <Text style={styles.label}>Payment Method</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 6 }}
            >
              {PAYMENT_METHODS.map((m) => {
                const selected = form.paymentMethod === m.key;
                return (
                  <Chip
                    key={m.key}
                    label={m.label}
                    selected={selected}
                    onPress={() => togglePayment(m.key)}
                    icon={
                      <m.icon.lib
                        name={m.icon.name}
                        size={16}
                        color={selected ? "#155724" : "#FF6A00"}
                        style={{ marginRight: 8 }}
                      />
                    }
                    showClose={false}
                    style={{ marginRight: 10 }}
                  />
                );
              })}
            </ScrollView>

            {/* DEDUCTIONS */}
            <Text style={styles.label}>Deductions</Text>
            <View style={styles.typeWrap}>
              {DEDUCTION_CHIPS.map((d) => {
                const sel = form.deductions.includes(d.key);
                return (
                  <Chip
                    key={d.key}
                    label={d.label}
                    selected={sel}
                    onPress={() => toggleDeduction(d.key)}
                    onRemove={() => toggleDeduction(d.key)}
                    style={{ flexBasis: "48%", marginBottom: 12 }}
                  />
                );
              })}
            </View>

            {/* OTHER DEDUCTION */}
            {form.deductions.includes("other") && (
              <>
                <Text style={[styles.label, { marginTop: 10 }]}>
                  Specify Deduction
                </Text>
                <View style={styles.inputBox}>
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={20}
                    color="#FF6A00"
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Describe deduction"
                    value={form.deductionOther}
                    onChangeText={(v) => update("deductionOther", v)}
                  />
                </View>
              </>
            )}

            {/* NOTES */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <MaterialCommunityIcons
                name="message-text-outline"
                size={22}
                color="#FF6A00"
              />
              <Text style={[styles.label, { marginLeft: 6, marginTop: 0 }]}>
                Notes
              </Text>
            </View>

            <View
              style={[
                styles.inputBox,
                { height: 110, alignItems: "flex-start" },
              ]}
            >
              <TextInput
                placeholder="Optional notes..."
                multiline
                style={[styles.textInput, { height: "100%" }]}
                value={form.notes}
                onChangeText={(v) => update("notes", v)}
              />
            </View>

            {/* BUTTONS */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.submitButton, !validate() && { opacity: 0.6 }]}
                onPress={submit}
              >
                <Text style={styles.submitText}>Submit ITR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resetButton}
                onPress={() =>
                  setForm({
                    name: "",
                    pan: "",
                    aadhar: "",
                    email: "",
                    income: "",
                    taxYear: "2024-25",
                    itrType: "ITR-1",
                    paymentMethod: "",
                    deductions: [],
                    deductionOther: "",
                    notes: "",
                  })
                }
              >
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* TAX YEAR MODAL */}
      {yearModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Tax Year</Text>

            {TAX_YEARS.map((yr) => (
              <TouchableOpacity
                key={yr}
                style={[
                  styles.yearOption,
                  form.taxYear === yr && styles.yearOptionSelected,
                ]}
                onPress={() => {
                  update("taxYear", yr);
                  setYearModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.yearOptionText,
                    form.taxYear === yr && styles.yearOptionTextSelected,
                  ]}
                >
                  {yr}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setYearModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

/* ------------------------ STYLES ------------------------ */

const styles = StyleSheet.create({
  animatedGradientContainer: {
    position: "absolute",
    width: SCREEN_WIDTH * 2.2,
    height: 520,
    top: -120,
    left: -SCREEN_WIDTH * 0.6,
    borderRadius: 260,
    overflow: "hidden",
    opacity: 0.98,
  },
  animatedGradient: { flex: 1 },

  particle: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 80,
    backgroundColor: "rgba(255,170,90,0.18)",
  },

  wrapper: { padding: 16, paddingTop: 30 },

  headerCard: {
    padding: 16,
    borderRadius: 18,
    elevation: 10,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerImage: {
    width: 70,
    height: 70,
    marginRight: 12,
    borderRadius: 12,
  },

  headerTitle: { color: "#FFF7FF", fontSize: 20, fontWeight: "800" },
  headerSub: { color: "#E9D5FF", marginTop: 6, fontSize: 14 },

  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 10,
    marginTop: 10,
  },

  label: {
    fontWeight: "700",
    marginLeft: 4,
    marginBottom: 6,
    marginTop: 10,
    color: "#FF6A00",
  },

  inputBox: {
  flexDirection: 'row',
  backgroundColor: '#FFF3E6',
  alignItems: 'center',
  paddingHorizontal: 12,
  paddingVertical: 6,   // reduced (was 12–14)
  borderRadius: 10,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: '#FFE4D6',
},


  textInput: {
  flex: 1,
  marginLeft: 8,
  height: 38,     // reduced (was 45)
},


  /* Updated Tax Year Box */
yearBox: {
  flexDirection: 'row',
  backgroundColor: '#FFF3E6',
  alignItems: 'center',
  paddingHorizontal: 12,
  paddingVertical: 8,   // reduced
  borderRadius: 10,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: '#FFE4D6',
},

yearText: {
  marginLeft: 10,
  fontSize: 15,
  fontWeight: '600',
  color: '#444',
},


  typeRow: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 8,
  },

  itrBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5D4FF",
    marginRight: 10,
  },
  itrBtnSelected: {
    backgroundColor: "#F3E8FF",
    borderColor: "#C4B5FD",
  },
  itrText: { fontWeight: "700", color: "#333" },
  itrTextSelected: { color: "#5B21B6" },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9F5",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFE4D6",
    paddingRight: 36,
  },
  chipSelected: {
    backgroundColor: "#ECFDF5",
    borderColor: "#BBF7D0",
  },
  chipText: { fontWeight: "700", color: "#333", fontSize: 13 },
  chipTextSelected: { color: "#155724" },

  chipClose: {
    position: "absolute",
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },

  typeWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  submitButton: {
    flex: 0.68,
    backgroundColor: "#FF6A00",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  resetButton: {
    flex: 0.28,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FF6A00",
    alignItems: "center",
  },

  resetText: {
    color: "#FF6A00",
    fontWeight: "800",
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 10,
    borderWidth: 2,
    borderColor: "#FF6A00",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 14,
    color: "#FF6A00",
  },

  yearOption: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFE4D6",
    marginVertical: 6,
    backgroundColor: "#FFF9F5",
  },

  yearOptionSelected: {
    backgroundColor: "#ECFDF5",
    borderColor: "#BBF7D0",
  },

  yearOptionText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#444",
    textAlign: "center",
  },

  yearOptionTextSelected: {
    color: "#155724",
  },

  closeModalBtn: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#FF6A00",
  },

  closeModalText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
  },
});
