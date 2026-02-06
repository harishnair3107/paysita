import { useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../theme/Theme";
import { Ionicons } from "@expo/vector-icons"

const transfer = [
  {
    key: "home.to_mobile",
    image: require("../../assets2/mobileNumber.png"),
    screen: "MoneyStack",
  },
  {
    key: "home.to_bank",
    image: require("../../assets2/toBank.png"),
    screen: "BankStack",
  },
  {
    key: "home.to_self",
    image: require("../../assets2/ownAccount.png"),
    screen: "SelfStack",
  },
];

export default function TransferSection() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.transferSection}>
      <Text style={styles.transferTitle}>
        {t("home.transfer_money")}
      </Text>

      {/* -------- TRANSFER BUTTONS -------- */}
      <View style={styles.transferButtons}>
        {transfer.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.serviceItems}
            onPress={() => navigation.navigate(item.screen)
                   
            }
          >
            <View style={styles.imageWrapper}>
              <Image
                source={item.image}
                style={styles.serviceImage}
              />
            </View>

            <Text style={styles.serviceText}>
              {t(item.key)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* -------- UPI + DEALS -------- */}
      <View style={styles.upiContainer}>
        <Text
          style={styles.upiText}
          onPress={() => navigation.navigate("QRcode")
             //{Alert.alert("Coming Soon")}  
          }
        >
          UPI ID: 123456789@xyz
        </Text>

        <TouchableOpacity
          style={styles.headerContainer}
          onPress={() => navigation.navigate("DealsRewards")
             //{Alert.alert("Coming Soon");}  
          }
        >
          <Animated.View
            style={[
              styles.iconWrapper,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
           <Ionicons name="gift-outline" size={20} color="#fff" />
          </Animated.View>

          <Text style={styles.headerTitle}>
            {t("home.deals_rewards")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* -------------------- STYLES -------------------- */
const createStyles = (colors) =>
  StyleSheet.create({
    transferSection: {
      backgroundColor: colors.background,
      padding: 19,
      marginTop: 2,
      borderRadius: 10,
    },

    transferTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 15,
      color: colors.text,
    },

    transferButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    serviceItems: {
      alignItems: "center",
      width: 80,
    },

    imageWrapper: {
      backgroundColor: colors.card,
      padding: 10,
      borderRadius: 14,
      marginBottom: 4,
    },

    serviceImage: {
      width: 40,     // ✅ suitable size
      height: 40,
      resizeMode: "contain",
    },

    serviceText: {
      fontSize: 11,
      color: colors.text,
      textAlign: "center",
      fontWeight: "bold",
    },

    upiContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    },

    iconWrapper: {
      marginRight: 9,
      backgroundColor: colors.primary,
      padding: 6,
      borderRadius: 50,
    },

    giftIcon: {
      fontSize: 16,
      color: "#fff",
    },

    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 11,
    },

    headerTitle: {
      fontSize: 14,
      color: colors.text,
    },

    upiText: {
      fontSize: 12,
      color: colors.primary,
      borderWidth: 2,
      borderColor: colors.border,
      paddingVertical: 4,
      paddingHorizontal: 15,
      borderRadius: 10,
    },
  });
