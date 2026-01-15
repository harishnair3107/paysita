
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeServiceFormScreen from "../screens/HomeServiceFormScreen";
const Stack = createStackNavigator();

export default function HomeServiceFormStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Home Services Form" component={HomeServiceFormScreen} />
  </Stack.Navigator>
);
}
