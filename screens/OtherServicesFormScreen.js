import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

const OtherServicesFormScreen = () => {
    const { t } = useTranslation();

    const [form, setForm] = useState({
        name: '',
        contact: '',
        email: '',
        serviceType: '',
        gender: '',
        message: '',
    });

    const handleChange = (field, value) => setForm({ ...form, [field]: value });

    const handleSubmit = () => {
        if (!form.name || !form.contact || !form.serviceType || !form.gender) {
            Alert.alert(t('errorTitle'), t('errorMessage'));
            return;
        }
        console.log(t('formSubmittedLog'), form);
    };

    const handleReset = () => {
        setForm({ name: '', contact: '', email: '', serviceType: '', gender: '', message: '' });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.formWrapper}>  
                <View style={styles.formContainer}>
                    <Text style={styles.title}>{t('otherServicesTitle')}</Text>

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

                    <Text style={styles.label}>{t('genderLabel')}</Text>
                    <View style={styles.radioContainer}>
                        {[t('maleOption'), t('femaleOption'), t('otherOption')].map((genderOption) => (
                            <TouchableOpacity 
                                key={genderOption} 
                                style={styles.radioButton} 
                                onPress={() => handleChange('gender', genderOption)}
                            >
                                <View style={styles.radioOuter}>
                                    {form.gender === genderOption && <View style={styles.radioInner} />}
                                </View>
                                <Text style={styles.radioLabel}>{genderOption}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>{t('serviceTypeLabel')}</Text>
                    <Picker
                        selectedValue={form.serviceType}
                        onValueChange={(itemValue) => handleChange('serviceType', itemValue)}
                    >
                        <Picker.Item label={t('selectServicePlaceholder')} value="" />
                        <Picker.Item label={t('legalConsultingOption')} value="legal_consulting" />
                        <Picker.Item label={t('registrationServicesOption')} value="registration_services" />
                        <Picker.Item label={t('webAppDeveloperOption')} value="web_app_developer" />
                        <Picker.Item label={t('matrimonyOption')} value="matrimony" />
                        <Picker.Item label={t('marriageRegistrationOption')} value="marriage_registration" />
                        <Picker.Item label={t('digitalMarketingOption')} value="digital_marketing" />
                        <Picker.Item label={t('salesDeedOption')} value="sales_deed" />
                        <Picker.Item label={t('gstRegistrationOption')} value="gst_registration" />
                    </Picker>

                    <TextInput
                        style={styles.textArea}
                        placeholder={t('messagePlaceholder')}
                        multiline
                        numberOfLines={4}
                        value={form.message}
                        onChangeText={(text) => handleChange('message', text)}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>{t('submitButton')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
                            <Text style={styles.buttonText}>{t('resetButton')}</Text>
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
    radioContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#1D154A",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#1D154A",
    },
    radioLabel: {
        fontSize: 16,
    },
});

export default OtherServicesFormScreen;