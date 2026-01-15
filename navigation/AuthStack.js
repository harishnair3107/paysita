import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IndiayaPayLogin from "../IndiayaPayLogin";
import OTPVerification from "../OTP-Verification";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="IndiayaPayLogin" component={IndiayaPayLogin} />
      <Stack.Screen name="OTP-Verification" component={OTPVerification} />
    </Stack.Navigator>
  );
}
