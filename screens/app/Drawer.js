import React, { useContext } from "react";
import { ScrollView, View, Text, StyleSheet, Pressable, ToastAndroid, Platform, Share, Alert, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import { Image as RNImage } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { UserContext } from "../../context/userContext";
import { ThemeContext } from "../../theme/Theme";

export default function Drawer({ closeDrawer, route }) {
  const { user, setUser } = useContext(UserContext);
   const { colors } = useContext(ThemeContext);

   const mobileNumber = user?.mobileNumber;
   const name = user?.name;
   const countryCode = user?.countryCode;
  const navigation = useNavigation();
const { t, i18n } = useTranslation();
  const qrImage = require("../../assets/drawer/JohnDoe.png");
  const styles=createStyles(colors);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error('Logout error', error);
      Alert.alert(t('error'), t('logout_error'));
    }
  };

  const getInitials = (mobileNumber) => {
  if (typeof mobileNumber !== "string" || mobileNumber.length < 2) {
    return "U";
  }

  // last 2 digits as initials (fintech-safe)
  return mobileNumber.slice(-2);
};






  const handleDownload = async () => {
    try {
      const fileUri = RNImage.resolveAssetSource(qrImage).uri;
      const filePath = FileSystem.documentDirectory + "JohnDoe.png";
      const downloaded = await FileSystem.downloadAsync(fileUri, filePath);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        await MediaLibrary.createAssetAsync(downloaded.uri);
        Alert.alert(t("success"), t("qr_saved"));
      } else {
        Alert.alert(t("permission_denied"), t("permission_required"));
      }
    } catch (error) {
      console.log(error);
      Alert.alert(t("error"), t("qr_save_failed"));
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setStringAsync(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show(t('upi_copied_to_clipboard'), ToastAndroid.SHORT);
    }
  };

  const shareQR = async () => {
  try {
    await Share.share({
      title: 'Share My QR Code',
      message: 'Scan this QR to pay me: https://example.com/qr-code',
    });
  } catch (error) {
    console.error('Error sharing QR:', error);
  }
};

  const initials = getInitials(mobileNumber);

  const settingsOptions = [
    {
      icon: require("../../assets/drawer/settings.gif"),
      title: t("profile_settings"),
      // description: t("profile_setting_desc"),
      screen: "profile",
      params: { mobileNumber },
    },
    {
      icon: require("../../assets/drawer/bhim.png"),
      title: t("upi_management"),
      // description: t("upi_management_desc"),
      screen: "upimangement",
    },
    {
      icon: require("../../assets/drawer/history.png"),
      title: t("history"),
      screen: "history",
    },
    {
      icon: require("../../assets/drawer/cybersecurity.gif"),
      title: t("security"),
      screen: "Security",
    },
    
  ];
      // console.log(mobileNumber)

  return (
    <Pressable style={styles.drawer} onPress={(e) => e.stopPropagation()}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.topSection} onPress={() => navigation.goBack()}>
          <Pressable style={{ marginLeft: -3 }}>
            <Ionicons name="arrow-back" size={28} color="#555"  onPress={() => navigation.navigate("MainScreen")}/>
          </Pressable>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>{initials}</Text>
          </View>
       <View>
<Text style={styles.name}>{user?.name || ""}</Text>
<Pressable onPress={() => copyToClipboard(t("john@upid"))}>
    <View style={{ flexDirection: 'row', gap: 5 }}>
      <Image source={require('../../assets/drawer/bhim.png')} style={{ width: 20, height: 20 }} />
     
  <Text style={styles.upiId}>{t("john@upid")}</Text>
      <Feather name="copy" size={16} color="#0000FF" />
    </View>
  </Pressable>
