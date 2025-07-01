import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // ✅ Import translation hook

const BroadBandDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { providerName, providerImage } = route.params || {};  
  const [landlineNumber, setLandlineNumber] = useState("");
  const { t } = useTranslation(); // ✅ Initialize translation

  const isButtonEnabled = landlineNumber.length === 10;

  return (
    <View style={styles.container}>
      {/* Selected Provider Info */}
      <View style={styles.providerContainer}>
        <Image source={providerImage} style={styles.providerImage} />
        <Text style={styles.providerText}>{providerName}</Text>
      </View>

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          {t("broadband.landline_label") /* "Landline Number with STD code" */}
        </Text>
        <TextInput 
          style={styles.input} 
          placeholder={t("broadband.landline_placeholder") /* "Enter Landline Number with STD code" */}
          keyboardType="numeric"
          maxLength={10}
          value={landlineNumber}
          onChangeText={setLandlineNumber}
        />
      </View>

      {/* Information Box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          {t("broadband.info_text") /* "By proceeding, you allow IndiayaPay to fetch and remind you of current & future bills." */}
        </Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity 
        style={[
          styles.confirmButton,
          { backgroundColor: isButtonEnabled ? "#6200EE" : "#CCC" },
        ]}
        disabled={!isButtonEnabled}
      >
        <Text style={styles.confirmText}>
          {t("broadband.confirm") /* "Confirm" */}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BroadBandDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8", padding: 20 },
  providerContainer: { alignItems: "center", marginBottom: 15 },
  providerImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  providerText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  inputContainer: { backgroundColor: "#FFF", padding: 15, marginVertical: 10, borderRadius: 8 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#CCC", padding: 10, borderRadius: 5 },
  infoBox: { backgroundColor: "#FFF", padding: 15, marginVertical: 10, borderRadius: 8 },
  infoText: { fontSize: 14, color: "#666" },
  confirmButton: { padding: 15, alignItems: "center", marginTop: "auto", borderRadius: 5 },
  confirmText: { fontSize: 16, fontWeight: "bold", color: "#FFF" },
});
