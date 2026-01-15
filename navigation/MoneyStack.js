
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TransferMoney from "../screens/TransferMoney";
import PaymentScreen from "../screens/PaymentScreen";
import NewPaymentScreen from "../screens/NewPaymentScreen";
import ChatScreen from "../screens/ChatScreen";
import VoiceCallScreen from "../screens/VoiceCallScreen";
import VideoCallScreen from "../screens/VideoCallScreen";
import SplitExpenseScreen from "../screens/SplitExpenseScreen";

const Stack = createStackNavigator();

export default function MoneyStack() {
    return (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Transfer-Money" component={TransferMoney} />
    <Stack.Screen name="Payment-Screen" component={PaymentScreen} />
    <Stack.Screen name="NewPaymentScreen" component={NewPaymentScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
    <Stack.Screen name="VoiceCallScreen" component={VoiceCallScreen} />
    <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} />
    <Stack.Screen name="SplitExpenseScreen" component={SplitExpenseScreen} />
  </Stack.Navigator>
);
}