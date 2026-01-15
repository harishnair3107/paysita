
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Flight2 from "../screens/flight2";
import FlightSearchScreen from "../screens/FlightSearch";
const Stack = createStackNavigator();

export default function TTFormStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="flight1" component={FlightSearchScreen} />
    <Stack.Screen name="flight2" component={Flight2} />
  </Stack.Navigator>


);
}