
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import dthplan from "../screens/dthplan";
import successdth from "../screens/successdth";
import DTHrecharge from "../screens/DTHrecharge";
import DthDetailsScreen from "../screens/DthDetailsScreen";
const Stack = createStackNavigator();

export default function DTHStack() {
    return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DTH Recharge" component={DTHrecharge} />
    <Stack.Screen name="dthplan" component={dthplan} />
    <Stack.Screen name="DthDetailsScreen" component={DthDetailsScreen} />
    <Stack.Screen name="successdth" component={successdth} />
  </Stack.Navigator>

);
}