import {useContext}from "react";
import { View, Text, TouchableOpacity, StyleSheet ,Alert} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../theme/Theme";    

export default function HeaderSection({ initials, onDrawer }) {
  const navigation = useNavigation();
  const { mode, setMode } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      {/* Left: Avatar */}
      <TouchableOpacity onPress={onDrawer}>
        <Text style={styles.avatar}>{initials}</Text>
      </TouchableOpacity>

      {/* Center: Title */}
      <Text style={styles.title}>PaySITA</Text>

      {/* Right: Icons */}
      <View style={styles.rightIcons}>
        <Feather
          name="search"
          size={24}
          color="black"
          style={styles.icon}
          onPress={() => //navigation.navigate("Search")
            {Alert.alert("Coming Soon")}
          }
        />
        <Feather
          name= {mode==="dark"?"sun":"moon"}
          size={24}
          color="#000"
          style={styles.icon}
          onPress={() => {
            setMode(mode === "dark" ? "light" : "dark");
          }}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // 🔥 vertical alignment
    paddingHorizontal: 12,
    height: hp("9%"),
    backgroundColor: "#ffa500",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1d154a",
    color: "#fff",
    textAlign: "center",
    lineHeight: 40,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  rightIcons: {
    marginLeft: "auto", // 🔥 pushes icons to the right
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 20,
  },
});