</View>

        </TouchableOpacity>

        <View style={styles.QRcontainer}>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.helpSupportButton} onPress={() =>{
            navigation.navigate("HelpAndSupport")
            //Alert.alert("Sucess","Coming Soon......");
            }}> 
              <View style={styles.helpSupportIconContainer}>
                <Image source={require('../../assets/drawer/helpAndSupport.gif')} style={{ width: 30, height: 30 }} />
              </View>
              <View>
                <Text style={styles.helpSupportTitle}>{t('help_support')}</Text>
                <Text style={styles.helpSupportDescription}>{t('help_support_description')}</Text>
              </View>
            </Pressable>

            <Pressable style={styles.helpSupportButton} onPress={() => {
              navigation.navigate("ChangeLanguage")
               //Alert.alert("Sucess","Coming Soon......"); 
              }}>
              <View style={styles.helpSupportIconContainer}>
                <Image source={require('../../assets/drawer/translate.gif')} style={{ width: 30, height: 30 }} />
              </View>
              <View>
                <Text style={[styles.helpSupportTitle, { fontSize: 19 }]}>{t('languages')}</Text>
                <Text style={styles.helpSupportDescription}>{t('language_description')}</Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.qrSection}>
            <Image source={qrImage} style={{ width: 150, height: 170 }} />
            <View style={styles.iconContainer}>
              <Pressable style={styles.iconWrapper} onPress={shareQR}>
                <Ionicons name="share-outline" style={styles.icon} color="#1D154A" />
                <Text style={{ color: '#FFA500', fontSize: 12 }}>{t('share')}</Text>
              </Pressable>
              <View style={{ width: 1, backgroundColor: '#000', height: '80%' }} />
              <Pressable style={styles.iconWrapper} onPress={handleDownload}>
                <Ionicons name="download-outline" style={styles.icon} color="#1D154A" />
                <Text style={{ color: '#FFA500', fontSize: 12 }}>{t('download')}</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.settingsContainer}>
          {settingsOptions.map((option, index) => (
            <Pressable
              key={index}
              style={styles.settingsOption}
onPress={() => {
  // console.log("🧭 Navigating to:", option.screen, "with params:", option.params);
  navigation.navigate(option.screen);
      //Alert.alert("Sucess","Coming Soon......");
}}
            >
              <Image source={option.icon} style={styles.optionIcon} />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="black" />
            </Pressable>
          ))}
        </View>
        <View style={styles.additionalSectionContainer}>
          <Pressable style={styles.aboutButton} onPress={() =>{
            navigation.navigate("AboutUs")
            //Alert.alert("Sucess","Coming Soon......");
            }
            }
            > 
            <Text style={styles.aboutButtonText}>{t('about')}</Text>
          </Pressable>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>{t('logout')}</Text>
          </Pressable>
        </View>

      </ScrollView>
    </Pressable>
  );
}

const createStyles =(colors)=> StyleSheet.create({

  drawer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: hp('4%'),
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp('8%'),
  },

  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3.5%'),
    paddingBottom: hp('1.5%'),
    borderBottomWidth: 1,
    borderColor: colors.primary,
  },

  profileCircle: {
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7%'),
    backgroundColor: '#1976D2',
    marginLeft:60,
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    color: colors.text,
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    textAlign:"center",
  },

  name: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: colors.text,
    marginBottom: hp('0.3%'),
    marginLeft: wp('3%'),
  },

  upiId: {
    fontSize: wp('3.2%'),
    color: colors.upi,
  },

  QRcontainer: {
    backgroundColor: '#fff',
    marginHorizontal: wp('4%'),
    marginVertical: hp('2.2%'),
    borderRadius: wp('3.5%'),
    padding: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth:2,
    borderColor:colors.primary,
    elevation: 4,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: wp('3%'),
  },

  qrSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  qrImage: {
    width: wp('25%'),
    height: wp('26%'),
    borderRadius: wp('3%'),
    borderWidth: 0.5,
    borderColor: '#ccc',
  },

  iconContainer: {
    marginTop: hp('1.7%'),
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: wp('3%'),
    overflow: 'hidden',
    width: wp('40%'),
    borderWidth: 1,
    borderColor: '#ddd',
  },

  iconWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp('1.1%'),
  },

  icon: {
    fontSize: wp('4.5%'),
    marginBottom: hp('0.3%'),
  },

  helpSupportButton: {
    backgroundColor: '#f9f9f9',
    borderRadius: wp('3%'),
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: wp('3%'),
    gap: wp('1%'),
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: wp('2.5%'),
    marginLeft: wp('-2%'),
  },

  helpSupportTitle: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
    color: '#0066CC',
  },

  helpSupportDescription: {
    fontSize: wp('3.2%'),
    color: '#555',
    marginTop: hp('0.5%'),
    maxWidth: '90%',
  },

  settingsContainer: {
    marginTop: hp('2%'),
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.8%'),
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },

  optionIcon: {
    width: wp('7%'),
    height: wp('7%'),
    marginRight: wp('3%'),
  },

  optionTextContainer: {
    flex: 1,
  },

  optionTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#222',
    // textAlign:"center"
    marginTop:6,
    marginBottom:-16,
  },

  optionDescription: {
    fontSize: wp('3.2%'),
    color: '#777',
  },

  additionalSectionContainer: {
    marginTop: hp('2.5%'),
    paddingHorizontal: wp('5%'),
  },

  aboutButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp('1.5%'),
    borderRadius: wp('6%'),
    marginBottom: hp('1.8%'),
  },

  aboutButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
    textAlign: 'center',
  },

  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('6%'),
  },

  logoutButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
    textAlign: 'center',
  },
});
