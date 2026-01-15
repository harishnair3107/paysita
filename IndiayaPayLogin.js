import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  ActivityIndicator,
  Image,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


import { useNavigation } from "@react-navigation/native";


export default function IndiayaPayLogin() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // ✅ ADDED
  const [showCountryPicker, setShowCountryPicker] = useState(false); // ✅ ADDED

  const [showSplash, setShowSplash] = useState(true);
  const navigation = useNavigation();

  const splashScale = useRef(new Animated.Value(1)).current;
  const splashOpacity = useRef(new Animated.Value(1)).current;

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;


  // ✅ ADDED
  const countryCodes = [
    { code: "+91", label: "🇮🇳 India" },
    { code: "+1", label: "🇺🇸 USA" },
    { code: "+44", label: "🇬🇧 UK" },
    { code: "+61", label: "🇦🇺 Australia" },
    { code: "+971", label: "🇦🇪 UAE" },
    { code: "+65", label: "🇸🇬 Singapore" },
  ];

  

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.spring(splashScale, {
          toValue: 1.1,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(splashScale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    const timer = setTimeout(() => {
      pulse.stop();
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);
      });
    }, 2000);

    return () => {
      pulse.stop();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (showSplash) return;

    const checkUserLogin = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);

          if (parsedUser.token) {
            navigation.replace("MainScreen", {
              mobileNumber: parsedUser.mobileNumber,
            });
            authenticate();
          }
        }
      } catch (e) {}
    };

    checkUserLogin();

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [showSplash]);

  const isValid = mobileNumber.length === 10;

  const handleContinue = async () => {
    if (!isValid) return;
    
    navigation.navigate("OTP-Verification", {
                countryCode:countryCode,
                mobileNumber: mobileNumber, // ✅ UPDATED
              });
   
  };

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Animated.View
          style={{
            opacity: splashOpacity,
            transform: [{ scale: splashScale }],
            alignItems: "center",
          }}
        >
          <View style={styles.splashLogo}>
            <Image
            source={require("./assets/PaySita.png")} // adjust path if needed
            style={styles.logo}
            resizeMode="contain"
          />
          </View>
          <Text style={styles.splashText}>PaySita</Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View
          style={[styles.content, { opacity, transform: [{ scale }] }]}
        >
          <View style={styles.header}> 
            <View style={styles.leftHeader}> 
              <View style={styles.logoRow}>
                <Text style={styles.payText}>Pay</Text>
                <Text style={styles.sitaText}>Sita</Text>
              </View>
               {/* <Image
            source={require("./assets/PaySita.png")} // adjust path if needed
            style={styles.logo}
            resizeMode="contain"
          /> */}

                {/* <Text style={styles.logoText}>PaySita</Text>  */}
                </View> 
                <View style={styles.rightHeader}> 
                  <TouchableOpacity>
                     <Text style={styles.headerAction}>English</Text> 
                  </TouchableOpacity> 
                  <TouchableOpacity onPress={() => Alert.alert("Sucess","Coming soon ...")} > 
                    <Text style={styles.headerAction}>Skip</Text> 
                  </TouchableOpacity> 
                  </View> 
                  </View>

          <View style={styles.inputContainer}>
            {/* ✅ COUNTRY CODE + INPUT */}
            <View style={styles.phoneRow}>
              <TouchableOpacity
                style={styles.countryCodeBox}
                onPress={() => setShowCountryPicker(!showCountryPicker)}
              >
                <Text style={styles.countryCodeText}>{countryCode}</Text>
                <Ionicons name="chevron-down" size={14} color="#64748B" />
              </TouchableOpacity>

              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Mobile Number"
                placeholderTextColor="#9CA3AF"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>

            {showCountryPicker && (
              <View style={styles.countryPicker}>
                {countryCodes.map((item) => (
                  <TouchableOpacity
                    key={item.code}
                    style={styles.countryItem}
                    onPress={() => {
                      setCountryCode(item.code);
                      setShowCountryPicker(false);
                    }}
                  >
                    <Text style={styles.countryItemText}>
                      {item.label} ({item.code})
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.helpLinkText}>Need help?</Text>
          </View>

          <Text style={styles.subtitle}>
            Enter your mobile number to log in or create an account
          </Text>

          <View style={styles.bottomSection}>
    
            <View style={styles.securityNotice}>
              <Ionicons name="lock-closed" size={16} color="#6B7280" />
              <Text style={styles.securityText}>
                Your data is encrypted and secure. We'll never share your information.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              disabled={!isValid}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            <Text style={styles.copyright}>
              © 2024 PaySita. All rights reserved.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },

  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 32, }, 
  leftHeader: { flexDirection: "row", alignItems: "center", }, 
  rightHeader: { flexDirection: "row", alignItems: "center", gap: 20, }, 
  headerAction: { fontSize: 14, fontWeight: "600", color: "#2563EB", }, 
  logoContainer: { backgroundColor: "#fff", borderRadius: 10, padding: 8, marginRight: 8, }, 
  logoText: { fontSize: 20, fontWeight: "700", color: "#0F172A", },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: -12,
  },

  inputContainer: {
    marginBottom: 24,
  },

  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
  },

  phoneRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  countryCodeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#F8FAFC",
  },

  countryCodeText: {
    fontSize: 14,
    fontWeight: "600",
  },

  countryPicker: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },

  countryItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  logo: {
  width: 80,
  height: 80,
},
 logoLogin: {
  width: 40,
  height: 40,
},


  countryItemText: {
    fontSize: 14,
  },

  continueButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  bottomSection: {
    marginTop: "auto",
    paddingTop: 20,
  },

  helpLinkText: {
    color: "#2563EB",
    marginTop: 12,
    fontWeight: "600",
  },
  logoRow: {
  flexDirection: "row",
  alignItems: "center",
},

payText: {
  fontSize: 30,
  fontWeight: "900",
  color: "#0B3CDE", 
  letterSpacing: -1,
  textShadowColor: "rgba(0,0,0,0.15)",
  textShadowOffset: { width: 0, height: 4 },
  textShadowRadius: 6,

},

sitaText: {
  fontSize: 30,
  fontWeight: "900",
  color: "#F97316", 
  letterSpacing: -1,
  marginLeft: -4, 
  textShadowColor: "rgba(0,0,0,0.15)",
  textShadowOffset: { width: 0, height: 4 },
  textShadowRadius: 6,

},


  copyright: {
    fontSize: 12,
    textAlign: "center",
    color: "#94A3B8",
  },

  splashContainer: {
    flex: 1,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  splashLogo: {
    backgroundColor: "#1E40AF",
    padding: 28,
    borderRadius: 70,
    marginBottom: 12,
  },

  splashText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  securityNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  securityText: {
    fontSize: 12,
    color: "#475569",
    marginLeft: 8,
    flex: 1,
  },
  brandText: {
  fontSize: 42,
  fontWeight: "800",
  color: "#FFFFFF",
  letterSpacing: 1,
},

brandAccent: {
  color: "#FDBA74", 
},


});
