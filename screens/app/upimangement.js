import { StyleSheet, Text, View, Pressable, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next"; // ✅ Added i18n
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const UPIManagement = ({ navigation }) => {
  const { t } = useTranslation(); // ✅ i18n hook
  const [isActivated, setIsActivated] = useState(false);

  const handleActivate = () => {
    setIsActivated(true);
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView style={styles.Scrollcontainer} showsVerticalScrollIndicator={false}>

        {/* UPI ID Section */}
        <View style={{ marginBottom: 5 }}>
          {/* UPI ID */}
          <View style={styles.sectionRow}>
            <Image source={require('../../assets/drawer/bhim.png')} style={styles.icon} />
            <View>
              <Text style={styles.sectionTitle}>{t('upi_id')}</Text>
              <View style={styles.upiRow}>
                <Image source={require('../../assets/drawer/check.png')} style={styles.checkIcon} />
                <Text style={styles.upiId}>john@upi</Text>
              </View>
            </View>
            <Pressable onPress={() => navigation.navigate('ManageUPIid')} style={styles.viewButton}>
              <Text style={styles.linkText}>{t('view')}</Text>
            </Pressable>
          </View>

          {/* UPI Number */}
          <View style={styles.sectionRow}>
            <Image source={require('../../assets/drawer/upinumber.png')} style={styles.icon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>{t('upi_number')}</Text>
              <Text style={styles.upiId}>9632587412</Text>
            </View>
            {isActivated ? (
              <Text style={styles.activatedText}>{t('activated')}</Text>
            ) : (
              <TouchableOpacity onPress={handleActivate}>
                <Text style={styles.linkTextRight}>{t('activate')}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* My QR */}
          <View style={styles.sectionRow}>
            <Image source={require('../../assets/drawer/qrimage.png')} style={styles.icon} />
            <View>
              <Text style={styles.sectionTitle}>{t('my_qr')}</Text>
              <Text style={styles.upiId}>{t('share_qr')}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('QRcode')}>
              <Text style={styles.linkText}>{t('view')}</Text>
            </Pressable>
          </View>

          {/* Change UPI PIN */}
          <TouchableOpacity onPress={() => navigation.navigate('changeupipin')}>
            <View style={styles.sectionRow}>
              <Image source={require('../../assets/drawer/password.png')} style={styles.icon} />
              <View>
                <Text style={styles.sectionTitle}>{t('change_upi_pin')}</Text>
                <Text style={styles.upiId}>{t('change_upi_pin_sub')}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={24} color="black" style={{ marginLeft: "auto" }} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Payment Accounts */}
        <Text style={styles.sectionHeading}>{t('payment_accounts')}</Text>
        {/* Payment Accounts container */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.accountOptionsContainer}>
            <TouchableOpacity style={styles.accountOption} onPress={() => navigation.navigate('addbankaccount')}>
              <Image source={require('../../assets/drawer/addbankaccount.png')} style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('add_bank_account')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountOption} onPress={() => navigation.navigate('addrupaycc')}>
              <Image source={require('../../assets/drawer/addcc.png')} style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('add_rupay_card')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountOption} onPress={() => navigation.navigate('UPILite')}>
              <Image source={require('../../assets/drawer/bhim.png')} style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('active_upi_lite')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountOption} onPress={() => navigation.navigate('addcreditline')}>
              <Image source={require('../../assets/drawer/cc.png')} style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('add_credit_line')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Current Bank Account */}
        <TouchableOpacity onPress={() => navigation.navigate('currentBank')}>
          <View style={styles.sectionRow}>
            <Image source={require('../../assets/drawer/hdfc.png')} style={{ width: 40, height: 40 }} />
            <View>
              <Text style={styles.sectionTitle}>{t('hdfc_bank')}</Text>
              <View style={styles.upiRow}>
                <Image source={require('../../assets/drawer/check.png')} style={styles.checkIcon} />
                <Text style={{ color: "green" }}>{t('default_bank')}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="black" style={{ marginLeft: "auto" }} />
          </View>
        </TouchableOpacity>

        {/* UPI Settings */}
        <Text style={styles.sectionHeading}>{t('upi_settings')}</Text>
        <View style={styles.sectionRow}>
          <Image source={require('../../assets/drawer/hand.png')} style={styles.icon} />
          <View>
            <Text style={styles.sectionTitle}>{t('payment_request')}</Text>
            <Text>{t('payment_request_sub')}</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" style={{ marginLeft: "auto" }} />
        </View>

        <View style={styles.sectionRow}>
          <Image source={require('../../assets/drawer/automaticpayment.png')} style={{ width: 40, height: 40 }} />
          <View>
            <Text style={styles.sectionTitle}>{t('automatic_payment')}</Text>
            <Text>{t('automatic_payment_sub')}</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" style={{ marginLeft: "auto" }} />
        </View>

        {/* Other Settings */}
        <Text style={styles.sectionHeading}>{t('other_settings')}</Text>
        <View style={styles.sectionRow}>
          <Image source={require('../../assets/drawer/savedcards.png')} style={{ width: 40, height: 40 }} />
          <View>
            <Text style={styles.sectionTitle}>{t('saved_cards')}</Text>
            <Text>{t('saved_cards_sub')}</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" style={{ marginLeft: "auto" }} />
        </View>

        <View style={styles.sectionRow}>
          <Image source={require('../../assets/drawer/assist.png')} style={{ width: 40, height: 40 }} />
          <View>
            <Text style={styles.sectionTitle}>{t('indiayapay_assist')}</Text>
            <Text>{t('indiayapay_assist_sub')}</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" style={{ marginLeft: "auto" }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UPIManagement;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: wp('4%'),
    paddingTop: hp('1.5%'),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },

  headerText: {
    fontSize: wp('5%'),
    fontWeight: "600",
    color: "#1D154A",
    marginLeft: wp('4%'),
  },

  Scrollcontainer: {
    paddingVertical: hp('2%'),
  },

  sectionTitle: {
    fontSize: wp('4.2%'),
    fontWeight: "600",
    color: "#333",
  },

  upiId: {
    fontSize: wp('4%'),
    color: "#555",
  },

  upiRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp('1.5%'),
    marginTop: hp('0.5%'),
  },

  icon: {
    width: wp('9%'),
    height: wp('9%'),
    resizeMode: "contain",
  },

  checkIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    resizeMode: "contain",
  },

  copyIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    resizeMode: "contain",
  },

  sectionRow: {
    flexDirection: "row",
    gap: wp('4%'),
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: wp('3%'),
    padding: wp('3%'),
    marginBottom: hp('1.5%'),
  },

  viewButton: {
    marginLeft: "auto",
    padding: wp('1.5%'),
  },

  linkText: {
    fontSize: wp('4%'),
    color: "#1976D2",
    fontWeight: "500",
  },

  linkTextRight: {
    marginLeft: "auto",
    fontSize: wp('4%'),
    color: "#1976D2",
    fontWeight: "500",
  },

  sectionHeading: {
    fontSize: wp('4.8%'),
    fontWeight: "700",
    marginBottom: hp('1%'),
    color: "#1D154A",
  },

  accountOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: wp('3.5%'),
    marginBottom: hp('2%'),
  },

  accountOption: {
    width: wp('28%'),
    backgroundColor: "#F2F6FF",
    borderRadius: wp('3%'),
    paddingVertical: hp('2.5%'),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
  },

  optionText: {
    fontSize: wp('3.5%'),
    fontWeight: "500",
    textAlign: "center",
    color: "#1D154A",
    marginTop: hp('1%'),
  },

  optionIcon: {
    width: wp('9%'),
    height: wp('9%'),
    resizeMode: "contain",
  },
});