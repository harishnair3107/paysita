import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert
} from "react-native";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/Theme";

const travelOptions = [
  {
    nameKey: "travels.flight",
    image: require("../../assets2/airplane-ticket.png"),
    screen: "Tours-travelForm",
  },
  {
    nameKey: "travels.hotel",
    image: require("../../assets2/hotel.png"),
    screen: "Tours-travelForm",
  },
  {
    nameKey: "travels.packages",
    image: require("../../assets2/beach.png"),
    screen: "PackagesStack",
  },
  {
    nameKey: "travels.bus",
    image: require("../../assets2/bus.png"),
    screen: "Tours-travelForm",
  },
];

export default function TravelSection({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  const [travelModalVisible, setTravelModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t("tours_travels")}
        </Text>

        <TouchableOpacity
          onPress={() => setTravelModalVisible(true)}
          style={styles.viewAllButton}
        >
          <Text style={styles.viewAllText}>
            {t("view_all")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* QUICK OPTIONS */}
      <View style={styles.row}>
        {travelOptions.slice(0, 4).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => //navigation.navigate(item.screen)
               {Alert.alert("Coming Soon");}  
            }
          >
            <Image source={item.image} style={styles.icon} />
            <Text style={styles.itemText}>
              {t(item.nameKey)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* MODAL */}
      <Modal visible={travelModalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setTravelModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>
                  {t("travel_title")}
                </Text>

                <ScrollView>
                  <View style={styles.modalGrid}>
                    {travelOptions.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.modalItem}
                        onPress={() => {
                          setTravelModalVisible(false);
                          //navigation.navigate(item.screen);
                           Alert.alert("Coming Soon");
                        }}
                      >
                        <Image
                          source={item.image}
                          style={styles.modalIcon}
                        />
                        <Text style={styles.modalItemText}>
                          {t(item.nameKey)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>

                <TouchableOpacity
                  onPress={() => setTravelModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>
                    {t("close")}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

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
      color: colors.primary,
      fontWeight: "600",
      fontSize: 11,
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },

    item: {
      alignItems: "center",
      width: 80,
    },

    icon: {
      width: 40,
      height: 40,
      resizeMode: "contain",
    },

    itemText: {
      fontSize: 11,
      color: colors.text,
      textAlign: "center",
      fontWeight: "bold",
      marginTop: 2,
    },

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

    modalIcon: {
      width: 30,
      height: 30,
      resizeMode: "contain",
    },

    modalItemText: {
      fontSize: 12,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 5,
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
