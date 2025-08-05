import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const Addaddress = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [house, setHouse] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  const handleSaveAddress = () => {
    navigation.navigate("profile", {
      house,
      address,
      landmark,
      type: selectedType,
    });
  };

  const renderOption = (type, iconName, labelKey) => (
    <TouchableOpacity
      style={[styles.optionCard, selectedType === type && styles.optionCardSelected]}
      onPress={() => setSelectedType(type)}
    >
      <Ionicons
        name={iconName}
        size={24}
        color={selectedType === type ? "#fff" : "#1D154A"}
      />
      <Text style={[styles.optionLabel, selectedType === type && styles.optionLabelSelected]}>
        {t(labelKey)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      {/* <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D154A" />
          <Text style={styles.headerText}>{t('add_address')}</Text>
        </Pressable>
      </View> */}

      <Text style={styles.label}>{t('house_flat_floor_number')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('house_placeholder')}
        value={house}
        onChangeText={setHouse}
      />

      <Text style={styles.label}>{t('complete_address')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('address_placeholder')}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>{t('landmark_optional')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('landmark_placeholder')}
        value={landmark}
        onChangeText={setLandmark}
      />

      <Text style={styles.label}>{t('save_as')}</Text>
      <View style={styles.optionsRow}>
{renderOption("home", "home-outline", "address.home")}
        {renderOption("work", "briefcase-outline", "work")}
        {renderOption("other", "location-outline", "other")}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>{t('cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, !selectedType && styles.saveButtonDisabled]}
          disabled={!selectedType}
          onPress={handleSaveAddress}
        >
          <Text style={styles.saveText}>{t('save')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Addaddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D154A",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  optionCard: {
    flex: 1,
    marginHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderColor: "#1D154A",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 2,
  },
  optionCardSelected: {
    backgroundColor: "#1D154A",
  },
  optionLabel: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#1D154A",
  },
  optionLabelSelected: {
    color: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: 30,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelText: {
    fontSize: 16,
    color: "#1D154A",
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#1D154A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom:200
  },
  saveButtonDisabled: {
    backgroundColor: "#aaa",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
