import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import axios from 'axios';

const taxationForm = ({ navigation }) => {
  const { t } = useTranslation();

  const [selectedProfession, setSelectedProfession] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    city: "",
    income: "",
  });
  const [errors, setErrors] = useState({});

  const toggleCategorySelection = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = t("errors.nameRequired");
    if (!formData.contact) newErrors.contact = t("errors.contactRequired");
    if (!formData.email) newErrors.email = t("errors.emailRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = formData.name && formData.contact && formData.email;

  const handleSave = async () => {
  if (!validateForm()) return;

  try {
    const response = await axios.post('http://192.168.29.22:5000/api/itr', {
      ...formData,
      categories: selectedCategories,
      profession: selectedProfession
    });
    alert(response.data.message);
  } catch (error) {
    console.error('Submission Error:', error);
    alert('Error submitting ITR form');
  }
};

  const handleReset = () => {
    setFormData({ name: "", contact: "", email: "", city: "", income: "" });
    setSelectedCategories([]);
    setSelectedProfession("");
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t("title.taxationForm")}</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subHeader}>{t("title.enterDetails")}</Text>
        <Text style={styles.description}>{t("description.moreAboutYourself")}</Text>

        <TextInput
          style={[styles.input, errors.name && styles.errorInput]}
          placeholder={t("placeholders.yourName")}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <View style={styles.rowContainer}>
          <TextInput
            style={[styles.input, styles.halfInput, errors.contact && styles.errorInput]}
            placeholder={t("placeholders.contactNumber")}
            keyboardType="phone-pad"
            value={formData.contact}
            onChangeText={(text) => setFormData({ ...formData, contact: text })}
          />
          <TextInput
            style={[styles.input, styles.halfInput, errors.email && styles.errorInput]}
            placeholder={t("placeholders.email")}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
        </View>
        {errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>}
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder={t("placeholders.city")}
          value={formData.city}
          onChangeText={(text) => setFormData({ ...formData, city: text })}
        />

        <View style={styles.categoryContainer}>
          {["Salaried", "Business", "Other"].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategories.includes(category) && styles.selectedCategory,
              ]}
              onPress={() => toggleCategorySelection(category)}
            >
              <Text style={styles.categoryText}>{t(`category.${category.toLowerCase()}`)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder={t("placeholders.income")}
          keyboardType="numeric"
          value={formData.income}
          onChangeText={(text) => setFormData({ ...formData, income: text })}
        />

        <Text style={styles.label}>{t("title.selectProfession")}</Text>
        <Picker
          selectedValue={selectedProfession}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedProfession(itemValue)}
        >
          <Picker.Item label={t("options.select")} value="" />
          <Picker.Item label={t("options.engineer")} value="engineer" />
          <Picker.Item label={t("options.doctor")} value="doctor" />
          <Picker.Item label={t("options.teacher")} value="teacher" />
          <Picker.Item label={t("options.business")} value="business" />
          <Picker.Item label={t("options.others")} value="others" />
        </Picker>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.saveButton,
              { backgroundColor: isFormValid ? "#FFA500" : "#A9A9A9" },
            ]}
            onPress={handleSave}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>{t("buttons.save")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
            <Text style={styles.buttonText}>{t("buttons.reset")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  formContainer: {
    borderWidth: 2,
    borderColor: "#0057D9",
    padding: 15,
    borderRadius: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: "#FFA500",
  },
  categoryText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: "#FFA500",
  },
  resetButton: {
    backgroundColor: "#d9534f",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  
});

export default taxationForm;