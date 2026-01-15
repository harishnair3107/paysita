
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SelfAccountScreen from "../screens/SelfAccountScreen";
import TransferScreen from "../screens/TransferScreen";
const Stack = createStackNavigator();

export default function SelfStack() {
    return (
   <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Self Account" component={SelfAccountScreen} />
    <Stack.Screen name="TransferScreen" component={TransferScreen} />
  </Stack.Navigator>
);
}