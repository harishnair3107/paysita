
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

const insuranceTypes = ['car', 'home', 'travel', 'bike', 'shop', 'office', 'machinery', 'pet', 'building', 'marine', 'gold', 'others'];
const additionalCoverages = ['roadside', 'theft', 'natural', 'passenger', 'warranty', 'others'];

const GeneralInsuranceFormScreen = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    insuranceType: [],
    additionalCoverage: []
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const toggleSelection = (field, option) => {
    setForm((prevForm) => {
      const updatedOptions = prevForm[field].includes(option)
        ? prevForm[field].filter(item => item !== option)
        : [...prevForm[field], option];
      return { ...prevForm, [field]: updatedOptions };
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.contact) {
      Alert.alert(t('gen_ins_form.error_title'), t('gen_ins_form.error_required_fields'));
      return;
    }

    console.log('Submitting form:', form);
    try {
      const response = await fetch('http://192.168.29.252:5000/submit-general', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok) {
        Alert.alert(t('gen_ins_form.success_title'), t('gen_ins_form.success_message'));
        handleReset();
      } else {
        Alert.alert(t('gen_ins_form.failed_title'), data.message || t('gen_ins_form.failed_message'));
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(t('gen_ins_form.network_error'), t('gen_ins_form.network_error_message'));
    }
  };

  const handleReset = () => {
    setForm({ name: '', contact: '', email: '', insuranceType: [], additionalCoverage: [] });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formWrapper}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>{t('gen_ins_form.title')}</Text>

          <TextInput
            style={styles.input}
            placeholder={t('gen_ins_form.name')}
            value={form.name}
            onChangeText={(text) => handleChange("name", text)}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfWidth]}
              placeholder={t('gen_ins_form.contact')}
              keyboardType="phone-pad"
              value={form.contact}
              onChangeText={(text) => {
                if (/^\d*$/.test(text) && text.length <= 10) {
                  handleChange('contact', text);
                }
              }}
              maxLength={10}
            />
            <TextInput
              style={[styles.input, styles.halfWidth]}
              placeholder={t('gen_ins_form.email')}
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('gen_ins_form.insurance_type')}</Text>
            <View style={styles.buttonRow}>
              {insuranceTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.optionButton,
                    form.insuranceType.includes(type) && styles.selectedOption
                  ]}
                  onPress={() => toggleSelection('insuranceType', type)}
                >
                  <Text style={form.insuranceType.includes(type) ? styles.selectedOptionText : styles.optionText}>
                    {t(`gen_ins_form.insurance_types.${type}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('gen_ins_form.coverage_options')}</Text>
            <View style={styles.buttonRow}>
              {additionalCoverages.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    form.additionalCoverage.includes(option) && styles.selectedOption
                  ]}
                  onPress={() => toggleSelection('additionalCoverage', option)}
                >
                  <Text style={form.additionalCoverage.includes(option) ? styles.selectedOptionText : styles.optionText}>
                    {t(`gen_ins_form.coverage.${option}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{t('gen_ins_form.submit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
              <Text style={styles.buttonText}>{t('gen_ins_form.reset')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf7ff",
  },
  formWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  formContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#1D154A",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#1D154A"
  },
  formGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#04AA6D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  resetButton: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#1D154A',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    margin: 5,
  },
  selectedOption: {
    backgroundColor: '#FFA500',
  },
  optionText: {
    color: '#1D154A',
  },
  selectedOptionText: {
    color: '#fff',
  },
});

export default GeneralInsuranceFormScreen;

