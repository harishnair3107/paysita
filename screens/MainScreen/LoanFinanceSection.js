import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert
} from "react-native";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/Theme";

/* ---------- DATA ---------- */

const loanAndFinanceItems = [
  { nameKey: "loan.personal", img: require("../../assets2/get-money.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.business", img: require("../../assets2/businessLoan.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.home", img: require("../../assets2/home.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.gold", img: require("../../assets2/goldLoan.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.home_transfer", img: require("../../assets2/transfer.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.renovation", img: require("../../assets2/construction.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.education", img: require("../../assets2/education.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.property", img: require("../../assets2/propertyLoan.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.shares", img: require("../../assets2/stockLoan.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.sme", img: require("../../assets2/wallet.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.project", img: require("../../assets2/project.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.vehicle", img: require("../../assets2/car.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.construction", img: require("../../assets2/construction.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.school_hotel", img: require("../../assets2/school.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.lrd", img: require("../../assets2/settings.png"), screen: "LoanFormScreen" },
];

/* ---------- COMPONENT ---------- */

export default function LoanFinanceSection({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* CARD */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("Loan & Finance")}</Text>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>{t("view_all")}</Text>
          </TouchableOpacity>
        </View>

        {/* FIRST 4 */}
        <View style={styles.row}>
          {loanAndFinanceItems.slice(0, 4).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => //navigation.navigate(item.screen)
               Alert.alert("Coming Soon")  
              }
            >
              <Image source={item.img} style={styles.icon} />
              <Text style={styles.itemText}>{t(item.nameKey)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>{t("loan_title")}</Text>

                <ScrollView contentContainerStyle={styles.modalGrid}>
                  {loanAndFinanceItems.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.modalItem}
                      onPress={() => {
                        setModalVisible(false);
                        //navigation.navigate(item.screen);
                         Alert.alert("Coming Soon");
                      }}
                    >
                      <Image source={item.img} style={styles.modalIcon} />
                      <Text style={styles.modalItemText}>
                        {t(item.nameKey)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>{t("close")}</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

/* ---------- STYLES ---------- */

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      padding: 9,
      borderRadius: 10,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 7,
    },

    headerTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },

    viewAllButton: {
      borderWidth: 1,
      borderColor: colors.primary,
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 20,
    },

    viewAllText: {
      fontSize: 11,
      color: colors.primary,
      fontWeight: "700",
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    item: {
      alignItems: "center",
      width: 80,
    },

    icon: {
      width: 28,
      height: 30,
      resizeMode: "contain",
      marginBottom: 5,
    },

    itemText: {
      fontSize: 11,
      fontWeight: "bold",
      textAlign: "center",
      color: colors.text,
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },

    modalCard: {
      width: "80%",
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 10,
    },

    modalTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
      color: colors.text,
    },

    modalGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },

    modalItem: {
      alignItems: "center",
      width: 80,
      marginBottom: 10,
    },

    modalIcon: {
      width: 30,
      height: 30,
      resizeMode: "contain",
      marginBottom: 5,
    },

    modalItemText: {
      fontSize: 12,
      fontWeight: "bold",
      textAlign: "center",
      color: colors.text,
    },

    closeButton: {
      marginTop: 10,
      backgroundColor: colors.primary,
      padding: 8,
      borderRadius: 5,
      alignItems: "center",
    },

    closeText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });
