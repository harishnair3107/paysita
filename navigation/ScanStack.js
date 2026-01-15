import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Scan from "../screens/scan";
import PaymentqrScreen from "../screens/PaymentqrScreen";

const Stack = createStackNavigator();

export default function ScanStack() { 
    return(
  <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="scan" component={Scan} />
        <Stack.Screen name="PaymentqrScreen" component={PaymentqrScreen} />
  </Stack.Navigator>
);}