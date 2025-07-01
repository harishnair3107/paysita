import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated, PanResponder } from 'react-native';
import { useTranslation } from 'react-i18next';

const RealEstateFormScreen = () => {
  const { t } = useTranslation();
  
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    purpose: [],
    possession: [],
    propertyType: [],
    budgetRange: [0, 5000000], 
    carpetArea: '',
    additionalRequirement: '',
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });
  const toggleSelection = (key, item) => setForm((prev) => ({
    ...prev,
    [key]: prev[key].includes(item) ? prev[key].filter((i) => i !== item) : [...prev[key], item],
  }));
  const handleReset = () => setForm({
    name: '',
    contact: '',
    email: '',
    purpose: [],
    possession: [],
    propertyType: [],
    budgetRange: [0, 5000000],
    carpetArea: '',
    additionalRequirement: '',
  });

  const isFormValid = form.name.trim() && form.contact.trim() && form.email.trim();
  const handleSubmit = () => {
    if (!isFormValid) return alert(t('fillAllFields', { defaultValue: 'Please fill all required fields' }));
    console.log('Form Submitted:', form);
  };

  // Slider code
  const MAX_VALUE = 10000000;
  const STEP = 100000;
  const [minValue, setMinValue] = useState(2000000);
  const [maxValue, setMaxValue] = useState(8000000);
  const minAnimatedValue = useRef(new Animated.Value(minValue)).current;
  const maxAnimatedValue = useRef(new Animated.Value(maxValue)).current;
  const trackRef = useRef(null);
  const [layoutWidth, setLayoutWidth] = useState(1);

  const interpolateColor = (value) => {
    const r = 255;
    const g = Math.round(165 + (120 - 165) * (value / MAX_VALUE));
    return `rgb(${r}, ${g}, 0)`;
  };
  const handleLayout = (e) => setLayoutWidth(e.nativeEvent.layout.width);

  const panResponderMin = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      let newMinValue = Math.min(maxValue - STEP, Math.max(0, (gesture.moveX / layoutWidth) * MAX_VALUE));
      newMinValue = Math.round(newMinValue / STEP) * STEP;
      setMinValue(newMinValue);
      minAnimatedValue.setValue(newMinValue);
    },
  });

  const panResponderMax = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      let newMaxValue = Math.min(MAX_VALUE, Math.max(minValue + STEP, (gesture.moveX / layoutWidth) * MAX_VALUE));
      newMaxValue = Math.round(newMaxValue / STEP) * STEP;
      setMaxValue(newMaxValue);
      maxAnimatedValue.setValue(newMaxValue);
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formWrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>

          <TextInput
            style={styles.input}
            placeholder={t('namePlaceholder')}
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfWidth]}
              placeholder={t('contactPlaceholder')}
              keyboardType="phone-pad"
              value={form.contact}
              onChangeText={(text) => handleChange('contact', text)}
            />
            <TextInput
              style={[styles.input, styles.halfWidth]}
              placeholder={t('emailPlaceholder')}
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>

          <Text style={styles.label}>{t('purpose')}</Text>
          <View style={styles.categoryContainer}>
            {['Buy', 'Sell', 'Rent', 'Lease'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.categoryButton, form.purpose.includes(item) && styles.selectedCategory]}
                onPress={() => toggleSelection('purpose', item)}
              >
                <Text style={[styles.categoryText, form.purpose.includes(item) && styles.selectedCategoryText]}>
                  {t(item)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>{t('possession')}</Text>
          <View style={styles.row2}>
            {['Under construction', 'Ready-to-move', 'Resell'].map((item, index) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton2,
                  form.possession.includes(item) && styles.selectedCategory,
                  index === 2 && styles.lastItem,
                ]}
                onPress={() => toggleSelection('possession', item)}
              >
                <Text style={[styles.categoryText, form.possession.includes(item) && styles.selectedCategoryText]}>
                  {t(item)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>{t('propertyType')}</Text>
          <View style={styles.categoryContainer}>
            {['Flat', 'Bunglow', 'Shop', 'Factory', 'Agricultural Land', 'R Zone Land', 'N.A Plot', 'School/Hotel'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.categoryButton, form.propertyType.includes(item) && styles.selectedCategory]}
                onPress={() => toggleSelection('propertyType', item)}
              >
                <Text style={[styles.categoryText, form.propertyType.includes(item) && styles.selectedCategoryText]}>
                  {t(item)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>{t('budgetRange')}</Text>
          <View style={styles.container}>
            <Text style={styles.valueText}>{t('min')}: {minValue.toLocaleString()} - {t('max')}: {maxValue.toLocaleString()}</Text>
            <View style={styles.trackContainer} ref={trackRef} onLayout={handleLayout}>
              <View
                style={[
                  styles.filledTrack,
                  {
                    left: `${(minValue / MAX_VALUE) * 100}%`,
                    width: `${((maxValue - minValue) / MAX_VALUE) * 100}%`,
                    backgroundColor: interpolateColor(maxValue),
                  },
                ]}
              />
            </View>
            <Animated.View {...panResponderMin.panHandlers} style={[styles.thumb, { left: `${(minValue / MAX_VALUE) * 100}%` }]} />
            <Animated.View {...panResponderMax.panHandlers} style={[styles.thumb, { left: `${(maxValue / MAX_VALUE) * 100}%` }]} />
          </View>

          <TextInput
            style={styles.input}
            placeholder={t('carpetAreaPlaceholder')}
            keyboardType="numeric"
            value={form.carpetArea}
            onChangeText={(text) => handleChange('carpetArea', text)}
          />

          <TextInput
            style={styles.textArea}
            placeholder={t('additionalRequirementPlaceholder')}
            multiline
            numberOfLines={3}
            value={form.additionalRequirement}
            onChangeText={(text) => handleChange('additionalRequirement', text)}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, !isFormValid && styles.disabledButton]} onPress={handleSubmit} disabled={!isFormValid}>
              <Text style={styles.buttonText}>{t('saveButton')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
              <Text style={styles.buttonText}>{t('resetButton')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.info}>{t('termsOfUse')}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ebf7ff", 
  },
  formWrapper: {
    flexGrow: 1, 
    backgroundColor: "#FAF9F6", 
    borderRadius: 15,
    elevation: 5,
    borderWidth: 3,
    borderColor: "#303030",
    alignItems: "center",
    
  },
  formContainer: {
    width: "100%", 
    padding: 15,
    backgroundColor: "ebf7ff", 
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
  Slidercontainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 50,
    marginBottom:30,
  },
  valueText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10, 
  },
  trackContainer: {
    width: "100%",
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D3D3D3",
    position: "relative",
    overflow: "hidden",
  },
  filledTrack: {
    position: "absolute",
    height: "100%",
    borderRadius: 5,

  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 5,
    borderColor: "#D2691E",
    position: "absolute",
    top: 40, 
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
  row2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    marginBottom: 15,
    justifyContent: 'space-between',
    
  },
  
  categoryButton2: {
    width: '48%', 
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  lastItem: {
    width: '50%', 
    alignSelf: 'center', 
  },
  info:{
    padding:5,
  }
  
});

export default RealEstateFormScreen;