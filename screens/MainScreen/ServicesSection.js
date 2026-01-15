import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/Theme";

const SERVICES = [
  { key: "mobile_recharge", image: require("../../assets2/mobileRecharge.png") },
  { key: "electricity_bill", image: require("../../assets2/electricity-bill.png") },
  { key: "dth_recharge", image: require("../../assets2/smart-tv.png") },
  { key: "credit_card_payment", image: require("../../assets2/atm-card.png") },
  // { key: "piped_gas", image: require("../../assets/gas.png") }, 
  // // { key: "wifi_recharge", image: require("./assets/wifi.png") }, 
  // // { key: "loan_payment", image: require("../../assets/Rent.png") },
];

const serviceNavigationMap = {
  mobile_recharge: "MobileStack",
  electricity_bill: "PayStack",
  dth_recharge: "DTHStack",
  credit_card_payment: "CCStack",
};

export default function ServicesSection({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {t("home.recharge_pay_bills")}
          </Text>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>
              {t("view_all")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Services Grid */}
        <View style={styles.serviceRow}>
          {SERVICES.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.serviceItem}
              onPress={() =>
                //navigation.navigate(serviceNavigationMap[item.key])
                 Alert.alert("Coming Soon")
              }
            >
              <View style={styles.imageWrapper}>
                <Image
                  source={item.image}
                  style={styles.serviceImage}
                />
              </View>

              <Text style={styles.serviceText}>
                {t(`service.${item.key}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>
                  {t("home.recharge_pay_bills")}
                </Text>

                <ScrollView>
                  <View style={styles.modalGrid}>
                    {SERVICES.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.modalItem}
                        onPress={() => {
                          setModalVisible(false);
                          //navigation.navigate()
                           Alert.alert("Coming Soon");
                        }}
                      >
                        <View style={styles.imageWrapper}>
                          <Image
                            source={item.image}
                            style={styles.modalImage}
                          />
                        </View>

                        <Text style={styles.modalText}>
                          {t(`service.${item.key}`)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

/* -------------------- STYLES -------------------- */
const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      padding: 9,
      borderRadius: 10,
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: 10,
      padding: 12,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },

    headerText: {
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
      color: colors.primary,
      fontWeight: "600",
      fontSize: 11,
    },

    serviceRow: {
      flexDirection: "row",
      justifyContent: "space-around",
    },

    serviceItem: {
      alignItems: "center",
      width: 80,
    },

    imageWrapper: {
      backgroundColor: colors.background,
      padding: 10,
      borderRadius: 14,
    },

    serviceImage: {
      width: 40,
      height: 40,
      resizeMode: "contain",
      
    },

    serviceText: {
      marginTop: 6,
      fontSize: 12,
      fontWeight: "600",
      color: colors.text,
      textAlign: "center",
    },

    /* -------- MODAL -------- */

    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
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
      textAlign: "center",
      marginBottom: 10,
      color: colors.text,
    },

    modalGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },

    modalItem: {
      alignItems: "center",
      width: 100,
      marginBottom: 15,
    },

    modalImage: {
      width: 28,
      height: 28,
      resizeMode: "contain",
    },

    modalText: {
      marginTop: 5,
      fontSize: 12,
      fontWeight: "600",
      color: colors.text,
      textAlign: "center",
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
