import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Linking } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { useNavigation } from "@react-navigation/native";

const NewPaymentScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  // Fetch Contacts
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  // Dial a number
  const dialNumber = () => {
    if (phoneNumber.trim().length < 10) {
      Alert.alert("Invalid Number", "Please enter a valid phone number");
      return;
    }
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // Open chat screen
  const openChat = (contact) => {
    navigation.navigate("ChatScreen", { contact });
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.heading}>Enter a Mobile Number or Name</Text>

      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        maxLength={10}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* Dial Button */}
      <TouchableOpacity style={styles.dialButton} onPress={dialNumber}>
        <FontAwesome name="phone" size={24} color="white" />
        <Text style={styles.buttonText}> Dial</Text>
      </TouchableOpacity>

      {/* Contact List */}
      <Text style={styles.subHeading}>Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          item.phoneNumbers ? (
            <TouchableOpacity style={styles.contactItem} onPress={() => openChat(item)}>
              <AntDesign name="user" size={24} color="#6a0dad" />
              <Text style={styles.contactText}>{item.name}</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

export default NewPaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  dialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6a0dad",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  subHeading: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 5,
    borderRadius: 8,
    elevation: 2,
  },
  contactText: { fontSize: 16, marginLeft: 10 },
});