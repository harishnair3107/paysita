import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

export default function RootNavigator() {
  const { user, loading } = useContext(UserContext);

  if (loading) return null;

  return user ? <MainStack /> : <AuthStack />;
}
