import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/Theme";

export default function SponsorsSection({ sponsors }) {
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t("sponsors")}
      </Text>

      <View style={styles.grid}>
        {sponsors.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
          >
            <Image
              source={item.image}
              style={styles.logo}
            />
            <Text style={styles.name}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card, // 👈 dark/light safe
      marginBottom: 20,
      marginTop: 10,
      borderRadius: 10,
      paddingBottom: 10,
    },

    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 30,
      paddingHorizontal: 10,
      marginTop: 20,
      color: colors.text,
    },

    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },

    item: {
      width: "20%",
      alignItems: "center",
      marginBottom: 15,
    },

    logo: {
      width: 45,
      height: 45,
      resizeMode: "contain",
      borderRadius: 30,
      backgroundColor: colors.background, // subtle contrast
    },

    name: {
      fontSize: 12,
      marginTop: 5,
      textAlign: "center",
      color: colors.text,
    },
  });
