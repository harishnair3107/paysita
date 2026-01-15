
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PackageDetails from "../screens/PackageDetails";
import TravelPackages from "../screens/PackageCard";
const Stack = createStackNavigator();

export default function PackagesStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="PackageCard"
      component={TravelPackages}
      options={{ title: "fkfw" }}
    />
    <Stack.Screen
      name="PackageDetails"
      component={PackageDetails}
      options={{ title: "Details" }}
    />
  </Stack.Navigator>


);
}