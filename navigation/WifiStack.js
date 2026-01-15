
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BroadBandDetailsScreen from "../screens/BroadBandDetailsScreen";
import BroadBandList from "../screens/BroadBandList";

const Stack = createStackNavigator();

export default function WifiStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="BroadBandList" component={BroadBandList} />
    <Stack.Screen
      name="BroadBandDetailsScreen"
      component={BroadBandDetailsScreen}
    />
  </Stack.Navigator>


);
}