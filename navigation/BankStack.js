import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BankUPISelectionScreen from "../screens/BankUPISelectionScreen";
import CheckBalanceScreen from "../screens/CheckBalanceScreen";
import UPILinkScreen from "../screens/UPILinkScreen";

const Stack = createStackNavigator();

export default function BankStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
      name="Bank Selection"
      component={BankUPISelectionScreen}
      options={{ title: "Select Bank" }}
    />
    <Stack.Screen name="Check Balance" component={CheckBalanceScreen} />
    <Stack.Screen
      name="UPILinkScreen"
      component={UPILinkScreen}
      options={{ title: "Link UPI ID" }}
    />
    </Stack.Navigator>
  );
}
