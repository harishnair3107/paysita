import { NavigationContainer } from "@react-navigation/native";
import {ThemeProvider} from "./theme/Theme";
import { UserProvider } from "./context/userContext";
import RootNavigator from "./navigation/RootNavigator";
import i18n from "./src/i18n/i18n";
export default function App() {
  return (
     <ThemeProvider>
       <UserProvider>
         <NavigationContainer>
           <RootNavigator />
         </NavigationContainer>
      </UserProvider>
     </ThemeProvider>
  );
  // console.log("APP RUNNING");
  // return (
  //  <UserProvider>
  //   <View>
  //     <Text>Hello</Text>
  //   </View>
  // </UserProvider>
  // );
}
