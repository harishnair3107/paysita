
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MobileRecharge from "../screens/MobileRecharge";
import SuccessScreen from "../screens/SuccessScreen";
import MobileDetailsScreen from "../screens/MobileDetailsScreen";
import ViewPlans from "../screens/ViewPlans";

const Stack = createStackNavigator();

export default function MobileStack() {
    return (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
  
   <Stack.Screen name="Mobile Recharge" component={MobileRecharge} />
    <Stack.Screen name="MobileDetailsScreen" component={MobileDetailsScreen} />
    <Stack.Screen name="ViewPlans" component={ViewPlans} />
    <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
  
    
  </Stack.Navigator>
);
}