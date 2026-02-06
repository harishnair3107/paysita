
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Paybill from "../screens/Paybill";
import PaySubdivision from "../screens/PaySubdivision";
import PayConsumer from "../screens/PayConsumer";
const Stack = createStackNavigator();

export default function PayStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Electricity bill" component={Paybill} />
    <Stack.Screen name="PaySubdivision" component={PaySubdivision} />
    <Stack.Screen name="PayConsumer" component={PayConsumer} />
  </Stack.Navigator>


);
}