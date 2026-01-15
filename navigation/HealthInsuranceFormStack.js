
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HealthInsuranceFormScreen from "../screens/HealthInsuranceFormScreen";
const Stack = createStackNavigator();

export default function GasStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Health Insurance Form"
      component={HealthInsuranceFormScreen}
    />
  </Stack.Navigator>


);
}