import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const AllServicesScreen = () => {

  const navigation = useNavigation();

  const [homeServicesModalVisible, setHomeServicesModalVisible] = useState(false);
  const [realEstateModalVisible, setRealEstateModalVisible] = useState(false);
  const [taxationModalVisible, setTaxationModalVisible] = useState(false);
  const [otherServicesModelVisible, setOtherServicesModelVisible ] = useState(false);

  // Full arrays for each modal 
  const homeServicesItems = [
    { name: 'Interior Designer', img: require('../assets/interior.png'),screen:'HomeServiceFormScreen' },
    { name: 'Painting', img: require('../assets/painting.png'),screen:'HomeServiceFormScreen' },
    { name: 'Vastu Consultant', img: require('../assets/vastu.png'),screen:'HomeServiceFormScreen' },
    { name: 'House Cleaning', img: require('../assets/cleaning.png') ,screen:'HomeServiceFormScreen'},
    { name: 'Pest Control', img: require('../assets/pest_control.png'),screen:'HomeServiceFormScreen' },
    { name: 'Civil Work', img: require('../assets/civil_work.png'),screen:'HomeServiceFormScreen' },
    { name: 'Wiring & Rewiring', img: require('../assets/wiring.png'),screen:'HomeServiceFormScreen' },
    { name: 'Water Proofing', img: require('../assets/waterproofing.png'),screen:'HomeServiceFormScreen' },
  ];

  const realEstateItems = [
    { name: 'Flat', img: require('../assets/flat.png'),screen: 'RealEstateFormScreen' },
    { name: 'Bungalow', img: require('../assets/bungalow.png') ,screen: 'RealEstateFormScreen'},
    { name: 'Shop', img: require('../assets/shop.png') ,screen: 'RealEstateFormScreen'},
    { name: 'Factory', img: require('../assets/factory.png'),screen: 'RealEstateFormScreen' },
    { name: 'Agriculture Land', img: require('../assets/agriculture_land.png') ,screen: 'RealEstateFormScreen'},
    { name: 'R Zone Land', img: require('../assets/rzone_land.png'),screen: 'RealEstateFormScreen' },
    { name: 'N.A Plot', img: require('../assets/na_plot.png'),screen: 'RealEstateFormScreen' },
    { name: 'School/Hotel', img: require('../assets/school_hotel.png') ,screen: 'RealEstateFormScreen'},
  ];

  const taxationItems = [
    { name: 'ITR Filling', img: require('../assets/ITR.png'),screen: 'ITRScreen' },
    { name: 'Company Formation', img: require('../assets/company_formation.png'),screen: 'HomeServiceFormScreen' },
    { name: 'GST', img: require('../assets/gst.png') , screen: 'GSTFormScreen'},
    { name: 'Company Audit', img: require('../assets/company_audit.png'),screen: 'ITRScreen' },
    { name: 'Society Audit', img: require('../assets/society_Audit.png'), screen: 'ITRScreen' },
    { name: 'Business & Financial Advisory', img: require('../assets/business_financial.png'),screen: 'ITRScreen' },
    { name: 'Corporate & Legal Compliance', img: require('../assets/corporate_legal.png'), screen: 'ITRScreen' },
    { name: 'Banking & Investment Services', img: require('../assets/banking_investment.png'),screen: 'ITRScreen' },
  ];

  // Pills data for Free Zone
  const freeZonePills = [
    { label: 'Free Meal', color: '#191970' ,  img : require('../assets/buffet_breakfast.png')},  
    { label: 'Free Cloth', color: '#008000' ,  img : require('../assets/clothespill.png') }, 
    { label: 'Free Book', color: '#FF0000' ,  img : require('../assets/bookpill.png') },  
    { label: 'Free Stay', color: '#C2A34B',  img : require('../assets/personpill.png') },  
  ];

  const EducationalServicesItems = [
    { name: 'Degree', img: require('../assets/degree.png'),screen: 'EducationalFormScreen' },
    { name: 'Diploma', img: require('../assets/diploma.png'),screen: 'EducationalFormScreen' },
    { name: 'Courses', img: require('../assets/courses.png'),screen: 'EducationalFormScreen' },
    { name: 'Competitive Examination', img: require('../assets/competitive_examination.png'),screen: 'EducationalFormScreen' },
  ];

  const otherServicesItems = [
    { name : 'legal Consulting', img: require('../assets/legal_consulting.png') },
    { name : 'Registration Services', img: require('../assets/registation_services.png') },
    { name : 'Web/App Developer', img: require('../assets/web-app_developer.png') },
    { name : 'Metromony', img: require('../assets/metromony.png') },
    { name : 'Marriage Registration', img: require('../assets/marriage_registration.png') },
    { name : 'Digital Marketing', img: require('../assets/digital_marketing.png') },
    { name : 'Sales Agreement', img: require('../assets/sales_agreement.png') },
    { name : 'Sales Deed', img: require('../assets/sales_deed.png') },
    { name : 'Udyam/GST Registration', img: require('../assets/udyam-gst_registration.png') },
  ];

  const donationCharityItems = [
    { name: 'Donation', img: require('../assets/donation.png') },
    { name: 'Charity', img: require('../assets/charity.png') },
    { name: 'Devoyion', img: require('../assets/devotion.png') },
    { name: 'Blood Donation', img: require('../assets/blood_donation.png') },
  ];

  return (
    <SafeAreaView style={styles.screen}>
            <View style={{ flex: 1, padding: 30 }}>
              {/* Header with Back Arrow */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#1d154a",
                  height: 70,
                  width: "120%",  // Full width
                  position: "absolute", // Ensures it spans entire width
                  top: -10, // Align to the top
                  left: 0,
                  right: 0,
                  paddingHorizontal: 15, // Adds some space inside
                }}
              >        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                  <Ionicons name="arrow-back" size={30} color="#ffa500" />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: "bold", color: "#FF8C00" }}>Services</Text>
              </View>
        
                </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Explore Free Zone Section */}
        <View style={styles.container}>
          <Text style={styles.title}>Explore Free Zone</Text>
          
          {/* Original icons */}
          <View style={styles.iconRow}>
            {[
              { name: 'Courses', img: require('../assets/courses1.png') },
              { name: 'Seminars', img: require('../assets/seminars.png') },
              { name: 'Events', img: require('../assets/events.png') },
              { name: 'Astrology', img: require('../assets/astrology.png') },
            ].map((item, index) => (
              <View key={index} style={styles.iconWrapper}>
                <Image source={item.img} style={styles.icon} />
                <Text style={styles.iconText}>{item.name}</Text>
              </View>
            ))}
          </View>

          {/* Pills row (Free Meal, Free Cloth, etc.) */}
          <View style={styles.freeZonePillsRow}>
            {freeZonePills.map((pill, index) => (
              <View key={index} style={[styles.pill, { backgroundColor: pill.color , flexDirection: 'row', alignItems: 'center', padding: 10 }]}>
                <Text style={styles.pillText}>{pill.label}</Text>
                <Image source={pill.img} style={styles.pillImage} />
              </View>
            ))}
          </View>
        </View>

        {/* Home Services Section */}
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Home Services</Text>
            <TouchableOpacity 
              onPress={() => setHomeServicesModalVisible(true)}
              style={styles.moreButton}
            >
              <Text style={styles.moreButtonText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.iconRow}>
            {homeServicesItems.slice(0, 4).map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.iconWrapper} 
                onPress={() => {
                navigation.navigate(item.screen); 
                }} 
              >
                <Image source={item.img} style={styles.icon} />
                <Text style={styles.iconText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Real Estate Section */}
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Real Estate</Text>
            <TouchableOpacity 
              onPress={() => setRealEstateModalVisible(true)}
              style={styles.moreButton}
            >
              <Text style={styles.moreButtonText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.iconRow}>
            {realEstateItems.slice(0, 4).map((item, index) => (
              <TouchableOpacity 
              key={index} 
              style={styles.iconWrapper} 
              onPress={() => {
                navigation.navigate(item.screen);
              }} 
            >
              <Image source={item.img} style={styles.icon} />
              <Text style={styles.iconText}>{item.name}</Text>
            </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Taxation Section */}
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Taxation</Text>
          <TouchableOpacity 
          onPress={() => setTaxationModalVisible(true)} 
          style={styles.moreButton}
          >
          <Text style={styles.moreButtonText}>View All</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.iconRow}>
            {taxationItems.slice(0, 4).map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.iconWrapper} 
                onPress={() => navigation.navigate(item.screen)} 
              >
                <Image source={item.img} style={styles.icon} />
                <Text style={styles.iconText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {/* Educational Services Section */}
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Educational Services</Text>
          </View>  
          <View style={styles.iconRow}>
            {EducationalServicesItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.iconWrapper} 
                onPress={() => navigation.navigate(item.screen)}
              >
                <Image source={item.img} style={styles.icon} />
                <Text style={styles.iconText}>{item.name}</Text>
              </TouchableOpacity>
            ))}            
          </View>
        </View>


        {/* Other Services Section */}
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Other Services</Text>
            <TouchableOpacity 
              onPress={() => setOtherServicesModelVisible(true)}
              style={styles.moreButton}
            >
              <Text style={styles.moreButtonText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconRow}>
            {otherServicesItems.slice(0, 4).map((item, index) => (
              <View key={index} style={styles.iconWrapper}>
                <Image source={item.img} style={styles.icon} />
                <Text style={styles.iconText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Donation & Charity Section */}
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Donation & Charity</Text>
          </View>  
          <View style={styles.iconRow}>
          {donationCharityItems.map((item, index) => (
              <View key={index} style={styles.iconWrapper}>
                <Image source={item.img} style={styles.icon} />
                <Text style={styles.iconText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Home Services Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={homeServicesModalVisible}
          onRequestClose={() => setHomeServicesModalVisible(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Home Services</Text>
                <ScrollView contentContainerStyle={styles.modalContent}>
                {homeServicesItems.map((item, index) => (
                  <View key={index} style={styles.modeliconWrapper}>
                    <Image source={item.img} style={styles.icon} />
                    <Text style={styles.iconText}>{item.name}</Text>
                  </View>
                ))}
              </ScrollView>
              
              <TouchableOpacity onPress={() => setHomeServicesModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      {/* Real Estate Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={realEstateModalVisible}
          onRequestClose={() => setRealEstateModalVisible(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Real Estate</Text>
              <ScrollView contentContainerStyle={styles.modalContent}>
                {realEstateItems.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.modeliconWrapper}
                    onPress={() => {
                      setRealEstateModalVisible(false); 
                      navigation.navigate(item.screen);
                    }}
                  >
                    <Image source={item.img} style={styles.icon} />
                    <Text style={styles.iconText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={() => setRealEstateModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


      {/* Taxation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={taxationModalVisible}
        onRequestClose={() => setTaxationModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Taxation</Text>
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
                  <Text style={styles.iconText}>{item.name}</Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={otherServicesModelVisible}
        onRequestClose={() => setOtherServicesModelVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Other Services</Text>
            <ScrollView contentContainerStyle={styles.modalContent}>
              {otherServicesItems.map((item, index) => (
                <View key={index} style={styles.modeliconWrapper}>
                  <Image source={item.img} style={styles.icon} />
                  <Text style={styles.iconText}>{item.name}</Text>
                </View>
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
    backgroundColor: '#dbd1bf',
    paddingTop: 35,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    width: '95%',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moreButton: {
    backgroundColor: '#ffa500',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  moreButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
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
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 0,
  },
  iconText: {
    fontSize: 15,
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
});

export default AllServicesScreen;
