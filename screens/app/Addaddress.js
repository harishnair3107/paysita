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

  const renderOption = (type, iconName, labelKey) => {
    return (
      <TouchableOpacity
        style={[styles.optionButton, selectedType === type && styles.selectedOption]}
        onPress={() => setSelectedType(type)}
      >
        <Ionicons name={iconName} size={24} color={selectedType === type ? "white" : "#1D154A"} />
        <Text style={[styles.optionText, selectedType === type && styles.selectedOptionText]}>
          {t(labelKey)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={styles.headerText}>{t('add_address')}</Text>
          </View>
        </Pressable>
      </View>

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
      <View style={styles.optionsContainer}>
        {renderOption("home", "home-outline", "home")}
        {renderOption("work", "briefcase-outline", "work")}
        {renderOption("other", "location-outline", "other")}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>{t('cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, !selectedType && styles.disabledButton]}
          disabled={!selectedType}
          onPress={handleSaveAddress}
        >
          <Text style={styles.nextButtonText}>{t('save')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles stay the same...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    marginBottom: 20,
    gap: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "auto",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1D154A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: "#1D154A",
  },
  optionText: {
    marginLeft: 5, 
    fontWeight: "bold",
  },
  selectedOptionText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    color: "#1D154A",
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#1D154A",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Addaddress;