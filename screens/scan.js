import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // for QR icon (optional)
const { width } = Dimensions.get("window");

export default function Scan() {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState("back");
  const [torchOn, setTorchOn] = useState(false);
  const [scanned, setScanned] = useState(false);
  const laserAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    animateLaser();
  }, []);

  const animateLaser = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(laserAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(laserAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Scanned QR Code: ${data}`);

    setTimeout(() => {
      setScanned(false);
    }, 3000);
    navigation.navigate("PaymentqrScreen", { scannedData: data });
        //Alert.alert("Sucess","Coming Soon......");
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  const laserTranslateY = laserAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.3, width * 0.3],
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.goBack()}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </Pressable>

      <CameraView
        style={styles.camera}
        facing={cameraType}
        flashMode={torchOn ? "torch" : "off"}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        <TouchableOpacity
          style={styles.myQRButton}
          onPress={() => navigation.navigate("QRcode")}
        >
          <Ionicons name="qr-code-outline" size={24} color="white" />
          <Text style={styles.myQRText}>My QR</Text>
        </TouchableOpacity>

        <View style={styles.overlay}>
          <View style={styles.scannerBox}>
            <Animated.View
              style={[
                styles.laser,
                { transform: [{ translateY: laserTranslateY }] },
              ]}
            />
          </View>

          <Text style={styles.instruction}>Align QR Code within frame</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scannerBox: {
    width: width * 0.7,
    height: width * 0.7,
    borderWidth: 2,
    borderColor: "#00FF00",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  instruction: {
    color: "white",
    marginTop: 30,
    fontSize: 18,
    fontWeight: "600",
  },
  buttonContainer: {
    position: "absolute",
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: "row",
    gap: 20,
    top: 630,
    right: 10,
   
   
  },
  button: {
    backgroundColor: "#00000080",
    borderRadius: 20,
    paddingHorizontal: 49,
    paddingVertical: 16,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  laser: {
    height: 2,
    width: "100%",
    backgroundColor: "red",
    position: "absolute",
    top: 0,
  },
  myQRButton: {
    position: "absolute",
    top: 570,
    right: 40,
    backgroundColor: "#00000070",
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  myQRText: {
    color: "white",
    marginLeft: 5,
    fontSize: 16,
  },
});