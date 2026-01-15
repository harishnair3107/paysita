import React, { useContext, useEffect } from "react";
import { View, ScrollView,Linking} from "react-native";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/userContext";
import i18n from "../../src/i18n/i18n";
import HeaderSection from "./HeaderSection";
import SliderSection from "./SliderSection";
import TransferSection from "./TransferSection";
import ServicesSection from "./ServicesSection";
import InsuranceSection from "./InsuranceSection";
import TravelSection from "./TravelSection";
import LoanFinanceSection from "./LoanFinanceSection";
import SponsorsSection from "./SponsorsSection";
import UPISection from "./UPISection";
import { requireBiometric } from "../../src/utils/userBiometric";
import Navbar from "../../component/Navbar";
import TourSliderSection from "./TourSliderSection";
import { ThemeContext } from "../../theme/Theme";
import { Ionicons } from "@expo/vector-icons";

export default function MainScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const { colors } = useContext(ThemeContext);
  const { t } = useTranslation();
  const mobile=user?.mobileNumber;
  const initials =
    typeof mobile === "string"
      ? user.mobileNumber.slice(-2)
      : "U";
  

  const sponsors = [
    {
      name: t("ludo"),
      image: require("../../assets/ludo.jpeg"),
    },
    {
      name: t("rummycircle"),
      image: require("../../assets/rummycircle.png"),
    },
    {
      name: t("poker"),
      image: require("../../assets/poker.jpeg"),
    },
    {
      name: t("teenpatti"),
      image: require("../../assets/teenpatti.jpeg"),
    },
  ];

  function openWhatsApp ()  {
  const phoneNumber = "9167636706"; // Replace with actual number
  const message = "Hello! I need job."; // Custom message
  const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "WhatsApp is not installed on your device.");
      }
    })
    .catch((err) => console.error("An error occurred", err));
};
  
  

  
 

  useEffect(()=>{
      requireBiometric();
  },[])

  return (
    <View style={{ flex: 1 ,backgroundColor:colors.background}}>
      <ScrollView>
        <HeaderSection
          initials={initials}
          onDrawer={() => navigation.navigate("Drawer")}
        />

        <SliderSection />
        <TransferSection navigation={navigation} />
        <UPISection openWhatsApp={openWhatsApp} navigation={navigation}/>
        <ServicesSection navigation={navigation} />
        <InsuranceSection  navigation={navigation} />
        <TravelSection navigation={navigation}  />
        <TourSliderSection/>
        <LoanFinanceSection  navigation={navigation} />
        <SponsorsSection sponsors={sponsors}/>
      </ScrollView>
      
      <Navbar/>
    </View>
  );
}
