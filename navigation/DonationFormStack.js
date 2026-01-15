
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DonationAndCharityFormScreen from "../screens/DonationAndCharityFormScreen";
const Stack = createStackNavigator();

export default function DonationFormStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
   <Stack.Screen
      name="DonationAndCharityFormScreen"
      component={DonationAndCharityFormScreen}
    />
  </Stack.Navigator>


);
}