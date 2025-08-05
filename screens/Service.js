import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useTranslation } from 'react-i18next';
// import Ionicons from 'react-native-vector-icons/Ionicons'
const AllServicesScreen = () => {
  const navigation = useNavigation();
  const [homeServicesModalVisible, setHomeServicesModalVisible] = useState(false);
  const [taxationModalVisible, setTaxationModalVisible] = useState(false);
  const [otherServicesModelVisible, setOtherServicesModelVisible ] = useState(false);
  const [realEstateModalVisible, setRealEstateModalVisible] = useState(false);
    const { t } = useTranslation();
  //home service
const homeServicesItems = [
  { key: 'interior_designer', img: require('../assets/interior.png'), screen: 'HomeServiceFormScreen' },
  { key: 'painting', img: require('../assets/painting.png'), screen: 'HomeServiceFormScreen' },
  { key: 'vastu_consultant', img: require('../assets/vastu.png'), screen: 'HomeServiceFormScreen' },
  { key: 'house_cleaning', img: require('../assets/cleaning.png'), screen: 'HomeServiceFormScreen' },
  { key: 'pest_control', img: require('../assets/pest_control.png'), screen: 'HomeServiceFormScreen' },
  { key: 'civil_work', img: require('../assets/civil_work.png'), screen: 'HomeServiceFormScreen' },
  { key: 'wiring_rewiring', img: require('../assets/wiring.png'), screen: 'HomeServiceFormScreen' },
  { key: 'water_proofing', img: require('../assets/waterproofing.png'), screen: 'HomeServiceFormScreen' },
];

 const realEstateItems = [
  { key: 'flat', img: require("../assets/flat.png"), screen: "RealEstateFormScreen" },
  { key: 'bungalow', img: require("../assets/bungalow.png"), screen: "RealEstateFormScreen" },
  { key: 'shop', img: require("../assets/shops.png"), screen: "RealEstateFormScreen" },
  { key: 'factory', img: require("../assets/factory.png"), screen: "RealEstateFormScreen" },
  { key: 'agriculture_land', img: require("../assets/agriculture_land.png"), screen: "RealEstateFormScreen" },
  { key: 'rzone_land', img: require("../assets/rzone_land.png"), screen: "RealEstateFormScreen" },
  { key: 'na_plot', img: require("../assets/na_plot.png"), screen: "RealEstateFormScreen" },
  { key: 'school_hotel', img: require("../assets/school_hotel.png"), screen: "RealEstateFormScreen" },
];

const taxationItems = [
  { key: 'itr_filing', img: require('../assets/ITR.png'), screen: 'ITRScreen' },
  { key: 'company_formation', img: require('../assets/company_formation.png'), screen: 'ITRScreen' },
  { key: 'gst', img: require('../assets/gst.png'), screen: 'GSTFormScreen' },
  { key: 'company_audit', img: require('../assets/company_audit.png'), screen: 'ITRScreen' },
  { key: 'society_audit', img: require('../assets/society_Audit.png'), screen: 'ITRScreen' },
  { key: 'business_financial_advisory', img: require('../assets/business_financial.png'), screen: 'ITRScreen' },
  { key: 'corporate_legal_compliance', img: require('../assets/corporate_legal.png'), screen: 'ITRScreen' },
  { key: 'banking_investment_services', img: require('../assets/banking_investment.png'), screen: 'ITRScreen' },
];

const freeZonePills = [
  { label: t('service.free_meal'), color: '#191970', img: require('../assets/buffet_breakfast.png') },
  { label: t('service.free_cloth'), color: '#008000', img: require('../assets/clothespill.png') },
  { label: t('service.free_book'), color: '#FF0000', img: require('../assets/bookpill.png') },
  { label: t('service.free_stay'), color: '#C2A34B', img: require('../assets/personpill.png') },
];

const EducationalServicesItems = [
  { name: t('service.degree'), img: require('../assets/degree.png'), screen: 'EducationalFormScreen' },
  { name: t('service.diploma'), img: require('../assets/diploma.png'), screen: 'EducationalFormScreen' },
  { name: t('service.courses'), img: require('../assets/courses.png'), screen: 'EducationalFormScreen' },
  { name: t('service.competitive_examination'), img: require('../assets/competitive_examination.png'), screen: 'EducationalFormScreen' },
];

const otherServicesItems = [
  { key: 'legal_consulting', img: require('../assets/legal_consulting.png'), screen: 'OtherServicesFormScreen' },
  { key: 'registration_services', img: require('../assets/registation_services.png'), screen: 'OtherServicesFormScreen' },
  { key: 'web_app_developer', img: require('../assets/web-app_developer.png'), screen: 'OtherServicesFormScreen' },
  { key: 'metromony', img: require('../assets/metromony.png'), screen: 'OtherServicesFormScreen' },
  { key: 'marriage_registration', img: require('../assets/marriage_registration.png'), screen: 'OtherServicesFormScreen' },
  { key: 'digital_marketing', img: require('../assets/digital_marketing.png'), screen: 'OtherServicesFormScreen' },
  { key: 'sales_agreement', img: require('../assets/sales_agreement.png'), screen: 'OtherServicesFormScreen' },
  { key: 'sales_deed', img: require('../assets/sales_deed.png'), screen: 'OtherServicesFormScreen' },
  { key: 'udyam_gst_registration', img: require('../assets/udyam-gst_registration.png'), screen: 'OtherServicesFormScreen' },
];


const donationCharityItems = [
  { name: t('service.donation'), img: require('../assets/donation.png'), screen: 'DonationAndCharityFormScreen' },
  { name: t('service.charity'), img: require('../assets/charity.png'), screen: 'DonationAndCharityFormScreen' },
  { name: t('service.devotion'), img: require('../assets/devotion.png'), screen: 'DonationAndCharityFormScreen' },
  { name: t('service.blood_donation'), img: require('../assets/blood_donation.png'), screen: 'DonationAndCharityFormScreen' },
];



return (
  <SafeAreaView style={styles.screen}>
    {/* Header */}
    <View style={{ flex: 1, padding: 30 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#1d154a",
          height: 100,
          width: "120%",
          position: "absolute",
          top: -40,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
          <MaterialCommunityIcons name="arrow-left" size={30} color="#ffa500" marginTop="30" />
        </TouchableOpacity>
      </View>
    </View>

    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Explore Free Zone Section */}
      <View style={styles.container}>
        <Text style={styles.title}>{t('service.explore_free_zone')}</Text>

        <View style={styles.iconRow}>
          {[
            { name: t('service.courses'), img: require('../assets/courses1.png') },
            { name: t('service.seminars'), img: require('../assets/seminars.png') },
            { name: t('service.events'), img: require('../assets/events.png') },
            { name: t('service.astrology'), img: require('../assets/astrology.png') },
          ].map((item, index) => (
            <View key={index} style={styles.iconWrapper}>
              <Image source={item.img} style={styles.icon} />
              <Text style={styles.iconText}>{item.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.freeZonePillsRow}>
          {freeZonePills.map((pill, index) => (
            <View key={index} style={[styles.pill, { backgroundColor: pill.color, flexDirection: 'row', alignItems: 'center', padding: 10 }]}>
              <Text style={styles.pillText}>{pill.label}</Text>
              <Image source={pill.img} style={styles.pillImage} />
            </View>
          ))}
        </View>
      </View>

      {/* Home Services Section */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('service.home_services')}</Text>
          <TouchableOpacity onPress={() => setHomeServicesModalVisible(true)} style={styles.moreButton}>
            <Text style={styles.moreButtonText}>{t('buttons.view_all')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          {homeServicesItems.slice(0, 4).map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconWrapper} onPress={() => navigation.navigate(item.screen)}>
              <Image source={item.img} style={styles.icon} />
              <Text style={styles.iconText}>{t(`service.${item.key}`)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Real Estate Section */}
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{t('service.real_estate')}</Text>
          <TouchableOpacity onPress={() => setRealEstateModalVisible(true)} style={styles.moreButton}>
            <Text style={styles.moreButtonText}>{t('buttons.view_all')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemsRow}>
          {realEstateItems.slice(0, 4).map((item, index) => (
            <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => navigation.navigate(item.screen)}>
              <Image source={item.img} style={styles.itemImage} />
              <Text style={styles.itemText}>{t(`service.${item.key}`)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Taxation Section */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('service.taxation')}</Text>
          <TouchableOpacity onPress={() => setTaxationModalVisible(true)} style={styles.moreButton}>
            <Text style={styles.moreButtonText}>{t('buttons.view_all')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          {taxationItems.slice(0, 4).map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconWrapper} onPress={() => navigation.navigate(item.screen)}>
              <Image source={item.img} style={styles.icon} />
              <Text style={styles.iconText}>{t(`taxation.${item.key}`)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Educational Services */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('service.educational_services')}</Text>
        </View>
        <View style={styles.iconRow}>
          {EducationalServicesItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconWrapper} onPress={() => navigation.navigate(item.screen)}>
              <Image source={item.img} style={styles.icon} />
              <Text style={styles.iconText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Other Services */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.modalTitle}>{t('section_titles.other_services')}</Text>
          <TouchableOpacity onPress={() => setOtherServicesModelVisible(true)} style={styles.moreButton}>
            <Text style={styles.moreButtonText}>{t('buttons.view_all')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          {otherServicesItems.slice(0, 4).map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconWrapper} onPress={() => navigation.navigate(item.screen)}>
              <Image source={item.img} style={styles.icon} />
              <Text style={styles.iconText}>{t(`servic.${item.key}`)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Donation & Charity */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('service.donation_and_charity')}</Text>
        </View>
        <View style={styles.iconRow}>
          {donationCharityItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconWrapper} onPress={() => navigation.navigate(item.screen)}>
              <Image source={item.img} style={styles.icon} />
              <Text style={styles.iconText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>

    {/* Real Estate Modal */}
    <Modal animationType="slide" transparent={true} visible={realEstateModalVisible}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{t('service.real_estate')}</Text>
          <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {realEstateItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ alignItems: 'center', width: 100, marginBottom: 15 }}
                onPress={() => {
                  setRealEstateModalVisible(false);
                  navigation.navigate(item.screen);
                }}
              >
                <Image source={item.img} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5 }}>{t(`service.${item.key}`)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setRealEstateModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    {/* Home Services Modal */}
    <Modal animationType="slide" transparent={true} visible={homeServicesModalVisible} onRequestClose={() => setHomeServicesModalVisible(false)}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{t('service.home_services')}</Text>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {homeServicesItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.modeliconWrapper}
                  onPress={() => {
                  setHomeServicesModalVisible(false);
                  navigation.navigate(item.screen);
                }}
              >
                <Image source={item.img} style={styles.icon} />
                <Text style={styles.iconText}>{t(`service.${item.key}`)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setHomeServicesModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    {/* Taxation Modal */}
    <Modal animationType="slide" transparent={true} visible={taxationModalVisible} onRequestClose={() => setTaxationModalVisible(false)}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{t('service.taxation')}</Text>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {taxationItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modeliconWrapper}
                onPress={() => {
                  setTaxationModalVisible(false);
                  navigation.navigate(item.screen);
                }}
              >
                <Image source={item.img} style={styles.icon} />
                <Text style={styles.iconText}>{t(`taxation.${item.key}`)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setTaxationModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    {/* Other Services Modal */}
    <Modal animationType="slide" transparent={true} visible={otherServicesModelVisible} onRequestClose={() => setOtherServicesModelVisible(false)}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{t('section_titles.other_services')}</Text>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {otherServicesItems.map((item, index) => (
              <TouchableOpacity TouchableOpacity key={index} style={styles.modeliconWrapper}
                  onPress={() => {
                  setOtherServicesModelVisible(false);
                  navigation.navigate(item.screen);
                }}
              >
                <Image source={item.img} style={styles.icon} />
                <Text style={styles.iconText}>{t(`service.${item.key}`)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setOtherServicesModelVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </SafeAreaView>
);

};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 3,
  },
  container: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    width: '98%',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moreButton: {
    backgroundColor: '#b2762d',
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 20,
  },
  moreButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 10,
  },
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  iconWrapper: {
    alignItems: 'center',
    width: '25%',
    marginBottom: 5,
  },
  icon: {
    width: 37,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 0,
  },
  iconText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
    fontWeight: '700',
  },

  // Free Zone Pills
  freeZonePillsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  pill: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  pillImage: {
    width: 10, // Adjust size as needed
    height: 10,
  },
  pillText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },

  // Modal backdrop styles the transparent overlay.
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Modal container is the centered box.
  modalContainer: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
  },

  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  modeliconWrapper: {
    width: '48%', // Ensures two items per row with some spacing
    alignItems: 'center', // Centers content inside each item
    marginBottom: 15, // Adds spacing between rows
  },
  closeButton: {
    backgroundColor: '#C2A34B',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: "#fff",
    width:400,
    padding: 20,
    marginTop: 2,
    borderRadius: 10,
    marginBottom: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewAllButton: {
    backgroundColor: "#b2762d",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  viewAllText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },
  itemsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemContainer: {
    alignItems: "center",
  },
  itemImage: {
    width: 37,
    height: 37,
    resizeMode: "contain",
  },
  itemText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalScrollView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  modalItemContainer: {
    alignItems: "center",
    width: 100,
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#b2762d",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  
});

export default AllServicesScreen;
