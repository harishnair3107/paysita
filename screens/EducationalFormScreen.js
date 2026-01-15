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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const COUNTRIES = [
  { key: "usa", label: "USA" },
  { key: "uk", label: "UK" },
  { key: "canada", label: "Canada" },
  { key: "australia", label: "Australia" },
  { key: "germany", label: "Germany" },
  { key: "singapore", label: "Singapore" },
];

const COURSES = [
  { key: "stem", label: "STEM" },
  { key: "business", label: "Business" },
  { key: "arts", label: "Arts" },
  { key: "medicine", label: "Medicine" },
  { key: "law", label: "Law" },
  { key: "design", label: "Design" },
];

const MODES = [
  { key: "online", label: "Online" },
  { key: "offline", label: "Offline" },
  { key: "hybrid", label: "Hybrid" },
];

export default function EducationalFormScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    highestQualification: "",
    countries: [],
    courses: [],
    budget: "",
    englishTest: "",
    passport: "no",
    counselingMode: "",
    notes: "",
  });

  const animX = useRef(new Animated.Value(0)).current;
  const animY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animX, {
          toValue: -1,
          duration: 6000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(animY, {
          toValue: 1,
          duration: 6000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(animX, {
          toValue: 1,
          duration: 6000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(animY, {
          toValue: -1,
          duration: 6000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateX = animX.interpolate({
    inputRange: [-1, 1],
    outputRange: [-SCREEN_WIDTH * 0.6, SCREEN_WIDTH * 0.6],
  });

  const translateY = animY.interpolate({
    inputRange: [-1, 1],
    outputRange: [-SCREEN_HEIGHT * 0.12, SCREEN_HEIGHT * 0.12],
  });

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleArray = (field, key) => {
    const arr = form[field];
    if (arr.includes(key))
      update(
        field,
        arr.filter((i) => i !== key)
      );
    else update(field, [...arr, key]);
  };

  const isFormValid = () =>
    form.name.trim() &&
    /\S+@\S+\.\S+/.test(form.email) &&
    /^[0-9]{10}$/.test(form.contact) &&
    form.highestQualification.trim() &&
    form.countries.length > 0 &&
    form.courses.length > 0 &&
    form.counselingMode;

  const handleSubmit = () => {
    if (!isFormValid()) {
      Alert.alert("Validation Error", "Please fill all the required fields.");
      return;
    }
    Alert.alert("Success", "We will contact you soon.");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Animated Orange Background */}
      <Animated.View
        style={[
          styles.animatedBackground,
          { transform: [{ translateX }, { translateY }] },
        ]}
      >
        <LinearGradient
          colors={["#FFB57A", "#FF8A3C", "#FF6A00"]}
          style={{ flex: 1 }}
        />
      </Animated.View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
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
              <View style={styles.headerIconBox}>
                <FontAwesome5 name="graduation-cap" size={30} color="#fff" />
              </View>

              <View style={{ paddingLeft: 12 }}>
                <Text style={styles.headerTitle}>
                  <Text style={{ fontWeight: "900" }}>Degree </Text>Services
                </Text>
                <Text style={styles.headerSub}>
                  Choose the right path — we help you grow 🎓
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* FORM CARD */}
          <View style={styles.formCard}>
            {/* FULL NAME */}
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputBox}>
              <Ionicons name="person-outline" size={20} color="#FF6A00" />
              <TextInput
                placeholder="Your Name"
                style={styles.textInput}
                value={form.name}
                onChangeText={(v) => update("name", v)}
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
                placeholder="you@example.com"
                style={styles.textInput}
                value={form.email}
                onChangeText={(v) => update("email", v)}
              />
            </View>

            {/* CONTACT */}
            <Text style={styles.label}>Contact</Text>
            <View style={styles.inputBox}>
              <Ionicons name="call-outline" size={20} color="#FF6A00" />
              <TextInput
                placeholder="10 digit number"
                keyboardType="numeric"
                maxLength={10}
                style={styles.textInput}
                value={form.contact}
                onChangeText={(v) =>
                  update("contact", v.replace(/[^0-9]/g, ""))
                }
              />
            </View>

            {/* QUALIFICATION */}
            <Text style={styles.label}>Highest Qualification</Text>
            <View style={styles.inputBox}>
              <MaterialCommunityIcons
                name="school-outline"
                size={20}
                color="#FF6A00"
              />
              <TextInput
                placeholder="Ex: B.E Mechanical"
                style={styles.textInput}
                value={form.highestQualification}
                onChangeText={(v) => update("highestQualification", v)}
              />
            </View>

            {/* INTERESTED COUNTRIES */}
            <Text style={styles.label}>Interested Countries</Text>
            <View style={styles.rowWrap}>
              {COUNTRIES.map((c) => {
                const selected = form.countries.includes(c.key);
                return (
                  <TouchableOpacity
                    key={c.key}
                    style={[
                      styles.chipOutlined,
                      selected && styles.chipOutlinedSelected,
                    ]}
                    onPress={() => toggleArray("countries", c.key)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.chipTextOutlined,
                        selected && styles.chipTextOutlinedSelected,
                      ]}
                    >
                      {c.label}
                    </Text>

                    {selected && (
                      <Ionicons
                        name="close-circle"
                        size={18}
                        color="#155724"
                        style={styles.chipClose}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* COURSES */}
            <Text style={styles.label}>Interested Courses</Text>
            <View style={styles.rowWrap}>
              {COURSES.map((c) => {
                const selected = form.courses.includes(c.key);
                return (
                  <TouchableOpacity
                    key={c.key}
                    style={[
                      styles.chipOutlined,
                      selected && styles.chipOutlinedSelected,
                    ]}
                    onPress={() => toggleArray("courses", c.key)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.chipTextOutlined,
                        selected && styles.chipTextOutlinedSelected,
                      ]}
                    >
                      {c.label}
                    </Text>

                    {selected && (
                      <Ionicons
                        name="close-circle"
                        size={18}
                        color="#155724"
                        style={styles.chipClose}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* BUDGET */}
            <Text style={styles.label}>Budget</Text>
            <View style={styles.inputBox}>
              <FontAwesome5 name="rupee-sign" size={18} color="#FF6A00" />
              <TextInput
                placeholder="Eg: 5-10 Lakhs"
                style={styles.textInput}
                value={form.budget}
                onChangeText={(v) => update("budget", v)}
              />
            </View>

            {/* ENGLISH TEST */}
            <Text style={styles.label}>English Test</Text>
            <View style={styles.inputBox}>
              <MaterialCommunityIcons
                name="message-text-outline"
                size={20}
                color="#FF6A00"
              />
              <TextInput
                placeholder="IELTS / PTE / None"
                style={styles.textInput}
                value={form.englishTest}
                onChangeText={(v) => update("englishTest", v)}
              />
            </View>

            {/* PASSPORT */}
            <Text style={styles.label}>Passport Available?</Text>
            <View style={styles.row}>
              {["yes", "no"].map((val) => {
                const sel = form.passport === val;
                return (
                  <TouchableOpacity
                    key={val}
                    onPress={() => update("passport", val)}
                    style={[styles.smallBtn, sel && styles.smallBtnSelected]}
                  >
                    <Text
                      style={[
                        styles.smallBtnText,
                        sel && styles.smallBtnTextSelected,
                      ]}
                    >
                      {val.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* COUNSELING MODE */}
            <Text style={styles.label}>Counseling Mode</Text>
            <View style={styles.rowWrap}>
              {MODES.map((m) => {
                const selected = form.counselingMode === m.key;
                return (
                  <TouchableOpacity
                    key={m.key}
                    style={[
                      styles.chipOutlined,
                      selected && styles.chipOutlinedSelected,
                    ]}
                    onPress={() => update("counselingMode", m.key)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.chipTextOutlined,
                        selected && styles.chipTextOutlinedSelected,
                      ]}
                    >
                      {m.label}
                    </Text>

                    {selected && (
                      <Ionicons
                        name="close-circle"
                        size={18}
                        color="#155724"
                        style={styles.chipClose}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* NOTES */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <MaterialCommunityIcons
                name="message-text-outline"
                size={22}
                color="#FF6A00"
              />
              <Text style={[styles.label, { marginLeft: 6 }]}>
                Additional Notes
              </Text>
            </View>

            <View
              style={[
                styles.inputBox,
                { height: 110, alignItems: "flex-start" },
              ]}
            >
              <TextInput
                placeholder="Any message (optional)"
                style={[styles.textInput, { height: "100%" }]}
                multiline
                value={form.notes}
                onChangeText={(v) => update("notes", v)}
              />
            </View>

            {/* BUTTONS */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !isFormValid() && { opacity: 0.5 },
                ]}
                onPress={handleSubmit}
              >
                <Text style={styles.submitText}>Request Counseling</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resetButton}
                onPress={() =>
                  setForm({
                    name: "",
                    email: "",
                    contact: "",
                    highestQualification: "",
                    countries: [],
                    courses: [],
                    budget: "",
                    englishTest: "",
                    passport: "no",
                    counselingMode: "",
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
    </View>
  );
}

/* ------------------------- STYLES ------------------------- */

const styles = StyleSheet.create({
  animatedBackground: {
    position: "absolute",
    width: SCREEN_WIDTH * 1.8,
    height: SCREEN_HEIGHT * 0.5,
    top: -100,
    left: -SCREEN_WIDTH * 0.4,
    borderRadius: 300,
    opacity: 0.95,
  },

  wrapper: { padding: 16, paddingTop: 30 },

  headerCard: {
    padding: 16,
    borderRadius: 20,
    elevation: 10,
    marginBottom: 20,
  },

  headerRow: { flexDirection: "row", alignItems: "center" },

  headerIconBox: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: { fontSize: 22, color: "#fff", fontWeight: "700" },

  headerSub: { color: "#F3E8FF", marginTop: 4 },

  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF6A00",
    marginTop: 12,
    marginBottom: 6,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  textInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    height: 45,
  },

  row: { flexDirection: "row", marginBottom: 10 },

  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  /* ----------- Outlined Chips with Light Green Selection ----------- */
 chipOutlined: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFF5EB",   // 🔶 VERY LIGHT ORANGE (Option 1)
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#FFC299",       // 🔶 soft peach-orange border
  marginBottom: 12,
  flexBasis: "48%",
  position: "relative",
  paddingRight: 40,
},

  chipOutlinedSelected: {
  backgroundColor: "#ECFDF5",   // 🟩 light green (selected)
  borderColor: "#BBF7D0",
},
 chipTextOutlined: {
  fontWeight: "700",
  color: "#000",                // black text (unselected)
},
  chipTextOutlinedSelected: {
    color: "#155724", // dark green text
  },

  chipClose: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -9 }],
  },

  /* Passport Buttons */
  smallBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D7C3FF",
    marginRight: 12,
  },

  smallBtnSelected: {
    backgroundColor: "#E9D5FF",
    borderColor: "#C4A5FF",
  },

  smallBtnText: {
    fontWeight: "700",
    color: "#333",
  },

  smallBtnTextSelected: {
    color: "#5B21B6",
  },

  /* Buttons */
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  submitButton: {
    flex: 0.65,
    backgroundColor: "#FF6A00",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  resetButton: {
    flex: 0.3,
    borderWidth: 2,
    borderColor: "#FF6A00",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  resetText: {
    color: "#FF6A00",
    fontWeight: "800",
  },
});
