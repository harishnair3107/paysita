
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GSTFormScreen from "../screens/GSTFormScreen";
const Stack = createStackNavigator();

export default function GSTStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="GST form" component={GSTFormScreen} />
  </Stack.Navigator>


);
}