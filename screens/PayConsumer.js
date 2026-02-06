import React, { useState ,useContext} from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../theme/Theme';
const PayConsumer = ({ route, navigation }) => {
  const { name, logo, subdivision } = route.params || {};
  const [visible, setVisible] = useState(false);
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {/* Provider & Subdivision Info Card */}
      <View style={styles.card}>
        {logo && (
          <Image
            source={typeof logo === 'string' ? { uri: logo } : logo}
            style={styles.logo}
          />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name || 'Consumer Screen'}</Text>
          {subdivision && (
            <Text style={styles.subdivision}>
              {subdivision.name} ({subdivision.code})
            </Text>
          )}
        </View>
      </View>

      {/* Consumer Number Input Field */}
      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Consumer Number"
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={styles.sampleText}>View Sample Bill</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.helperText}>Please enter your 12-digit Consumer Number</Text>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity 
        style={styles.proceedButton} 
      >
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>  

      {/* Modal for Image Viewing with Zoom Support */}
      <Modal visible={visible} transparent={true} onRequestClose={() => setVisible(false)}>
        <ImageViewer
          imageUrls={[{ url: 'https://www.adanielectricity.com/-/media/Project/ElectricityNew/knowYourBill/Know-Your-Bill.png' }]}
          enableSwipeDown={true}
          onSwipeDown={() => setVisible(false)}
        />
      </Modal>
    </View>
  );
};
export default PayConsumer;
const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: "center",
      backgroundColor: colors.background,
    },

    card: {
      flexDirection: "row",
      backgroundColor: colors.card,
      padding: 18,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      width: "100%",
      gap: 15,
      elevation: 5,
      marginTop: 50,
      marginBottom: 25,
      shadowOffset: { width: 0, height: 5 },
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },

    logo: {
      width: 60,
      height: 60,
      resizeMode: "contain",
    },

    infoContainer: {
      flex: 1,
    },

    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      flexShrink: 1,
    },

    subdivision: {
      fontSize: 14,
      color: colors.subtext,
      marginTop: 25,
    },

    inputContainer: {
      width: "100%",
      marginBottom: 25,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 12,
      backgroundColor: colors.card,
      height: 50,
      shadowOffset: { width: 0, height: 2 },
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },

    input: {
      flex: 1,
      fontSize: 18,
      paddingVertical: 8,
      color: colors.text,
      marginRight: 10,
    },

    sampleText: {
      color: colors.accent,
      fontSize: 16,
      fontWeight: "bold",
    },

    helperText: {
      marginTop: 8,
      fontSize: 14,
      color: colors.subtext,
    },

    proceedButton: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 30,
      width: "100%",
      alignItems: "center",
      marginTop: 320,
      shadowOffset: { width: 0, height: 5 },
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },

    proceedText: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.accentText,
    },
  });
