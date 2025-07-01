import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const EducationalFormScreen = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    purpose: [],
    qualification: '',
    income: '',
    courseInterest: '',
    universityInterest: '',
    countryInterest: '',
    additionalRequirement: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const toggleSelection = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: prevForm[field] === value ? '' : value,
    }));
  };

  const handleReset = () => {
    setForm({
      name: '',
      contact: '',
      email: '',
      purpose: [],
      qualification: '',
      income: '',
      courseInterest: '',
      universityInterest: '',
      countryInterest: '',
      additionalRequirement: '',
    });
  };

  const isFormValid = form.name.trim() && form.contact.trim() && form.email.trim();

  const handleSubmit = () => {
    if (!isFormValid) {
      alert(t('form.required_fields_warning'));
      return;
    }
    console.log('Form Submitted:', form);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formWrapper}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('forms.name')}
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfWidth]}
              placeholder={t('form.contact')}
              keyboardType="phone-pad"
              value={form.contact}
              onChangeText={(text) => handleChange('contact', text)}
            />
            <TextInput
              style={[styles.input, styles.halfWidth]}
              placeholder={t('form.email')}
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>

          <Text style={styles.label}>{t('forms.mode_of_study')}</Text>
          <View style={styles.categoryContainer}>
            {['Online', 'Offline', 'Hybrid'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.categoryButton, form.purpose.includes(item) && styles.selectedCategory]}
                onPress={() => toggleSelection('purpose', item)}
              >
                <Text
                  style={[styles.categoryText, form.purpose.includes(item) && styles.selectedCategoryText]}
                >
                  {t(`mode.${item}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>{t('forms.qualification')}</Text>
          <View style={styles.categoryContainer}>
            {['10+', '12+', 'Undergraduate', 'Postgraduate'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.categoryButton, form.qualification === item && styles.selectedCategory]}
                onPress={() => toggleSelection('qualification', item)}
              >
                <Text
                  style={[styles.categoryText, form.qualification === item && styles.selectedCategoryText]}
                >
                  {t(`qualificationOptions.${item}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>{t('forms.income')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('forms.income')}
            keyboardType="numeric"
            value={form.income}
            onChangeText={(text) => handleChange('income', text)}
          />

          <Text style={styles.sectionHeader}>{t('forms.course_interest')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('forms.course_interest')}
            value={form.courseInterest}
            onChangeText={(text) => handleChange('courseInterest', text)}
          />

          <TextInput
            style={styles.input}
            placeholder={t('forms.university_interest')}
            value={form.universityInterest}
            onChangeText={(text) => handleChange('universityInterest', text)}
          />

          <TextInput
            style={styles.input}
            placeholder={t('forms.country_interest')}
            value={form.countryInterest}
            onChangeText={(text) => handleChange('countryInterest', text)}
          />

          <TextInput
            style={styles.textArea}
            placeholder={t('forms.additional_requirement')}
            multiline
            numberOfLines={4}
            value={form.additionalRequirement}
            onChangeText={(text) => handleChange('additionalRequirement', text)}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, !isFormValid && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={!isFormValid}
            >
              <Text style={styles.buttonText}>{t('forms.save')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
              <Text style={styles.buttonText}>{t('forms.reset')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.info}>
          {t('forms.terms_prefix')} <Text style={{ color: '#FFA500', fontWeight: 'bold' }}>{t('forms.terms')}</Text> {t('common.and')} <Text style={{ color: '#FFA500', fontWeight: 'bold' }}>{t('form.privacy')}</Text> of Indiayapay.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ebf7ff',
  },
  formWrapper: {
    flexGrow: 1,
    backgroundColor: '#FAF9F6',
    borderRadius: 15,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#303030',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: 'ebf7ff',
  },
  input: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#303030',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1D154A',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#0057D9',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: '#FFA500',
    borderColor: '#CCCCCC',
  },
  categoryText: {
    color: '#333',
    fontWeight: 'bold',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    height: 80,
    backgroundColor: '#f9f9f9',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  info: {
    padding: 5,
  },
});

export default EducationalFormScreen;
