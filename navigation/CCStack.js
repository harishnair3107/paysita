import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CC_repayment from "../screens/CC_repayment";
import CC_DetailsScreen from "../screens/CC_DetailsScreen";
import success from "../screens/success";
import changeupipins from "../screens/changeupipins";
import ccpaybill from "../screens/ccpaybill";

const Stack = createStackNavigator();

export default function CCStack() { 
    return(
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="CC_repayment" component={CC_repayment} />
    <Stack.Screen name="CC_DetailsScreen" component={CC_DetailsScreen} />
    <Stack.Screen name="changeupipins" component={changeupipins} />
    <Stack.Screen name="ccpaybill" component={ccpaybill} />
    <Stack.Screen name="success" component={success} />
  </Stack.Navigator>
);}