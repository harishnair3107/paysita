
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MovieBookingScreen from "../screens/MovieBookingScreen";
import MovieSeatSelectionScreen from "../screens/MovieSeat";
import MovieSetupScreen from "../screens/MovieSetupScreen";
import BookingSummaryScreen from "../screens/BookingSummaryScreen";

const Stack = createStackNavigator();

export default function MovieStack() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
   <Stack.Screen name="Movie Booking Screen" component={MovieBookingScreen} />
    <Stack.Screen name="MovieSetupScreen" component={MovieSetupScreen} />
    <Stack.Screen name="MovieSeat" component={MovieSeatSelectionScreen} />
    <Stack.Screen
      name="BookingSummaryScreen"
      component={BookingSummaryScreen}
    />
  </Stack.Navigator>


);
}