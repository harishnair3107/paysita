
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GeneralInsuranceFormScreen from "../screens/GeneralInsuranceFormScreen";
const Stack = createStackNavigator();

export default function GeneralInsuranceFormStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="General Insurance Form"
      component={GeneralInsuranceFormScreen}
    />
  </Stack.Navigator>


);
}