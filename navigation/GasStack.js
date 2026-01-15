
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PipedGasDetailsScreen from "../screens/PipedGasDetailsScreen";
import PipedGasList from "../screens/PipedGasList";
const Stack = createStackNavigator();

export default function GasStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Piped-GasList" component={PipedGasList} />
    <Stack.Screen name="Piped-Gas" component={PipedGasDetailsScreen} />
  </Stack.Navigator>


);
}