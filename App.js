import React, { useEffect, useState, useRef } from "react";
import './src/i18n/i18n';
import { useTranslation } from 'react-i18next';
import {I18nextProvider} from 'react-i18next';

import i18n from './src/i18n/i18n';
// import axios from "axios";
import { Ionicons } from "@expo/vector-icons"; // or 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import Navbar from "./component/Navbar";
import Service from "./screens/Service";   
import SearchScreen from "./screens/SearchScreen"; 
import MovieSetupScreen from "./screens/MovieSetupScreen";   
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPVerification from "./OTP-Verification"; // OTP Verification
import IndiayaPayLogin from "./IndiayaPayLogin";
// Import Screens
import index from "./screens/app/index"; // Import index.js from the app folder
import TransferMoney from "./screens/TransferMoney"; //
import PaymentScreen from "./screens/PaymentScreen";
import NewPaymentScreen from "./screens/NewPaymentScreen";
import dthplan from "./screens/dthplan"; //
import successdth from "./screens/successdth";
import CashbackAndRefferal from "./screens/CashbackAndRefferal";
import DealsRewardsScreen from "./screens/DealsRewardsScreen";
import SplitExpenseScreen from "./screens/SplitExpenseScreen";
import VoiceCallScreen from "./screens/VoiceCallScreen";
import VideoCallScreen from "./screens/VideoCallScreen";
import ChatScreen from "./screens/ChatScreen";
import Flight1 from "./screens/FlightSearch";
import Flight2 from "./screens/flight2";
// import Scan from "./screens/scan";
import BankUPISelectionScreen from "./screens/BankUPISelectionScreen";
import UPILinkScreen from "./screens/UPILinkScreen";
import SelfAccountScreen from "./screens/SelfAccountScreen";
import TransferScreen from "./screens/TransferScreen";
import CheckBalanceScreen from "./screens/CheckBalanceScreen";
import MobileRecharge from "./screens/MobileRecharge";
import SuccessScreen from "./screens/SuccessScreen";
import MobileDetailsScreen from "./screens/MobileDetailsScreen";
import PipedGasList from "./screens/PipedGasList";
import PipedGasDetailsScreen from "./screens/PipedGasDetailsScreen"; // your detail screen
import OtherServicesFormScreen from "./screens/OtherServicesFormScreen"; // your detail screen
import LoanFormScreen from "./screens/LoanFormScreen";
import ViewPlans from "./screens/ViewPlans";
import LoanDetailsScreen from "./screens/LoanDetailsScreen";
import TourAndTravelsFormScreen from "./screens/TourAndTravelsFormScreen";
import LoanRepayment from "./screens/LoanRepayment";
import Paybill from "./screens/Paybill";
import PaySubdivision from "./screens/PaySubdivision";
import PayConsumer from "./screens/PayConsumer";
import DTHrecharge from "./screens/DTHrecharge";
import BroadBandList from "./screens/BroadBandList";
import BroadBandDetailsScreen from "./screens/BroadBandDetailsScreen";
import DthDetailsScreen from "./screens/DthDetailsScreen";
import CC_repayment from "./screens/CC_repayment";
import CC_DetailsScreen from "./screens/CC_DetailsScreen";
import ITRScreen from "./screens/ITRScreen";
import GSTFormScreen from "./screens/GSTFormScreen";
import DonationAndCharityFormScreen from "./screens/DonationAndCharityFormScreen";
import HealthInsuranceFormScreen from "./screens/HealthInsuranceFormScreen";
import GeneralInsuranceFormScreen from "./screens/GeneralInsuranceFormScreen";
import RealEstateFormScreen from "./screens/RealEstateFormScreen";
import InvestmentFormScreen from "./screens/InvestmentFormScreen";
import EducationalFormScreen from "./screens/EducationalFormScreen";
import HomeServiceFormScreen from "./screens/HomeServiceFormScreen";
import History from "./screens/app/history"; // Custom Drawer
import Upimangement from "./screens/app/upimangement"; // Custom Drawer
import transaction from "./screens/app/transaction"; // Create this file
import referalhistory from "./screens/app/referalhistory"; // Create this file
import ChangeLanguage from "./screens/app/ChangeLanguage"; // Import your screen
import Security from "./screens/app/Security";
import profile from "./screens/app/profile";
import SetNewPasscode from "./screens/app/SetNewPasscode";
import SetupPasscode from "./screens/app/SetupPasscode";
import Permisions from "./screens/app/Permisions";
import ChangePassword from "./screens/app/ChangePassword";
import HelpAndSupport from "./screens/app/helpandsupport";
import CoinsEarned from "./screens/app/CoinsEarned";
import ManageNotification from "./screens/app/ManageNotification";
import AccountSecurityTips from "./screens/app/AccountSecurityTips";
import AdditionalDetails from "./screens/app/AdditionalDetails";
import FinancialDetails from "./screens/app/FinancialDetails";
import Addaddress from "./screens/app/Addaddress";
import ManageUPIid from "./screens/app/ManageUPIid";
import UPILite from "./screens/app/UPILite";
import QRcode from "./screens/app/QRcode";
import changeupipin from "./screens/app/changeupipin";
import changeupipins from "./screens/changeupipins";
import currentBank from "./screens/app/currentBank";
import addbankaccount from "./screens/app/addbankaccount";
import addcreditline from "./screens/app/addcreditline";
import addrupaycc from "./screens/app/addrupaycc";
import AboutUs from "./screens/app/AboutUs";
import WantToHire from "./screens/WantToHire";
import cashbackhistory from "./screens/app/cashbackhistory";
import ccpaybill from "./screens/ccpaybill";
import success from "./screens/success";
import PackageCard from "./screens/PackageCard";
import PackageDetails from "./screens/PackageDetails";
import PaymentqrScreen from "./screens/PaymentqrScreen";
import MovieBookingScreen from "./screens/MovieBookingScreen";
import BookingSummaryScreen from "./screens/BookingSummaryScreen";
import PrivacyPolicyScreen from './screens/app/PrivacyPolicyScreen';
import TermsScreen from './screens/app/TermsScreen';
import GrievanceScreen from './screens/app/GrievanceScreen';
import AboutAppScreen from './screens/app/AboutAppScreen';
import styles from "./styles"; // Import the styles
import {
  Feather,
} from "@expo/vector-icons";
// import { StatusBar } from "expo-status-bar";
import Drawer from "./screens/app/Drawer"; // Custom Drawer
import {
  TouchableWithoutFeedback, //in this it will allow to click anywhere outside the
  View,
  Linking,
  Easing,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Dimensions,
  Animated,
  Button,
  Alert,
  Pressable,
  FlatList,
} from "react-native";
import Scan from "./screens/scan";
import MovieSeatSelectionScreen from "./screens/MovieSeat";
const { width } = Dimensions.get("window");
const Stack = createStackNavigator();
// **Stack Navigator for Different Features**
const BankStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="BankSelection"
      component={BankUPISelectionScreen}
      options={{ title: "Select Bank" }}
    />
    <Stack.Screen name="CheckBalanceScreen" component={CheckBalanceScreen} />
    <Stack.Screen
      name="UPILinkScreen"
      component={UPILinkScreen}
      options={{ title: "Link UPI ID" }}
    />
  </Stack.Navigator>
);
const openWhatsApp = () => {
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
const MobileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="MobileRecharge" component={MobileRecharge} />
<Stack.Screen name="MobileDetailsScreen" component={MobileDetailsScreen} />
    <Stack.Screen name="ViewPlans" component={ViewPlans} />
    <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
  </Stack.Navigator>
);
const GasStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="PipedGasList" component={PipedGasList} />
    <Stack.Screen
      name="PipedGasDetailsScreen"
      component={PipedGasDetailsScreen}
    />
  </Stack.Navigator>
);
const WifiStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="BroadBandList" component={BroadBandList} />
    <Stack.Screen
      name="BroadBandDetailsScreen"
      component={BroadBandDetailsScreen}
    />
  </Stack.Navigator>
);
const SelfStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="SelfAccountScreen" component={SelfAccountScreen} />
    <Stack.Screen name="TransferScreen" component={TransferScreen} />
  </Stack.Navigator>
);
const ScanStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="scan" component={Scan} />
    <Stack.Screen name="PaymentqrScreen" component={PaymentqrScreen} />
  </Stack.Navigator>
);
// const CheckStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: true }}>
//      <Stack.Screen name="CheckBalanceScreen" component={CheckBalanceScreen} />
//   </Stack.Navigator>
// );
const HealthInsuranceFormStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="HealthInsuranceFormScreen"
      component={HealthInsuranceFormScreen}
    />
  </Stack.Navigator>
);
const InvestmentFormStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="InvestmentFormScreen"
      component={InvestmentFormScreen}
    />
  </Stack.Navigator>
);
const LoanFormStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="LoanFormScreen" component={LoanFormScreen} />
  </Stack.Navigator>
);
const TTFormStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="flight1" component={Flight1} />
    <Stack.Screen name="flight2" component={Flight2} />
  </Stack.Navigator>
);
const HotelStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="TourAndTravelsFormScreen"
      component={TourAndTravelsFormScreen}
    />
  </Stack.Navigator>
);

const PackagesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="PackageCard"
      component={PackageCard}
      options={{ title: "fkfw" }}
    />
    <Stack.Screen
      name="PackageDetails"
      component={PackageDetails}
      options={{ title: "Details" }}
    />
  </Stack.Navigator>
);

const GeneralInsuranceFormStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="GeneralInsuranceFormScreen"
      component={GeneralInsuranceFormScreen}
    />
  </Stack.Navigator>
);
const LoanStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="LoanRepayment" component={LoanRepayment} />
    <Stack.Screen name="LoanDetailsScreen" component={LoanDetailsScreen} />
  </Stack.Navigator>
);
const PayStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Paybill" component={Paybill} />
    <Stack.Screen name="PaySubdivision" component={PaySubdivision} />
    <Stack.Screen name="PayConsumer" component={PayConsumer} />
  </Stack.Navigator>
);

const DTHStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="DTHrecharge" component={DTHrecharge} />
    <Stack.Screen name="dthplan" component={dthplan} />
    <Stack.Screen name="DthDetailsScreen" component={DthDetailsScreen} />
    <Stack.Screen name="successdth" component={successdth} />
  </Stack.Navigator>
);
//All services form
const ITRStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="ITR form" component={ITRScreen} />
  </Stack.Navigator>
);
const GSTStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="GST form" component={GSTFormScreen} />
  </Stack.Navigator>
);
const MovieStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="MovieBookingScreen" component={MovieBookingScreen} />
    <Stack.Screen name="MovieSetupScreen" component={MovieSetupScreen} />
    <Stack.Screen name="MovieSeat" component={MovieSeatSelectionScreen} />
    <Stack.Screen
      name="BookingSummaryScreen"
      component={BookingSummaryScreen}
    />
  </Stack.Navigator>
);

const MoneyStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="TransferMoney" component={TransferMoney} />
    <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    <Stack.Screen name="NewPaymentScreen" component={NewPaymentScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
    <Stack.Screen name="VoiceCallScreen" component={VoiceCallScreen} />
    <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} />
    <Stack.Screen name="SplitExpenseScreen" component={SplitExpenseScreen} />
  </Stack.Navigator>
);
const RealEstateFormStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Real Estate Form" component={RealEstateFormScreen} />
  </Stack.Navigator>
);
const EducationalFormStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Educational Services Form"
      component={EducationalFormScreen}
    />
  </Stack.Navigator>
);
const OtherFormStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="OtherServicesFormScreen"
      component={OtherServicesFormScreen}
    />
  </Stack.Navigator>
);
const DonationFormStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="DonationAndCharityFormScreen"
      component={DonationAndCharityFormScreen}
    />
  </Stack.Navigator>
);
const HomeServiceFormStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Home Services Form" component={HomeServiceFormScreen} />
  </Stack.Navigator>
);

const CCStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="CC_repayment" component={CC_repayment} />
    <Stack.Screen name="CC_DetailsScreen" component={CC_DetailsScreen} />
    <Stack.Screen name="changeupipins" component={changeupipins} />
    <Stack.Screen name="ccpaybill" component={ccpaybill} />
    <Stack.Screen name="success" component={success} />
  </Stack.Navigator>
);
//  main starting
const MainScreen = ({ navigation, route }) => {
  const { name } = route.params;
  const { t } = useTranslation();

const SLIDER_DATA = [
  {
    title: "Budget Day is Almost Here",
    subtitle: "Planning to invest in Open Art by Jan 31? Pay ₹0 brokerage",
  },
  {
    title: "Exclusive Offer for You!",
    subtitle: "Earn cashback on your first investment.",
  },
  {
    title: "Limited Time Investment Plans",
    subtitle: "Get expert insights and plan your portfolio wisely.",
  },
  {
    title: "Exciting Offer for You!",
    subtitle: "Planning to invest in Open Art by Jan 31? Pay ₹0 brokerage",
  },
  {
    title: "leaning Day is Almost Here",
    subtitle: "Planning to invest in Open Art by Jan 31? Pay ₹0 brokerage",
  },
  {
    title: "Budget Day is Almost Here",
    subtitle: "Planning to invest in Open Art by Jan 31? Pay ₹0 brokerage",
  },
  {
    title: "Family Insaurance is Almost Here",
    subtitle: "Planning to invest in Open Art by Jan 31? Pay ₹0 brokerage",
  },
  {
    title: "Investment Offer is Almost Here",
    subtitle: "Planning to invest in Open Art by Jan 31? Pay ₹0 brokerage",
  },
  {
    title: "Travel Offer is Almost Here",
    subtitle: "Planning to invest in Open Art by Jan 31? Pay ₹0 brokerage",
  },
];

const sponsors = [
  {
    name: t("ludo"),
    image: require("./assets/ludo.jpeg"),
  },
  {
    name: t("rummycircle"),
    image: require("./assets/rummycircle.png"),
  },
  {
    name: t("poker"),
    image: require("./assets/poker.jpeg"),
  },
  {
    name: t("teenpatti"),
    image: require("./assets/teenpatti.jpeg"),
  },

];

const services = [
  { key: "mobile_recharge", image: require("./assets/mobile.png") },
  { key: "electricity_bill", image: require("./assets/bulb.png") },
  { key: "dth_recharge", image: require("./assets/dth.png") },
  { key: "credit_card_payment", image: require("./assets/Credit Card.png") },
  { key: "piped_gas", image: require("./assets/gas.png") },
  // { key: "wifi_recharge", image: require("./assets/wifi.png") },
  { key: "loan_payment", image: require("./assets/Rent.png") },
];


const investmentTypes = [
  {
    name: t("sip"),
    image: require("./assets/sip.png"),
    screen: "InvestmentFormScreen",
  },
  {
    name: t("shares"),
    image: require("./assets/shares.png"),
    screen: "InvestmentFormScreen",
  },
  {
    name: t("mutual_funds"),
    image: require("./assets/fd.png"),
    screen: "InvestmentFormScreen",
  },
  {
    name: t("bonds"),
    image: require("./assets/Bonds.png"),
    screen: "InvestmentFormScreen",
  },
  {
    name: t("child_plan"),
    image: require("./assets/childplan.png"),
    screen: "InvestmentFormScreen",
  },
  {
    name: t("pension_plan"),
    image: require("./assets/pensionplan.png"),
    screen: "InvestmentFormScreen",
  },
  {
    name: t("nsc"),
    image: require("./assets/nsc.png"),
    screen: "InvestmentFormScreen",
  },
  {
    name: t("ncd"),
    image: require("./assets/ncd.png"),
    screen: "InvestmentFormScreen",
  },
  {
    name: t("nfo"),
    image: require("./assets/nfd.png"),
    screen: "InvestmentFormScreen",
  },
  {
    name: t("ppf"),
    image: require("./assets/ppf.png"),
    screen: "InvestmentFormScreen",
  },
  {
    name: t("rd"),
    image: require("./assets/rd.png"),
    screen: "InvestmentFormScreen",
  },
  {
    name: t("treasuring_bills"),
    image: require("./assets/bills.png"),
    screen: "InvestmentFormScreen",
  },
];





const insuranceTypes = [
  {
    name: t("term"),
    image: require("./assets/term.png"),
    screen: "GeneralInsuranceFormScreen",
  },
  {
    name: t("health"),
    image: require("./assets/health.png"),
    screen: "HealthInsuranceFormScreen",
  },
  {
    name: t("homes"),
    image: require("./assets/home.png"),
    screen: "GeneralInsuranceFormScreen",
  },
  {
    name: t("car"),
    image: require("./assets/car.png"),
    screen: "GeneralInsuranceFormScreen",
  },
  {
    name: t("bike"),
    image: require("./assets/building.png"),
    screen: "GeneralInsuranceFormScreen",
  },
  {
    name: t("marine"),
    image: require("./assets/marine.png"),
    screen: "GeneralInsuranceFormScreen",
  },
  {
    name: t("machinery"),
    image: require("./assets/machinary.png"),
    screen: "GeneralInsuranceFormScreen",
  },
  {
    name: t("employee_group"),
    image: require("./assets/employee.png"),
    screen: "GeneralInsuranceFormScreen",
  },
  {
    name: t("travel"),
    image: require("./assets/travel.png"),
    screen: "GeneralInsuranceFormScreen",
  },
];




const travelOptions = [
  {
    nameKey: "travels.flight",
    image: require("./assets/plane.png"),
    screen: "flight1",
  },
  {
    nameKey: "travels.hotel",
    image: require("./assets/hotel.png"),
    screen: "TourAndTravelsFormScreen",
  },
  {
    nameKey: "travels.packages",
    image: require("./assets/package.png"),
    screen: "PackagesStack",
  },
  {
    nameKey: "travels.bus",
    image: require("./assets/bus.jpeg"),
    screen: "TourAndTravelsFormScreen",
  },
];
const loanAndFinanceItems = [
  { nameKey: "loan.personal", img: require("./assets/personal-loan.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.business", img: require("./assets/businessloan.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.home", img: require("./assets/homeloan.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.gold", img: require("./assets/goldloan.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.home_transfer", img: require("./assets/transfer.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.renovation", img: require("./assets/renovation.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.education", img: require("./assets/education.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.property", img: require("./assets/propertyloan.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.shares", img: require("./assets/shareloan.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.sme", img: require("./assets/smi.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.project", img: require("./assets/project.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.vehicle", img: require("./assets/carloan.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.construction", img: require("./assets/const.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.school_hotel", img: require("./assets/school.png"), screen: "LoanFormScreen" },
  { nameKey: "loan.lrd", img: require("./assets/lrd.png"), screen: "LoanFormScreen" },
];

  // ✅ Fix: Accept navigation as a prop
  const [modalVisible, setModalVisible] = useState(false);
  const [insuranceModalVisible, setInsuranceModalVisible] = useState(false);
  const [travelModalVisible, setTravelModalVisible] = useState(false);
  const [loanAndFinanceModalVisible, setLoanAndFinanceModalVisible] =
    useState(false);
  const [investmentModalVisible, setInvestmentModalVisible] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const getInitials = (fullName = "") => {
    if (!fullName.trim()) return "";
    const words = fullName.trim().split(" ");
    if (words.length === 1 && words[0]) {
      return words[0][0]?.toUpperCase();
    }
    return (words[0][0] + (words[1]?.[0] || "")).toUpperCase();
  };

  const initials = getInitials(name || "");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % IMAGE_SLIDER_DATA.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 7000); // 7 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  const [activeCategory, setActiveCategory] = useState(null);
  const openModal = (category) => {
    setActiveCategory(category);
    setModalVisible(true);
  };

  const screenWidth = Dimensions.get("window").width;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  // Auto slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % SLIDER_DATA.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 6000); // 20 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 0,
          marginTop: 0,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            textAlign: "centre",
            padding: 7,
            height: hp("9"),
            backgroundColor: "#FFE0A3",
            // borderRadius: 10,
          }}
          onPress={() => navigation.navigate("Drawer")}
        >
          <View style={styles.navbar}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => navigation.navigate("Drawer", { name })}
            >
              <Text style={styles.circleText}>{initials}</Text>
            </TouchableOpacity>
          </View>
      <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#1d154a",
              marginRight: wp("6"),
              marginTop: 18,
            }}
            onPress={() => navigation.navigate("Drawer", { name })}
          >
          {"           "}{t("home.brand_name")}</Text>
          <Feather
            style={{ marginLeft: 100, marginTop: 15 }}
            name="search"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Search")}
          />
          <Feather
            style={{ marginLeft: 20, marginTop: 15 }}
            name="bell"
            size={24}
            color="black"
          />
        </View>
        {/* Slider Section */}
        <View style={styles.sliderContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            style={{ flexDirection: "row" }}
          >
            {SLIDER_DATA.map((item, index) => (
              <View
                key={index}
                style={[styles.sliderItem, { width: width - 11 }]}
              >
                <Text style={styles.sliderTitle}>{item.title}</Text>
                <Text style={styles.sliderSubtitle}>{item.subtitle}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* Transfer Money Section */}
        <View style={styles.transferSection}>
<Text style={styles.transferTitle}>{t("home.transfer_money")}</Text>
          <View style={styles.transferButtons}>
            <TouchableOpacity
              style={styles.serviceItems}
              onPress={() => navigation.navigate("MoneyStack")}
            >
              <Image
                source={require("./assets/account.png")}
                style={styles.serviceImages}
              />
<Text style={styles.serviceTexts}>{t("home.to_mobile")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceItems}
              onPress={() => navigation.navigate("BankStack")}
            >
              <Image
                source={require("./assets/bank.png")}
                style={styles.serviceImages}
              />
<Text style={styles.serviceTexts}>{t("home.to_bank")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceItems}
              onPress={() => navigation.navigate("SelfStack")}
            >
              <Image
                source={require("./assets/self.png")}
                style={styles.serviceImages}
              />
<Text style={styles.serviceText}>{t("home.to_self")}</Text>
            </TouchableOpacity>
            {/* 
    <TouchableOpacity style={styles.serviceItem} onPress={() => navigation.navigate("CheckStack")}>
      <Image source={require("./assets/upi.png")} style={styles.serviceImages} />
      <Text style={styles.serviceText}>Check Bank Balance</Text>
    </TouchableOpacity> */}
          </View>

          {/* UPI ID Section */}
          <View style={styles.upiContainer}>
            <Text
              style={styles.upiText}
              onPress={() => navigation.navigate("QRcode")}
            >
        {t("home.upi_id")}: 123456789@xyz</Text>


            <TouchableOpacity
              style={styles.headerContainer}
              onPress={() => navigation.navigate("DealsRewards")}
            >
              <Animated.View
                style={[
                  styles.iconWrapper,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <Ionicons name="gift-outline" size={20} color="#fFF" />
              </Animated.View>
<Text style={styles.headerTitle}>{t("home.deals_rewards")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.container}>
          {/* Job & Hire Section */}
          <View style={styles.buttonContainer}>
            {/* I Want a Job */}
            <TouchableOpacity style={styles.jobButton} onPress={openWhatsApp}>
              <Image
                source={require("./assets/job.png")}
                style={styles.jobImage}
              />
<Text style={styles.jobText}>{t("home.want_job")}</Text>
            </TouchableOpacity>
            {/* I Want to Hire */}
            <TouchableOpacity
              style={styles.hireButton}
              onPress={() => navigation.navigate("WantToHire")}
            >
              <Image
                source={require("./assets/hire.jpeg")}
                style={styles.hireImage}
              />
<Text style={styles.hireText}>{t("home.want_hire")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* ✅ Recharge & Pay Bills Section */}
        <ScrollView style={styles.container}>
          <View style={styles.card}>
            {/* Header with "View all" button */}
            <View style={styles.header}>
<Text style={styles.headerText}>{t("home.recharge_pay_bills")}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.viewAllButton}
              >
<Text style={styles.viewAllText}>{t("view_all")}</Text>
              </TouchableOpacity>
            </View>

            {/* Services Grid */}
            <View style={styles.serviceRow}>
              <TouchableOpacity
                style={styles.serviceItem}
                onPress={() => navigation.navigate("MobileStack")}
              >
                <Image
                  source={require("./assets/mobile.png")}
                  style={styles.serviceImage}
                />
<Text style={styles.serviceText}>{t("service.mobile_recharge")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.serviceItem}
                onPress={() => navigation.navigate("PayStack")}
              >
                <Image
                  source={require("./assets/bulb.png")}
                  style={styles.serviceImage}
                />
<Text style={styles.serviceText}>{t("service.electricity_bill")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.serviceItem}
                onPress={() => navigation.navigate("DTHStack")}
              >
                <Image
                  source={require("./assets/dth.png")}
                  style={styles.serviceImage}
                />
<Text style={styles.serviceText}>{t("service.dth_recharge")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.serviceItem}
                onPress={() => navigation.navigate("CCStack")}
              >
                <Image
                  source={require("./assets/Credit Card.png")}
                  style={styles.serviceImage}
                />
<Text style={styles.serviceText}>{t("service.credit_card_payment")}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ✅ Modal for All Services */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View
                    style={{
                      width: "80%",
                      backgroundColor: "#fff",
                      padding: 20,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 10,
                        textAlign: "center",
                      }}
                    >
              {t("home.recharge_pay_bills")}</Text>

                    <ScrollView>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "space-around",
                        }}
                      >
                       {services.map((item, index) => (
  <TouchableOpacity
    key={index}
    style={{ alignItems: "center", width: 100, marginBottom: 15 }}
    onPress={() => {
      const stackName = serviceNavigationMap[item.key];
      if (stackName) {
        setModalVisible(false);
        navigation.navigate(stackName);
      } else {
        alert("No screen found for " + item.key);
      }
    }}
  >
    <Image
      source={item.image}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
    <Text style={{ fontSize: 12, textAlign: "center", marginTop: 2, fontWeight: "bold" }}>
      {t(`service.${item.key}`)}
    </Text>
  </TouchableOpacity>
))}

                      </View>
                    </ScrollView>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={{
                        marginTop: 10,
                        backgroundColor: "#b2762d",
                        padding: 8,
                        borderRadius: 5,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
        <View style={{ marginTop: -6 }}>
          <TouchableOpacity
            onPress={() => setInsuranceModalVisible(true)}
            style={{
              height: hp("10%"),
              padding: 15,
              backgroundColor: "#F5FBFF",
              borderRadius: 10,
              width: wp("61%"),
              marginLeft: 5,
              borderColor: "#ffa500",
              borderWidth: 1,
            }}
          >
    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{t("service.insurance")}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 0,
                }}
              >
                {/* Just Term, Health */}
                <Text style={{ fontSize: 12, marginRight: 0, color: "f0f0f0" }}>
                  {insuranceTypes
                    .slice(0, 4)
                    .map((item) => item.name)
                    .join(", ")}
                </Text>

                {/* View More */}
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#1d154a",
                    marginleft: -10,
                    paddingHorizontal: 3,
                    paddingVertical: 3,
                    borderRadius: 12,
                  }}
                >
                  <Ionicons name="chevron-forward" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableOpacity>

          {/* Movie Tickets Block */}
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "#1d154a",
              borderRadius: 10,
              width: wp("35%"),
              height: hp("10%"),
              marginLeft: wp("64%"), // Adjusts to 60% of the screen width
              marginTop: hp("-10%"),
            }}
            onPress={() => navigation.navigate("MovieBookingScreen")}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>
                  {t("movie_tickets")}
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* Just Sample Movie Titles */}
                <Text
                  style={{ fontSize: 12, textAlign: "center", color: "#fff" }}
                >
                      {t("movie_sample_titles")}
                </Text>

                {/* View More Button */}
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#1d154a",
                    marginleft: -10,
                    paddingHorizontal: 3,
                    paddingVertical: 3,
                    borderRadius: 12,
                  }}
                >
                  <Ionicons name="chevron-forward" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "#1d154a",
              borderRadius: 10,
              marginBottom: -2,
              width: wp("36%"),
              height: hp("10%"),
              position: "absolute", // Absolute positioning for the diagonal effect
              marginTop: hp("11%"),
              left: 5, // Moves it to the left
            }}
            onPress={() => navigation.navigate("MovieBookingScreen")}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
                {t("event_tickets")}
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 0,
                }}
              >
                {/* Just Sample Event Titles */}
                <Text style={{ fontSize: 12, marginRight: 0, color: "#fff" }}>
                        {t("event_sample_titles")}
                </Text>

                {/* View More Button */}
              </View>
            </ScrollView>
          </TouchableOpacity>
          <Modal
            visible={insuranceModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setInsuranceModalVisible(false)}
          >
            <TouchableWithoutFeedback
              onPress={() => setInsuranceModalVisible(false)}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View
                    style={{
                      width: "80%",
                      backgroundColor: "#fff",
                      padding: 20,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 10,
                        textAlign: "center",
                      }}
                    >
                     {t("insurance_title")}
                    </Text>
                    <ScrollView>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "space-around",
                        }}
                      >
                        {insuranceTypes.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setInsuranceModalVisible(false);
                              navigation.navigate(item.screen);
                            }}
                            style={{
                              alignItems: "center",
                              width: 100,
                              marginBottom: 15,
                            }}
                          >
                            <Image
                              source={item.image}
                              style={{
                                width: 30,
                                height: 30,
                                resizeMode: "contain",
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                textAlign: "center",
                                marginTop: 5,
                                fontWeight: "bold",
                              }}
                            >
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>

                    <TouchableOpacity
                      onPress={() => setInsuranceModalVisible(false)}
                      style={{
                        marginTop: 10,
                        backgroundColor: "#b2762d",
                        padding: 8,
                        borderRadius: 5,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <View style={{ flex: 1, padding: 14 }}>
            {/* Investment Card */}
            <TouchableOpacity
              onPress={() => setInvestmentModalVisible(true)}
              style={{
                padding: 15,
                backgroundColor: "#F5FBFF",
                borderColor: "#ffa500",
                borderWidth: 1,
                borderRadius: 10,
                width: wp("60%"),
                height: hp("10.3%"),
                marginLeft: wp("35%"),
                marginTop: -7,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {t("investment")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                {/* Show only FD, SIP */}
                <Text style={{ fontSize: 12 }}>
                  {investmentTypes
                    .slice(0, 3)
                    .map((item) => item.name)
                    .join(", ")}
                </Text>

                {/* View More Button */}

                {/* View More */}
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#1d154a",
                    marginleft: -10,
                    paddingHorizontal: 3,
                    paddingVertical: 3,
                    borderRadius: 12,
                  }}
                >
                  <Ionicons name="chevron-forward" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* Investment Options Modal */}
            <Modal
              visible={investmentModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setInvestmentModalVisible(false)}
            >
              <TouchableWithoutFeedback
                onPress={() => setInvestmentModalVisible(false)}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <View
                      style={{
                        width: "80%",
                        backgroundColor: "#fff",
                        padding: 20,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          marginBottom: 10,
                          textAlign: "center",
                        }}
                      >
                          {t("investment_title")}
                      </Text>

                      <ScrollView>
                        <View
                          style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                          }}
                        >
                          {investmentTypes.map((item, index) => (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setInvestmentModalVisible(false);
                                navigation.navigate(item.screen);
                              }}
                              style={{
                                alignItems: "center",
                                width: 100,
                                marginBottom: 15,
                              }}
                            >
                              <Image
                                source={item.image}
                                style={{
                                  width: 30,
                                  height: 30,
                                  resizeMode: "contain",
                                }}
                              />
                              <Text
                                style={{
                                  fontSize: 12,
                                  textAlign: "center",
                                  marginTop: 5,
                                  fontWeight: "bold",
                                }}
                              >
                                {item.name}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </ScrollView>

                      {/* Close Button */}
                      <TouchableOpacity
                        onPress={() => setInvestmentModalVisible(false)}
                        style={{
                          marginTop: 10,
                          backgroundColor: "#b2762d",
                          padding: 8,
                          borderRadius: 5,
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                          Close
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        </View>
    
        <View
          style={{
            backgroundColor: "#fff",
            padding: 7,
            borderRadius: 10,
            marginTop: -3,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
                 {t("tours_travels")}
            </Text>
            <TouchableOpacity
              onPress={() => setTravelModalVisible(true)}
              style={{
                backgroundColor: "#b2762d",
                paddingVertical: 4,
                paddingHorizontal: 12,
                borderRadius: 12,
              }}
            >
              <Text style={{ fontSize: 10, color: "#fff", fontWeight: "bold" }}>
                   {t("view_all")}
              </Text>
            </TouchableOpacity>
          </View>
          {/* First 4 items shown */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            {travelOptions.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ alignItems: "center", width: 80 }}
                onPress={() => {
                  navigation.navigate(item.screen);
                }}
              >
                <Image
                  source={item.image}
                  style={{ width: 30, height: 33, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontSize: 11,
                    color: "#000",
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: 2,
                  }}
                >
                   {t(item.nameKey)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
      
          <View style={styles.containerss}>
            <FlatList
              ref={flatListRef}
              data={IMAGE_SLIDER_DATA}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <Image source={item} style={styles.image} />
              )}
            />
          </View>
          
          {/* Modal for full list */}
          <Modal
            visible={travelModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setTravelModalVisible(false)}
          >
            <TouchableWithoutFeedback
              onPress={() => setTravelModalVisible(false)}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View
                    style={{
                      width: "80%",
                      backgroundColor: "#fff",
                      padding: 20,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 10,
                        textAlign: "center",
                      }}
                    >
                       {t("travel_title")}
                    </Text>

                    <ScrollView>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "space-around",
                        }}
                      >
                        {travelOptions.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setTravelModalVisible(false);
                              navigation.navigate(item.screen);
                            }}
                            style={{
                              alignItems: "center",
                              width: 100,
                              marginBottom: 15,
                            }}
                          >
                            <Image
                              source={item.image}
                              style={{
                                width: 30,
                                height: 30,
                                resizeMode: "contain",
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                textAlign: "center",
                                marginTop: 5,
                                fontWeight: "bold",
                              }}
                            >
                                {t(item.nameKey)}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>

                    <TouchableOpacity
                      onPress={() => setTravelModalVisible(false)}
                      style={{
                        marginTop: 10,
                        backgroundColor: "#b2762d",
                        padding: 8,
                        borderRadius: 5,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "bold" }}>
                       {t("close")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      
        {/* Loan & Finance Section */}
     
          <View
            style={{
              backgroundColor: "#fff",
              padding: 13,
              borderRadius: 10,
              marginTop: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
                {t('Loan & Finance')}
              </Text>
              <TouchableOpacity
                onPress={() => setLoanAndFinanceModalVisible(true)}
                style={{
                  backgroundColor: "#b2762d",
                  paddingVertical: 4,
                  paddingHorizontal: 12,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 10 }}
                >
                 {(" View All")}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              {loanAndFinanceItems.slice(0, 4).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ alignItems: "center", width: 80 }}
                  onPress={() => {
                    navigation.navigate(item.screen);
                  }}
                >
                  <Image
                    source={item.img}
                    style={{
                      width: 28,
                      height: 30,
                      resizeMode: "contain",
                      marginBottom: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {t(item.nameKey)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Loan & Finance Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={loanAndFinanceModalVisible}
            onRequestClose={() => setLoanAndFinanceModalVisible(false)}
          >
            <TouchableWithoutFeedback
              onPress={() => setLoanAndFinanceModalVisible(false)}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View
                    style={{
                      width: "80%",
                      backgroundColor: "#fff",
                      padding: 20,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 10,
                        textAlign: "center",
                      }}
                    >
                       {t("loan_title")}
                  
                    </Text>

                    <ScrollView
                      contentContainerStyle={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                      }}
                    >
                      {loanAndFinanceItems.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setLoanAndFinanceModalVisible(false);
                            navigation.navigate(item.screen);
                          }}
                          style={{
                            alignItems: "center",
                            width: 80,
                            marginBottom: 10,
                          }}
                        >
                          <Image
                            source={item.img}
                            style={{
                              width: 30,
                              height: 30,
                              resizeMode: "contain",
                              marginBottom: 5,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                         {t(item.nameKey)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>

                    <TouchableOpacity
                      onPress={() => setLoanAndFinanceModalVisible(false)}
                      style={{
                        marginTop: 10,
                        backgroundColor: "#b2762d",
                        padding: 8,
                        borderRadius: 5,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        {t("close")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
      
        <View
          style={{
            marginVertical: 10,
            backgroundColor: "#FAFAFA",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 30,
              paddingHorizontal: 10,
              marginTop: 20,
            }}
          >
          {t("sponsors")}
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            {sponsors.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: "22%", // ~4 items per row with spacing
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: "contain",
                    borderRadius: 30,
                  }}
                />
                <Text
                  style={{ fontSize: 12, marginTop: 5, textAlign: "center" }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <Navbar />
    </View>
    
  );
};

// ✅ Reusable Transfer Button with Only Images
const TransferButton = ({ label, imageSource }) => (
  <TouchableOpacity style={{ alignItems: "center", width: 80 }}>
    <Image
      source={imageSource}
      style={{ width: 40, height: 40, resizeMode: "contain", marginBottom: 5 }}
    />
    <Text
      style={{
        fontSize: 12,
        textAlign: "center",
        fontWeight: "bold",
        color: "#00000",
        fontFamily: "Lexand",
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);
const serviceNavigationMap = {
  mobile_recharge: "MobileStack",
  electricity_bill: "PayStack",
  dth_recharge: "DTHStack",
  credit_card_payment: "CCStack",
  piped_gas: "GasStack",
  wifi_recharge: "WifiStack",
  loan_payment: "LoanStack",
};

const IMAGE_SLIDER_DATA = [
  require("./assets/add3.jpeg"),
  require("./assets/add4.png"),
  require("./assets/add22.png"), // Add more image assets here
  require("./assets/add.png"),
  require("./assets/add5.png"),
];
  import * as LocalAuthentication from "expo-local-authentication";
import NetInfo from '@react-native-community/netinfo';

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(null);

 const [initialRoute, setInitialRoute] = useState(null);
 const [isAuthenticated, setIsAuthenticated] = useState(null); // changed to null for loading state
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // for loading state
 useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection.',
          [{ text: 'OK' }]
        );
      }
    });

    return () => unsubscribe();
  }, []);
  const authenticate = async () => {
    try {
      // Check if biometric authentication is available and enrolled
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (!compatible || !enrolled) {
        Alert.alert("Error", "Biometric authentication not available or not enrolled.");
        setIsAuthenticated(false); // Set to false if biometric authentication isn't available
        setIsCheckingAuth(false); // Stop loading if not available
        return;
      }

      // Request biometric authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access the app",
        fallbackLabel: "Use Passcode",
        disableDeviceFallback: false,
      });

      if (result.success) {
        setIsAuthenticated(true); // Authentication successful
      } else {
        setIsAuthenticated(false); // Authentication failed
        Alert.alert("Authentication failed", "Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred during authentication.");
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false); // Stop loading after checking authentication
    }
  };

  // Trigger authentication when the app starts
  useEffect(() => {
    authenticate(); // Call authenticate when the app starts
  }, []); // This effect only runs once after the first render


useEffect(() => {
  const checkUser = async () => {
    const user = await AsyncStorage.getItem('user');
    setInitialRoute(user ? 'MainScreen' : 'LoginScreen');
  };
  checkUser();
}, []);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "MainScreen" : "IndiayaPayLogin"}>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }} // ✅ Hide header here
        />
        <Stack.Screen
          name="IndiayaPayLogin"
          component={IndiayaPayLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Service" component={Service}  options={{ headerShown: false }} />
        <Stack.Screen name="MobileStack" component={MobileStack}  options={{ headerShown: false }} />
        <Stack.Screen name="LoanStack" component={LoanStack} options={{ headerShown: false }}  />
        <Stack.Screen name="GasStack" component={GasStack} options={{ headerShown: false }}  />
        <Stack.Screen name="PayStack" component={PayStack}  options={{ headerShown: false }} />
        <Stack.Screen name="DTHStack" component={DTHStack} options={{ headerShown: false }}  />
        <Stack.Screen name="WifiStack" component={WifiStack} options={{ headerShown: false }}  />
        <Stack.Screen name="CCStack" component={CCStack}  options={{ headerShown: false }} />
        <Stack.Screen name="ITRScreen" component={ITRStack}  options={{ headerShown: false }} />
        <Stack.Screen name="GSTFormScreen" component={GSTStack}  options={{ headerShown: false }} />
        <Stack.Screen name="LoanFormScreen" component={LoanFormStack}  options={{ headerShown: false }} />
        <Stack.Screen name="TourAndTravelsFormScreen" component={HotelStack} />
        <Stack.Screen name="flight1" component={TTFormStack} options={{ headerShown: false }}  />
        <Stack.Screen name="flight2" component={TTFormStack} options={{ headerShown: false }}  />
        <Stack.Screen
          name="RealEstateFormScreen"
          component={RealEstateFormStack}  options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="EducationalFormScreen"
          component={EducationalFormStack} options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="DonationAndCharityFormScreen"
          component={DonationFormStack} options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="OtherServicesFormScreen"
          component={OtherFormStack} options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="HomeServiceFormScreen"
          component={HomeServiceFormStack} options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="GeneralInsuranceFormScreen"
          component={GeneralInsuranceFormStack} options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="HealthInsuranceFormScreen"
          component={HealthInsuranceFormStack} options={{ headerShown: false }} 
        />
        <Stack.Screen name="MoneyStack" component={MoneyStack} options={{ headerShown: false }}  />
        <Stack.Screen name="TransferMoney" component={MoneyStack} options={{ headerShown: false }}  />
        <Stack.Screen
          name="BankSelection"
          component={BankStack}
          // options={{ title: "Select Bank" }}
             options={{ headerShown: false }} 
        />
        <Stack.Screen name="BankStack" component={BankStack}  options={{ headerShown: false }} />
        <Stack.Screen name="SelfAccountScreen" component={SelfStack}  options={{ headerShown: false }}  />
        <Stack.Screen
          name="CheckBalanceScreen"
          component={CheckBalanceScreen}
            
        />
        <Stack.Screen
          name="BankUPISelectionScreen"
          component={BankUPISelectionScreen}
        />
        <Stack.Screen
          name="InvestmentFormScreen"
          component={InvestmentFormStack}  options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CashbackAndRefferal"
          component={CashbackAndRefferal} options={{ headerShown: false }}
        />
        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
        <Stack.Screen name="scan" component={ScanStack}  options={{ headerShown: false }} />
        <Stack.Screen name="history" component={History} />
        <Stack.Screen name="upimangement" component={Upimangement} />
        <Stack.Screen name="index" component={index} />
        <Stack.Screen
          name="Drawer"
          component={Drawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SelfStack" component={SelfStack}   options={{ headerShown: false }} />
        {/* <Stack.Screen name="CheckStack" component={CheckStack} /> */}
        <Stack.Screen name="OTP-Verification" component={OTPVerification} />
        <Stack.Screen name="transaction" component={transaction} />
        <Stack.Screen name="referalhistory" component={referalhistory} />
        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen name="Permisions" component={Permisions} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="SetupPasscode" component={SetupPasscode} />
        <Stack.Screen name="SetNewPasscode" component={SetNewPasscode} />
        <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
        <Stack.Screen name="profile" component={profile} />
        <Stack.Screen name="CoinsEarned" component={CoinsEarned} />
        <Stack.Screen name="AdditionalDetails" component={AdditionalDetails} />
        <Stack.Screen
          name="AccountSecurityTips"
          component={AccountSecurityTips}
        />
        <Stack.Screen
          name="ManageNotification"
          component={ManageNotification}
        />
        <Stack.Screen name="FinancialDetails" component={FinancialDetails} />
        <Stack.Screen name="Addaddress" component={Addaddress} />
        <Stack.Screen name="ManageUPIid" component={ManageUPIid} />
        <Stack.Screen name="QRcode" component={QRcode} />
        <Stack.Screen name="UPILite" component={UPILite} />
        <Stack.Screen name="changeupipin" component={changeupipin} />
        <Stack.Screen name="currentBank" component={currentBank} />
        <Stack.Screen name="addbankaccount" component={addbankaccount} />
        <Stack.Screen name="addcreditline" component={addcreditline} />
        <Stack.Screen name="addrupaycc" component={addrupaycc} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="changeupipins" component={changeupipins} />
        <Stack.Screen name="WantToHire" component={WantToHire}   options={{ headerShown: false }} />
        <Stack.Screen name="cashbackhistory" component={cashbackhistory} />
        <Stack.Screen name="PackagesStack" component={PackagesStack}  options={{ headerShown: false }}  />
        <Stack.Screen name="MovieBookingScreen" component={MovieStack}  options={{ headerShown: false }}  />
<Stack.Screen name="AboutUsScreen" component={AboutUs} />
<Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
<Stack.Screen name="TermsScreen" component={TermsScreen} />
<Stack.Screen name="GrievanceScreen" component={GrievanceScreen} />
<Stack.Screen name="AboutAppScreen" component={AboutAppScreen} />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
        options={{ headerShown: false }} 
        />
        <Stack.Screen name="DealsRewards" component={DealsRewardsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}