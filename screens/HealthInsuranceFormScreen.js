import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  PanResponder,
  Animated,
} from "react-native";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";

const HealthInsuranceFormScreen = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    age: "",
    coverAmount: "",
    diseases: "",
    medicalHistory: "",
    badHabits: "",
    familyCount: "",
  });

  const [hasDisease, setHasDisease] = useState(false);
  const [isSmoker, setIsSmoker] = useState(false);
  const [isAlcoholic, setIsAlcoholic] = useState(false);
  const [usesTobacco, setUsesTobacco] = useState(false);
  const [familyCount, setFamilyCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCelebrationVisible, setIsCelebrationVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [medicalHistoryInput, setMedicalHistoryInput] = useState("");
  const [value, setValue] = useState(25);
  const [value1, setValue1] = useState(1000000);
  const [inputValue, setInputValue] = useState("10.00");
  const animatedValue = new Animated.Value(value);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      age: value.toString(),
      coverAmount: value1.toString(),
      diseases: hasDisease ? "Yes" : "No",
      badHabits: `${isSmoker ? "Smoker, " : ""}${isAlcoholic ? "Alcoholic, " : ""}${usesTobacco ? "Tobacco User" : ""}`.trim().replace(/,$/, ""),
      familyCount: familyCount.toString(),
      medicalHistory: tags.join(", "),
    }));
  }, [hasDisease, isSmoker, isAlcoholic, usesTobacco, familyCount, value, value1, tags]);

  useEffect(() => {
    const filledFields = Object.values(form).filter((value) =>
      Array.isArray(value) ? value.length > 0 : value.trim() !== ""
    ).length;
    const totalFields = Object.keys(form).length;
    const newProgress = Math.round((filledFields / totalFields) * 100);
    if (newProgress !== progress) setProgress(newProgress);
    if ([67, 100].includes(newProgress)) {
      setIsCelebrationVisible(true);
      setTimeout(() => setIsCelebrationVisible(false), 2000);
    }
  }, [form, progress]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      Alert.alert(t("formt.error"), t("formt.enter_name"));
      return;
    }
    if (!form.contact.trim() || form.contact.length !== 10 || !/^\d+$/.test(form.contact)) {
      Alert.alert(t("formt.error"), t("formt.enter_valid_contact"));
      return;
    }
    try {
      const response = await fetch("http://192.168.29.252:5000/api/submit-health-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert(t("formt.success"), t("formt.submit_success"));
      } else {
        Alert.alert(t("formt.error"), data.message || t("formt.generic_error"));
      }
    } catch (error) {
      Alert.alert(t("formt.error"), t("formt.failed_submit"));
    }
  };

  const interpolateColor = (val) => {
    const r = 255;
    const g = Math.round(165 + (120 - 165) * (val / 100));
    return `rgb(${r}, ${g}, 0)`;
  };

  const MAX_VALUE1 = 10000000;
  const STEP1 = 100000;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      let newValue = Math.min(100, Math.max(0, (gesture.moveX / 300) * 100));
      newValue = Math.round(newValue);
      setValue(newValue);
      animatedValue.setValue(newValue);
    },
  });

  const panResponder1 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      let newValue = Math.min(MAX_VALUE1, Math.max(0, (gesture.moveX / 300) * MAX_VALUE1));
      newValue = Math.round(newValue / STEP1) * STEP1;
      setValue1(newValue);
      setInputValue((newValue / 100000).toFixed(2));
    },
  });

  const handleInputChange = (text) => {
    if (/^\d*\.?\d{0,2}$/.test(text)) setInputValue(text);
  };

  const handleBlur = () => {
    let numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
      setValue1(numValue * 100000);
    } else {
      setInputValue("10.00");
      setValue1(1000000);
    }
  };

  const addTag = () => {
    if (medicalHistoryInput.trim() && !tags.includes(medicalHistoryInput.trim())) {
      setTags([...tags, medicalHistoryInput.trim()]);
      setMedicalHistoryInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const renderOption = (label, state, setState) => (
    <View style={styles.LifestyleChoiceRow}>
      <Text style={styles.LifestyleChoiceLabel}>{label}</Text>
      <View style={styles.LifestyleChoiceOptions}>
        <TouchableOpacity style={[styles.LifestyleChoiceOption, state === true && styles.LifestyleChoiceSelectedOption]} onPress={() => setState(true)}>
          <Text style={[styles.LifestyleChoiceOptionText, state === true && styles.LifestyleChoiceSelectedText]}>{t("formt.yes")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.LifestyleChoiceOption, state === false && styles.LifestyleChoiceSelectedOption]} onPress={() => setState(false)}>
          <Text style={[styles.LifestyleChoiceOptionText, state === false && styles.LifestyleChoiceSelectedText]}>{t("formt.no")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={{ backgroundColor: "#fff", padding: 20 }}>
      <Text style={styles.progressText}>{progress}% {t("formt.completed")}</Text>
      {isCelebrationVisible && (
        <LottieView source={require("../assets/sbi.png")} autoPlay loop={false} style={{ height: 200 }} />
      )}

      <TextInput placeholder={t("formt.name_placeholder")} value={form.name} onChangeText={(text) => handleChange("name", text)} style={styles.input} />
      <TextInput placeholder={t("formt.contact_placeholder")} value={form.contact} keyboardType="number-pad" maxLength={10} onChangeText={(text) => handleChange("contact", text)} style={styles.input} />
      <TextInput placeholder={t("formt.email_placeholder")} value={form.email} keyboardType="email-address" onChangeText={(text) => handleChange("email", text)} style={styles.input} />

      <Text style={styles.valueText}>{t("formt.enter_age")}</Text>
      <Text style={styles.valueText}>Age: {value}</Text>

      <Text style={styles.valueText}>{t("formt.cover_amount")}</Text>
      <TextInput keyboardType="decimal-pad" value={inputValue} onChangeText={handleInputChange} onBlur={handleBlur} style={styles.input} />

      <Text style={styles.checkboxLabel}>{t("formt.pre_existing")}</Text>
      <Pressable onPress={() => setHasDisease(!hasDisease)} style={[styles.checkbox, hasDisease && styles.checkedBox]}>
        {hasDisease && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>

      {hasDisease && (
        <TextInput placeholder="Disease Names" value={form.diseases} onChangeText={(text) => handleChange("diseases", text)} style={styles.input} />
      )}

      <Text style={styles.valueText}>{t("formt.lifestyle_choices")}</Text>
      {renderOption(t("formt.smoker"), isSmoker, setIsSmoker)}
      {renderOption(t("formt.alcoholic"), isAlcoholic, setIsAlcoholic)}
      {renderOption(t("formt.tobacco_use"), usesTobacco, setUsesTobacco)}

      <Text style={styles.valueText}>{t("formt.medical_history")}</Text>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text>{tag}</Text>
            <TouchableOpacity onPress={() => removeTag(tag)}><Text style={styles.removeTag}>×</Text></TouchableOpacity>
          </View>
        ))}
        <TextInput
          placeholder={t("formt.medical_history_placeholder")}
          value={medicalHistoryInput}
          onChangeText={setMedicalHistoryInput}
          onSubmitEditing={addTag}
          style={styles.input}
        />
      </View>

      <Text style={styles.counterLabel}>{t("formt.include_family")}</Text>
      <View style={styles.counterControls}>
        <TouchableOpacity onPress={() => setFamilyCount(Math.max(0, familyCount - 1))}><Text style={styles.counterText}>-</Text></TouchableOpacity>
        <Text>{familyCount}</Text>
        <TouchableOpacity onPress={() => setFamilyCount(familyCount + 1)}><Text style={styles.counterText}>+</Text></TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{t("formt.submit_button")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: { borderWidth: 1, marginVertical: 5, padding: 10 },
  progressText: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  valueText: { fontWeight: "bold", marginTop: 10 },
  checkbox: { width: 20, height: 20, borderWidth: 1, marginVertical: 10 },
  checkedBox: { backgroundColor: "#1D154A" },
  checkmark: { color: "#fff" },
  tagContainer: { flexDirection: "row", flexWrap: "wrap" },
  tag: { flexDirection: "row", alignItems: "center", backgroundColor: "#eee", margin: 2, padding: 5 },
  removeTag: { color: "red", marginLeft: 5 },
  counterLabel: { marginTop: 15 },
  counterControls: { flexDirection: "row", alignItems: "center", gap: 10 },
  counterText: { fontSize: 20 },
  button: { backgroundColor: "#28a745", padding: 15, marginTop: 20, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default HealthInsuranceFormScreen;
