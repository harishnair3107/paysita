
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ITRFormScreen from "../screens/Taxation-form";
const Stack = createStackNavigator();

export default function ITRStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Taxation form" component={ITRFormScreen} />
  </Stack.Navigator>


);
}