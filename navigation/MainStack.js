import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

/* =======================
   MAIN SCREEN
======================= */
import MainScreen from "../screens/MainScreen/MainScreen";

/* =======================
   FEATURE STACKS
======================= */
import MobileStack from "./MobileStack";
import LoanStack from "./LoanStack";
import PayStack from "./PayStack";
import GasStack from "./GasStack";
import DTHStack from "./DTHStack";
import WifiStack from "./WifiStack";
import CCStack from "./CCStack";
import ITRStack from "./ITRStack";
import GSTStack from "./GSTStack";
import LoanFormStack from "./LoanFormStack";
import BankStack from "./BankStack";
import MoneyStack from "./MoneyStack";
import SelfStack from "./SelfStack";

/* =======================
   SCREENS
======================= */
import Service from "../screens/Service";
import SearchScreen from "../screens/SearchScreen";
import DealsRewardsScreen from "../screens/DealsRewardsScreen";
import WantToHire from "../screens/WantToHire";
import MovieBookingScreen from "../screens/MovieBookingScreen";
import MovieSeatSelectionScreen from "../screens/MovieSeat";
import MovieSetupScreen from "../screens/MovieSetupScreen";
import BookingSummaryScreen from "../screens/BookingSummaryScreen";
import TourAndTravelsForm from "../screens/Tours-travelForm";
import LoanFinanceForm from "../screens/LoanFormScreen";
import LoanDetailsScreen from "../screens/LoanDetailsScreen";
import HomeServiceFormScreen from "../screens/HomeServiceFormScreen";
import RealEstateFormScreen  from "../screens/RealEstateFormScreen";
import EducationalFormScreen from "../screens/EducationalFormScreen";
import DonationAndCharityFormScreen from "../screens/DonationAndCharityFormScreen";
import OtherServicesFormScreen from "../screens/OtherServicesFormScreen";
import GSTFormScreen from "../screens/GSTFormScreen";
import ITRFormScreen from "../screens/Taxation-form";
/* ======================
   DRAWER & PROFILE
======================= */
import Drawer from "../screens/app/Drawer";
import History from "../screens/app/history";
import Upimangement from "../screens/app/upimangement";
import transaction from "../screens/app/transaction";
import referalhistory from "../screens/app/referalhistory";
import profile from "../screens/app/profile";

/* =======================
   SECURITY & SETTINGS
======================= */
import Security from "../screens/app/Security";
import Permisions from "../screens/app/Permisions";
import ChangePassword from "../screens/app/ChangePassword";
import SetupPasscode from "../screens/app/SetupPasscode";
import SetNewPasscode from "../screens/app/SetNewPasscode";
import ManageNotification from "../screens/app/ManageNotification";
import AccountSecurityTips from "../screens/app/AccountSecurityTips";

/* =======================
   USER INFO
======================= */
import CoinsEarned from "../screens/app/CoinsEarned";
import AdditionalDetails from "../screens/app/AdditionalDetails";
import FinancialDetails from "../screens/app/FinancialDetails";
import Addaddress from "../screens/app/Addaddress";

/* =======================
   UPI & BANK
======================= */
import ManageUPIid from "../screens/app/ManageUPIid";
import QRcode from "../screens/app/QRcode";
import UPILite from "../screens/app/UPILite";
import changeupipin from "../screens/app/changeupipin";
import changeupipins from "../screens/changeupipins";
import currentBank from "../screens/app/currentBank";
import addbankaccount from "../screens/app/addbankaccount";
import addcreditline from "../screens/app/addcreditline";
import addrupaycc from "../screens/app/addrupaycc";

/* =======================
   INFO PAGES
======================= */
import AboutUs from "../screens/app/AboutUs";
import PrivacyPolicyScreen from "../screens/app/PrivacyPolicyScreen";
import TermsScreen from "../screens/app/TermsScreen";
import GrievanceScreen from "../screens/app/GrievanceScreen";
import AboutAppScreen from "../screens/app/AboutAppScreen";

/* =======================
   MOVIES & PACKAGES
======================= */
import MovieStack from "./MovieStack";
import PackagesStack from "./PackagesStack";

