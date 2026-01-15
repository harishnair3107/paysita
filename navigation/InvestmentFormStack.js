
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InvestmentFormScreen from "../screens/InvestmentFormScreen";
const Stack = createStackNavigator();

export default function InvestmentFormStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
 <Stack.Screen name="Investment Form" component={InvestmentFormScreen} />
  </Stack.Navigator>


);
}