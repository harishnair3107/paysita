import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useAuth } from "../context/AuthContext";

export const useProtectedNavigation = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (screen, params = {}) => {
    if (!user) {
      Alert.alert("Login Required", "Please login to continue");
      navigation.navigate("IndiayaPayLogin");
      return;
    }
    navigation.navigate(screen, params);
  };
};
