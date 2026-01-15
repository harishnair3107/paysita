
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoanRepayment from "../screens/LoanRepayment";
import LoanDetailsScreen from "../screens/LoanDetailsScreen";
const Stack = createStackNavigator();

export default function LoanStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="LoanRepayment" component={LoanRepayment} />
    <Stack.Screen name="LoanDetailsScreen" component={LoanDetailsScreen} />
  </Stack.Navigator>


);
}