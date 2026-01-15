import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Alert
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/Theme";

/* ---------- DATA ---------- */

const insuranceTypes = [
  { name: "term", image: require("../../assets2/stopwatch.png"), screen: "GeneralInsuranceFormScreen" },
  { name: "health", image: require("../../assets2/healthcare.png"), screen: "HealthInsuranceFormScreen" },
  { name: "car", image: require("../../assets2/car.png"), screen: "GeneralInsuranceFormScreen" },
  { name: "bike", image: require("../../assets2/bycicle.png"), screen: "GeneralInsuranceFormScreen" },
  { name: "marine", image: require("../../assets2/ship.png"), screen: "GeneralInsuranceFormScreen" },
  { name: "machinery", image: require("../../assets2/settings.png"), screen: "GeneralInsuranceFormScreen" },
  { name: "employee_group", image: require("../../assets2/new-employee.png"), screen: "GeneralInsuranceFormScreen" },
  { name: "travel", image: require("../../assets2/plane.png"), screen: "GeneralInsuranceFormScreen" },
  { name: "homes", image: require("../../assets2/house.png"), screen: "GeneralInsuranceFormScreen" },
];

const investmentTypes = [
  { name: "sip", image: require("../../assets2/financial.png"), screen: "InvestmentFormScreen" },
  { name: "shares", image: require("../../assets2/stock.png"), screen: "InvestmentFormScreen" },
  { name: "mutual_funds", image: require("../../assets2/mutual.png"), screen: "InvestmentFormScreen" },
  { name: "bonds", image: require("../../assets2/bonds.png"), screen: "InvestmentFormScreen" },
  { name: "child_plan", image: require("../../assets2/child.png"), screen: "InvestmentFormScreen" },
  { name: "pension_plan", image: require("../../assets2/retirement.png"), screen: "InvestmentFormScreen" },
  { name: "nsc", image: require("../../assets2/shield.png"), screen: "InvestmentFormScreen" },
  { name: "ncd", image: require("../../assets2/layers.png"), screen: "InvestmentFormScreen" },
  { name: "nfo", image: require("../../assets2/shuttle.png"), screen: "InvestmentFormScreen" },
  { name: "ppf", image: require("../../assets2/wallet.png"), screen: "InvestmentFormScreen" },
  { name: "rd", image: require("../../assets2/schedule.png"), screen: "InvestmentFormScreen" },
  { name: "treasuring_bills", image: require("../../assets2/cashRupee.png"), screen: "InvestmentFormScreen" },
];

/* ---------- MAIN COMPONENT ---------- */

export default function InsuranceSection({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  const [insuranceModal, setInsuranceModal] = useState(false);
  const [investmentModal, setInvestmentModal] = useState(false);

  return (
    <View style={styles.container}>

      {/* ROW 1 */}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setInsuranceModal(true)}
          style={[styles.card, styles.largeCard]}
        >
          <Text style={styles.title}>{t("service.insurance")}</Text>
          <Text style={styles.subtitle}>
            {insuranceTypes.slice(0, 5).map(i => t(i.name)).join(", ")}
          </Text>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity
          onPress={() => //navigation.navigate("MovieBookingScreen")
             Alert.alert("Coming Soon")
          }
          style={[styles.card, styles.smallCard]}
        >
          <Text style={styles.smallTitle}>{t("movie_tickets")}</Text>
          <Text style={styles.subtitle}>{t("movie_sample_titles")}</Text>
        </TouchableOpacity>
      </View>

      {/* ROW 2 */}
      <View style={[styles.row, { marginTop: 10 }]}>
        <TouchableOpacity
          onPress={() => //navigation.navigate("EventBookingScreen")
             Alert.alert("Coming Soon") 
          }
          style={[styles.card, styles.smallCard]}
        >
          <Text style={styles.smallTitle}>{t("event_tickets")}</Text>
          <Text style={styles.subtitle}>{t("event_sample_titles")}</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity
          onPress={() => setInvestmentModal(true)}
          style={[styles.card, styles.largeCard]}
        >
          <Text style={styles.title}>{t("investment")}</Text>
          <Text style={styles.subtitle}>
            {investmentTypes.slice(0, 4).map(i => t(i.name)).join(", ")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* MODALS */}
      <Modal visible={insuranceModal} transparent animationType="slide">
        <ModalWrapper onClose={() => setInsuranceModal(false)}>
          <ServiceGrid data={insuranceTypes} />
        </ModalWrapper>
      </Modal>

      <Modal visible={investmentModal} transparent animationType="slide">
        <ModalWrapper onClose={() => setInvestmentModal(false)}>
          <ServiceGrid data={investmentTypes} />
        </ModalWrapper>
      </Modal>

    </View>
  );
}

/* ---------- GRID ---------- */

function ServiceGrid({ data }) {
  const { colors } = useContext(ThemeContext);

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      numColumns={3}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item }) => (
        <View style={{ flex: 1, alignItems: "center", marginBottom: 20 }}>
          <View style={{
            backgroundColor: colors.background,
            padding: 10,
            borderRadius: 14,
          }}>
            <Image
              source={item.image}
              style={{ width: 28, height: 28, resizeMode: "contain" }}
            />
          </View>

          <Text style={{
            marginTop: 5,
            fontSize: 12,
            fontWeight: "bold",
            color: colors.text,
            textAlign: "center",
          }}>
            {item.name}
          </Text>
        </View>
      )}
    />
  );
}

/* ---------- MODAL WRAPPER ---------- */

function ModalWrapper({ children, onClose }) {
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback>
          <View style={styles.modalCard}>
            {children}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

/* ---------- STYLES ---------- */

const createStyles = (colors) =>
  StyleSheet.create({
    container: { padding: 14 },

    row: { flexDirection: "row", alignItems: "center" },

    spacer: { width: wp("4%") },

    card: {
      backgroundColor: colors.background,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.border,
      padding: 15,
    },

    largeCard: { width: wp("60%"), height: hp("10%") },

    smallCard: { width: wp("32%"), height: hp("10%") },

    title: { fontSize: 18, fontWeight: "bold", color: colors.text },

    smallTitle: { fontSize: 16, fontWeight: "bold", color: colors.text },

    subtitle: { fontSize: 12, marginTop: 4, color: colors.text },

    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },

    modalCard: {
      width: "80%",
      maxHeight: "70%",
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 10,
    },

    closeButton: {
      marginTop: 10,
      backgroundColor: colors.primary,
      padding: 8,
      borderRadius: 5,
      alignItems: "center",
    },

    closeText: { color: "#fff", fontWeight: "bold" },
  });
