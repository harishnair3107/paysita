
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RealEstateFormScreen from "../screens/RealEstateFormScreen";
const Stack = createStackNavigator();

export default function RealEstateFormStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
     <Stack.Screen name="Real Estate Form" component={RealEstateFormScreen} />
  </Stack.Navigator>


);
}