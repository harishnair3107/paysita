
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoanFinanceForm from "../screens/LoanFormScreen";
const Stack = createStackNavigator();

export default function LoanFormStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Loan Form" component={LoanFinanceForm} />
  </Stack.Navigator>


);
}