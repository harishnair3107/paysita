
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OtherServicesFormScreen from "../screens/OtherServicesFormScreen";
const Stack = createStackNavigator();

export default function OtherFormStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
          name="OtherServicesFormScreen"
          component={OtherServicesFormScreen}
        />
  </Stack.Navigator>


);
}