import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../../theme/Theme";

export default function UPISection({openWhatsApp,navigation}) {
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[colors.card, colors.background]}
        style={styles.card}
      >
        {/* LEFT CTA */}
        <TouchableOpacity
          style={styles.ctaBox}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("WantToHire")
             //{Alert.alert("Coming Soon")}
          }
        >
          <Text style={styles.ctaTitle}>I want to</Text>
          <Text style={styles.ctaHighlight}>Hire</Text>
          <Text style={styles.ctaSub}>
            Find skilled people faster
          </Text>
        </TouchableOpacity>

        {/* CENTER IMAGE */}
        <View style={styles.imageWrapper}>
          <Image
            source={require("../../assets/hiring.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* RIGHT CTA */}
        <TouchableOpacity
          style={[styles.ctaBox, styles.ctaRight]}
          activeOpacity={0.85}
          onPress={() => openWhatsApp()
           //{Alert.alert("Coming Soon")}  
          }
        >
          <Text style={styles.ctaTitle}>I want a</Text>
          <Text style={styles.ctaHighlight}>Job</Text>
          <Text style={styles.ctaSub}>
            Explore hiring opportunities
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
const createStyles = (colors) =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: 12,
      marginVertical: 14,
      
    },

    card: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 22,
      padding: 16,
      elevation: 6,
    },

    ctaBox: {
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 10,
      borderRadius: 18,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },

    ctaRight: {
      backgroundColor: colors.primary + "22", // subtle highlight
    },

    ctaTitle: {
      fontSize: 13,
      color: colors.text,
      opacity: 0.85,
    },

    ctaHighlight: {
      fontSize: 22,
      fontWeight: "800",
      color: colors.primary,
      marginVertical: 2,
    },

    ctaSub: {
      fontSize: 11,
      textAlign: "center",
      color: colors.text,
      opacity: 0.65,
      marginTop: 4,
    },

    imageWrapper: {
      width: 90,
      height: 90,
      marginHorizontal: 12,
      borderRadius: 45,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
      elevation: 4,
    },

    image: {
      width: "80%",
      height: "80%",
    },
  });
