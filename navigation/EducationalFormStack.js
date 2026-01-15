
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EducationalFormScreen from "../screens/EducationalFormScreen";
const Stack = createStackNavigator();

export default function EducationalFormStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
   <Stack.Screen
        name="Educational Services Form"
        component={EducationalFormScreen}
      />
  </Stack.Navigator>


);
}