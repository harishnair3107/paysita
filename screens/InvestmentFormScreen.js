import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

const InvestmentFormScreen = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    age: '',
    timeperiod: '',
    amount: '',
    expectedinterest: '',
    additionalRequirement: '',
  });

  const [selectedInterest, setSelectedInterest] = useState("");
  const interestRates = ["4-6%", "6-8%", "8-10%", "10-12%"];

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleReset = () => {
    setForm({
      name: '',
      contact: '',
      email: '',
      age: '',
      timeperiod: '',
      amount: '',
      expectedinterest: '',
      additionalRequirement: '',
    });
    setSelectedInterest("");
  };

  const isFormValid = form.name.trim() && form.contact.trim();

  const handleSubmit = () => {
    if (!form.name.trim()) {
      Alert.alert(t("formts.error"), t("formts.enter_name"));
      return;
    }

    if (!form.contact.trim() || form.contact.length !== 10 || !/^\d+$/.test(form.contact)) {
      Alert.alert(t("formts.error"), t("formts.enter_valid_contact"));
      return;
    }

    console.log("Form Submitted:", form);

    Alert.alert(t("formts.success"), t("formts.submit_success"), [
      { text: "OK", onPress: () => handleReset() }
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formWrapper}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder={t("formts.name_placeholder")}
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfWidth]}
              placeholder={t("formts.contact_placeholder")}
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
              placeholder={t("formts.email_placeholder")}
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder={t("formts.time_period")}
            value={form.timeperiod}
            onChangeText={(text) => handleChange('timeperiod', text)}
          />

          <TextInput
            style={styles.input}
            placeholder={t("formts.investment_amount")}
            keyboardType="numeric"
            value={form.amount}
            onChangeText={(text) => handleChange('amount', text)}
          />

          <View style={styles.section}>
            <Text style={styles.label}>{t("formts.expected_interest")}</Text>
            {interestRates.reduce((rows, rate, index) => {
              if (index % 2 === 0) {
                rows.push([rate]);
              } else {
                rows[rows.length - 1].push(rate);
              }
              return rows;
            }, []).map((row, rowIndex) => (
              <View key={rowIndex} style={styles.buttonRow}>
                {row.map((rate, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.rateButton, selectedInterest === rate && styles.selectedRate]}
                    onPress={() => {
                      setSelectedInterest(rate);
                      handleChange("expectedinterest", rate);
                    }}
                  >
                    <Text style={[styles.rateButtonText, selectedInterest === rate && styles.selectedRateText]}>
                      {rate}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <TextInput
            style={styles.textArea}
            placeholder={t("formts.additional_requirement")}
            multiline
            numberOfLines={3}
            value={form.additionalRequirement}
            onChangeText={(text) => handleChange('additionalRequirement', text)}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, !isFormValid && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={!isFormValid}
            >
              <Text style={styles.buttonText}>{t("formts.submit_button")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
              <Text style={styles.buttonText}>{t("formts.reset_button")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.info}>
          {t("formts.terms_prefix")}{" "}
          <Text style={{ color: "#FFA500", fontWeight: "bold" }}>{t("formts.terms_of_use")}</Text>{" "}
          {t("formts.and")}{" "}
          <Text style={{ color: "#FFA500", fontWeight: "bold" }}>{t("formts.privacy_policy")}</Text>{" "}
          {t("formts.of")} Indiayapay.
        </Text>
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
    borderColor: "#ddd",
    borderColor:'#1D154A',
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
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
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    height: 80,
    backgroundColor: "#f9f9f9",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  resetButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  info: {
    marginTop: 15,
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    paddingHorizontal: 20,
  },
  linkText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 15,
},
label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1D154A",  
    marginBottom: 5,
},
buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
},
rateButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#303030",
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
},
selectedRate: {
    backgroundColor: "#FFA500",
    borderColor: "#FF8C00",
},
rateButtonText: {
    fontWeight: "bold",
    color: "#1D154A",
},
selectedRateText: {
    color: "#FFF",
},

});
export default InvestmentFormScreen;
