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

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        if (!form.name || !form.contact) {
            Alert.alert(t('form.error_title'), t('form.error_required_fields'));
            return;
        }
        console.log('Form Submitted:', form);
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
                    <Text style={styles.title}>{t('form.title')}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder={t('form.name')}
                        value={form.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />

                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, styles.halfWidth]}
                            placeholder={t('form.contact')}
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
                            placeholder={t('form.email')}
                            keyboardType="email-address"
                            value={form.email}
                            onChangeText={(text) => handleChange('email', text)}
                        />
                    </View>

                    <Text style={styles.label}>{t('form.amount')}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t('form.amount_placeholder')}
                        keyboardType="numeric"
                        value={form.DonationAmount}
                        onChangeText={(text) => handleChange('DonationAmount', text)}
                    />

                    <Text style={styles.label}>{t('form.payment_method')}</Text>
                    <Picker
                        selectedValue={form.paymentMethod}
                        onValueChange={(itemValue) => handleChange('paymentMethod', itemValue)}
                    >
                        <Picker.Item label={t('form.methods.upi')} value="upi" />
                        <Picker.Item label={t('form.methods.credit_card')} value="credit_card" />
                        <Picker.Item label={t('form.methods.debit_card')} value="debit_card" />
                        <Picker.Item label={t('form.methods.paypal')} value="paypal" />
                        <Picker.Item label={t('form.methods.net_banking')} value="net_banking" />
                    </Picker>

                    <Text style={styles.label}>{t('form.donation_type')}</Text>
                    <Picker
                        selectedValue={form.DonationType}
                        onValueChange={(itemValue) => handleChange('DonationType', itemValue)}
                    >
                        <Picker.Item label={t('form.types.religious')} value="religious" />
                        <Picker.Item label={t('form.types.child_welfare')} value="child_welfare" />
                        <Picker.Item label={t('form.types.education')} value="education" />
                        <Picker.Item label={t('form.types.healthcare')} value="healthcare" />
                        <Picker.Item label={t('form.types.animal_welfare')} value="animal_welfare" />
                        <Picker.Item label={t('form.types.disaster_relief')} value="disaster_relief" />
                        <Picker.Item label={t('form.types.environment')} value="environment" />
                        <Picker.Item label={t('form.types.other')} value="other" />
                    </Picker>

                    <TextInput
                        style={styles.textArea}
                        placeholder={t('form.message')}
                        multiline
                        numberOfLines={4}
                        value={form.Message}
                        onChangeText={(text) => handleChange('Message', text)}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>{t('form.submit')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
                            <Text style={styles.buttonText}>{t('form.reset')}</Text>
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
