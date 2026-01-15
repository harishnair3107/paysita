
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TourAndTravelsForm from "../screens/Tours-travel Form";
const Stack = createStackNavigator();

export default function HotelStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tours-travelForm" component={TourAndTravelsForm} />
  </Stack.Navigator>


);
}