/* =======================
   OTHERS
======================= */
import CashbackAndRefferal from "../screens/CashbackAndRefferal";
import Scan from "../screens/scan";
import ChangeLanguage from "../screens/app/ChangeLanguage";
//import ITRScreen from "../screens/Taxation-form";
//import GSTFormScreen from "../screens/GSTFormScreen";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* HOME */}
      <Stack.Screen name="MainScreen" component={MainScreen} />

      {/* CORE STACKS */}
       <Stack.Screen name="BankStack" component={BankStack} />
      <Stack.Screen name="MoneyStack" component={MoneyStack} />
      <Stack.Screen name="SelfStack" component={SelfStack} />
      <Stack.Screen name="MobileStack" component={MobileStack} />
      <Stack.Screen name="LoanStack" component={LoanStack} />
      <Stack.Screen name="PayStack" component={PayStack} />
      <Stack.Screen name="GasStack" component={GasStack} />
      <Stack.Screen name="DTHStack" component={DTHStack} />
      <Stack.Screen name="WifiStack" component={WifiStack} />
      <Stack.Screen name="CCStack" component={CCStack} />
      <Stack.Screen name="ITRStack" component={ITRStack} />
      <Stack.Screen name="GSTStack" component={GSTStack} />
      <Stack.Screen name="LoanFormStack" component={LoanFormStack} />

      {/* SERVICES */}
      <Stack.Screen name="Service" component={Service} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="DealsRewards" component={DealsRewardsScreen} />
      <Stack.Screen name="WantToHire" component={WantToHire} />

      {/* DRAWER */}
      <Stack.Screen name="Drawer" component={Drawer} />

      {/* PROFILE & HISTORY */}
      <Stack.Screen name="history" component={History} />
      <Stack.Screen name="upimangement" component={Upimangement} />
      <Stack.Screen name="transaction" component={transaction} />
      <Stack.Screen name="referalhistory" component={referalhistory} />
      <Stack.Screen name="profile" component={profile} />

      {/* SECURITY */}
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Permisions" component={Permisions} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="SetupPasscode" component={SetupPasscode} />
      <Stack.Screen name="SetNewPasscode" component={SetNewPasscode} />
      <Stack.Screen name="ManageNotification" component={ManageNotification} />
      <Stack.Screen name="AccountSecurityTips" component={AccountSecurityTips} />

      {/* USER DATA */}
      <Stack.Screen name="CoinsEarned" component={CoinsEarned} />
      <Stack.Screen name="AdditionalDetails" component={AdditionalDetails} />
      <Stack.Screen name="FinancialDetails" component={FinancialDetails} />
      <Stack.Screen name="Addaddress" component={Addaddress} />

      {/* UPI & BANK */}
      <Stack.Screen name="ManageUPIid" component={ManageUPIid} />
      <Stack.Screen name="QRcode" component={QRcode} />
      <Stack.Screen name="UPILite" component={UPILite} />
      <Stack.Screen name="changeupipin" component={changeupipin} />
      <Stack.Screen name="changeupipins" component={changeupipins} />
      <Stack.Screen name="currentBank" component={currentBank} />
      <Stack.Screen name="addbankaccount" component={addbankaccount} />
      <Stack.Screen name="addcreditline" component={addcreditline} />
      <Stack.Screen name="addrupaycc" component={addrupaycc} />

      {/* INFO */}
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
      <Stack.Screen name="GrievanceScreen" component={GrievanceScreen} />
      <Stack.Screen name="AboutAppScreen" component={AboutAppScreen} />

      {/* MOVIES & PACKAGES */}
      <Stack.Screen name="MovieStack" component={MovieStack} />
      <Stack.Screen name="PackagesStack" component={PackagesStack} />
      <Stack.Screen name="MovieBookingScreen" component={MovieBookingScreen} />
      <Stack.Screen name="MovieSetupScreen" component={MovieSetupScreen} />
      <Stack.Screen name="MovieSeat" component={MovieSeatSelectionScreen} />
      <Stack.Screen
            name="BookingSummaryScreen"
            component={BookingSummaryScreen}
      />
      {/* OTHERS */}
      <Stack.Screen name="scan" component={Scan}/>
      <Stack.Screen name="CashbackAndRefferal" component={CashbackAndRefferal} />
      <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <Stack.Screen name="Tours-travelForm" component={TourAndTravelsForm}/>
      <Stack.Screen name="LoanFormScreen" component={LoanFinanceForm}/>
      <Stack.Screen name="HomeServiceFormScreen" component={HomeServiceFormScreen}/> 
      <Stack.Screen name="RealEstateFormScreen" component={RealEstateFormScreen}/>
      <Stack.Screen name="Taxation-form" component={ITRFormScreen}/>
      <Stack.Screen name="EducationalFormScreen" component={EducationalFormScreen}/>   
      <Stack.Screen name="DonationAndCharityFormScreen" component={DonationAndCharityFormScreen}/>
      <Stack.Screen name="GSTFormScreen" component={GSTFormScreen}/>
      <Stack.Screen name="OtherServicesFormScreen" component={OtherServicesFormScreen}/>
    </Stack.Navigator>
  );
}
