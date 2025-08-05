import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

const DonationAndCharityFormScreen = () => {
    const { t } = useTranslation();

    const [form, setForm] = useState({
        name: '',
        contact: '',
        email: '',
        DonationAmount: '',
        paymentMethod: 'upi',
        DonationType: '',
        Message: '',
    });
    const isFormValid = () => {
  return (
    form.name.trim() &&
    form.contact.trim() &&
    form.email.trim() &&
    form.DonationAmount.trim() &&
    form.paymentMethod &&
    form.DonationType
  );
};


    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };
const handleSubmit = async () => {
  if (!isFormValid()) {
    Alert.alert('Error', 'Please fill in all required fields.');
    return;
  }

  try {
    const res = await fetch('http://192.168.29.22:5000/api/submit-donation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      Alert.alert('Success', 'Thank you for your donation!');
    } else {
      Alert.alert('Error', data.message);
    }
  } catch (error) {
    console.error('Submission failed:', error);
    Alert.alert('Error', 'Something went wrong!');
  }
   setForm({
            name: '',
            contact: '',
            email: '',
            DonationAmount: '',
            paymentMethod: 'upi',
            DonationType: '',
            Message: '',
        });
};


    const handleReset = () => {
        setForm({
            name: '',
            contact: '',
            email: '',
            DonationAmount: '',
            paymentMethod: 'upi',
            DonationType: '',
            Message: '',
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.formWrapper}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>{t('formpst.title')}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder={t('formpst.name')}
                        value={form.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />

                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, styles.halfWidth]}
                            placeholder={t('formpst.contact')}
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
                            placeholder={t('formpst.email')}
                            keyboardType="email-address"
                            value={form.email}
                            onChangeText={(text) => handleChange('email', text)}
                        />
                    </View>

                    <Text style={styles.label}>{t('formpst.amount')}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t('formpst.amount_placeholder')}
                        keyboardType="numeric"
                        value={form.DonationAmount}
                        onChangeText={(text) => handleChange('DonationAmount', text)}
                    />

                    <Text style={styles.label}>{t('formpst.payment_method')}</Text>
                    <Picker
                        selectedValue={form.paymentMethod}
                        onValueChange={(itemValue) => handleChange('paymentMethod', itemValue)}
                    >
                        <Picker.Item label={t('formpst.methods.upi')} value="upi" />
                        <Picker.Item label={t('formpst.methods.credit_card')} value="credit_card" />
                        <Picker.Item label={t('formpst.methods.debit_card')} value="debit_card" />
                        <Picker.Item label={t('formpst.methods.paypal')} value="paypal" />
                        <Picker.Item label={t('formpst.methods.net_banking')} value="net_banking" />
                    </Picker>

                    <Text style={styles.label}>{t('formpst.donation_type')}</Text>
                    <Picker
                        selectedValue={form.DonationType}
                        onValueChange={(itemValue) => handleChange('DonationType', itemValue)}
                    >
                        <Picker.Item label={t('formpst.types.religious')} value="religious" />
                        <Picker.Item label={t('formpst.types.child_welfare')} value="child_welfare" />
                        <Picker.Item label={t('formpst.types.education')} value="education" />
                        <Picker.Item label={t('formpst.types.healthcare')} value="healthcare" />
                        <Picker.Item label={t('formpst.types.animal_welfare')} value="animal_welfare" />
                        <Picker.Item label={t('formpst.types.disaster_relief')} value="disaster_relief" />
                        <Picker.Item label={t('formpst.types.environment')} value="environment" />
                        <Picker.Item label={t('formpst.types.other')} value="other" />
                    </Picker>

                    <TextInput
                        style={styles.textArea}
                        placeholder={t('formpst.message')}
                        multiline
                        numberOfLines={4}
                        value={form.Message}
                        onChangeText={(text) => handleChange('Message', text)}
                    />

                    <View style={styles.buttonContainer}>
                    <TouchableOpacity
  style={[styles.button, !isFormValid() && { backgroundColor: '#ccc' }]}
  onPress={handleSubmit}
  disabled={!isFormValid()}
>
  <Text style={styles.buttonText}>{t('formpst.submit')}</Text>
</TouchableOpacity>

                        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
                            <Text style={styles.buttonText}>{t('formpst.reset')}</Text>
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
    textArea: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        height: 80,
        backgroundColor: '#f9f9f9',
        width: '100%',
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
});

export default DonationAndCharityFormScreen;
