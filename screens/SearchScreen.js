import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
const allItems = [
        { id: '1', name: 'Mobile Recharge', screen: 'MobileStack' },
        { id: '2', name: 'Electricity Bill', screen: 'PayStack' },
        { id: '3', name: 'DTH Recharge', screen: 'DTHStack' },
        { id: '4', name: 'Credit Card Payment', screen: 'CCStack' },
        { id: '5', name: 'Piped Gas', screen: 'GasStack' },
        { id: '7', name: 'Wifi Recharge', screen: 'WifiStack' },
        { id: '8', name: 'Loan Payment', screen: 'LoanStack' },
        { id: '9', name: 'Term Insurance', screen: 'GeneralInsuranceFormScreen' },
        { id: '10', name: 'Health Insurance', screen: 'HealthInsuranceFormScreen' },
        { id: '11', name: 'Home Insurance', screen: 'GeneralInsuranceFormScreen' },
        { id: '12', name: 'Car Insurance', screen: 'GeneralInsuranceFormScreen' },
        { id: '13', name: 'Bike Insurance', screen: 'GeneralInsuranceFormScreen' },
        { id: '14', name: 'Marine Insurance', screen: 'GeneralInsuranceFormScreen' },
        { id: '15', name: 'Machinary Insurance', screen: 'GeneralInsuranceFormScreen' },
        { id: '16', name: 'Employee Group Insurance', screen: 'GeneralInsuranceFormScreen' },
        { id: '17', name: 'Travel Insurance', screen: 'GeneralInsuranceFormScreen' },
        { id: '18', name: 'Flight Tickets', screen: 'flight1' },
        { id: '19', name: 'Hotel Booking', screen: 'TourAndTravelsFormScreen' },
        { id: '20', name: 'Packages', screen: 'PackagesStack' },
        { id: '21', name: 'Bus Booking', screen: 'TourAndTravelsFormScreen' },
        { id: '22', name: 'Personal Loan', screen: 'LoanFormScreen' },
        { id: '23', name: 'Business Loan', screen: 'LoanFormScreen' },
        { id: '24', name: 'Home Loan', screen: 'LoanFormScreen' },
        { id: '25', name: 'Gold Loan', screen: 'LoanFormScreen' },
        { id: '26', name: 'Home Loan Transfer', screen: 'LoanFormScreen' },
        { id: '27', name: 'Home Renovation Loan', screen: 'LoanFormScreen' },
        { id: '28', name: 'Education Loan', screen: 'LoanFormScreen' },
        { id: '29', name: 'Loan Against Property', screen: 'LoanFormScreen' },
        { id: '30', name: 'Loan Against Shares', screen: 'LoanFormScreen' },
        { id: '31', name: 'SME Finance', screen: 'LoanFormScreen' },
        { id: '32', name: 'Project Finance', screen: 'LoanFormScreen' },
        { id: '33', name: 'Vehicle Loan', screen: 'LoanFormScreen' },
        { id: '34', name: 'Construction Finance', screen: 'LoanFormScreen' },
        { id: '35', name: 'School/Hotel Finance', screen: 'LoanFormScreen' },
        { id: '36', name: 'LRD Lease Rental Finance', screen: 'LoanFormScreen' },
        { id: '37', name: 'SIP Investment', screen: 'InvestmentFormScreen' },
        { id: '38', name: 'Shares Investment', screen: 'InvestmentFormScreen' },
        { id: '39', name: 'Mutual Funds Investment', screen: 'InvestmentFormScreen' },
        { id: '40', name: 'Bonds Investment', screen: 'InvestmentFormScreen' },
        { id: '41', name: 'Child Plan Investment', screen: 'InvestmentFormScreen' },
        { id: '42', name: 'Pension Plan Investment', screen: 'InvestmentFormScreen' },
        { id: '43', name: 'NSC Investment', screen: 'InvestmentFormScreen' },
        { id: '44', name: 'NCD Investment', screen: 'InvestmentFormScreen' },
        { id: '45', name: 'NFO Investment', screen: 'InvestmentFormScreen' },
        { id: '46', name: 'PPF Investment', screen: 'InvestmentFormScreen' },
        { id: '47', name: 'RD Investment', screen: 'InvestmentFormScreen' },
        { id: '48', name: 'Treasuring Bills Investment', screen: 'InvestmentFormScreen' },
        { id: '49', name: 'Interior Designer', screen: 'HomeServiceFormScreen' },
        { id: '50', name: 'Painting', screen: 'HomeServiceFormScreen' },
        { id: '51', name: 'Vastu Consultant', screen: 'HomeServiceFormScreen' },
        { id: '52', name: 'House Cleaning', screen: 'HomeServiceFormScreen' },
        { id: '53', name: 'Pest Control', screen: 'HomeServiceFormScreen' },
        { id: '54', name: 'Civil Work', screen: 'HomeServiceFormScreen' },
        { id: '55', name: 'Wiring & Rewiring', screen: 'HomeServiceFormScreen' },
        { id: '56', name: 'Water Proofing', screen: 'HomeServiceFormScreen' },
        { id: '57', name: 'Flat', screen: 'RealEstateFormScreen' },
        { id: '58', name: 'Bungalow', screen: 'RealEstateFormScreen' },
        { id: '59', name: 'Shop', screen: 'RealEstateFormScreen' },
        { id: '60', name: 'Factory', screen: 'RealEstateFormScreen' },
        { id: '61', name: 'Agriculture Land', screen: 'RealEstateFormScreen' },
        { id: '62', name: 'R Zone Land', screen: 'RealEstateFormScreen' },
        { id: '63', name: 'N.A Plot', screen: 'RealEstateFormScreen' },
        { id: '64', name: 'School/Hotel', screen: 'RealEstateFormScreen' },
        { id: '65', name: 'ITR Filling', screen: 'ITRScreen' },
        { id: '66', name: 'Company Formation', screen: 'ITRScreen' },
        { id: '67', name: 'GST', screen: 'GSTFormScreen' },
        { id: '68', name: 'Company Audit', screen: 'ITRScreen' },
        { id: '69', name: 'Society Audit', screen: 'ITRScreen' },
        { id: '70', name: 'Business & Financial Advisory', screen: 'ITRScreen' },
        { id: '71', name: 'Corporate & Legal Compliance', screen: 'ITRScreen' },
        { id: '72', name: 'Banking & Investment Services', screen: 'ITRScreen' },
        { id: '73', name: 'Degree', screen: 'EducationalFormScreen' },
        { id: '74', name: 'Diploma', screen: 'EducationalFormScreen' },
        { id: '75', name: 'Courses', screen: 'EducationalFormScreen' },
        { id: '76', name: 'Competitive Examination', screen: 'EducationalFormScreen' },
        { id: '77', name: 'Legal Consulting', screen: 'OtherServicesFormScreen' },
        { id: '78', name: 'Registration Services', screen: 'OtherServicesFormScreen' },
        { id: '79', name: 'Web/App Developer', screen: 'OtherServicesFormScreen' },
        { id: '80', name: 'Metromony', screen: 'OtherServicesFormScreen' },
        { id: '81', name: 'Marriage Registration', screen: 'OtherServicesFormScreen' },
        { id: '82', name: 'Digital Marketing', screen: 'OtherServicesFormScreen' },
        { id: '83', name: 'Sales Agreement', screen: 'OtherServicesFormScreen' },
        { id: '84', name: 'Sales Deed', screen: 'OtherServicesFormScreen' },
        { id: '85', name: 'Udyam/GST Registration', screen: 'OtherServicesFormScreen' },
        { id: '86', name: 'Donation', screen: 'DonationAndCharityFormScreen' },
        { id: '87', name: 'Charity', screen: 'DonationAndCharityFormScreen' },
        { id: '88', name: 'Devotion', screen: 'DonationAndCharityFormScreen' },
        { id: '89', name: 'Blood Donation', screen: 'DonationAndCharityFormScreen' },
        { id: '90', name: 'Profile Setting', screen: 'profile' },
        { id: '91', name: 'UPI Management', screen: 'upimangement' },
        { id: '92', name: 'History', screen: 'history' },
        { id: '93', name: 'Security', screen: 'Security' },
        { id: '94', name: 'Help & Support', screen: 'HelpAndSupport',},
        { id: '95', name: 'Change languages', screen: 'ChangeLanguage',},
        { id: '96', name: 'About IndiayaPay', screen: 'AboutUs',},
        { id: '97', name: 'Coins Earned', screen: 'CoinsEarned',},
        { id: '98', name: 'Manage Notification', screen: 'ManageNotification',},
        { id: '99', name: 'Account Security Tips', screen: 'AccountSecurityTips',},
        { id: '100', name: 'Financial Details', screen: 'FinancialDetails',},
        { id: '101', name: 'Additional Details', screen: 'AdditionalDetails',},
        { id: '102', name: 'UPI ID', screen: 'ManageUPIid',},
        { id: '103', name: 'MY QR', screen: 'QRcode',},
        { id: '104', name: 'Change UPI Pin', screen: 'changeupipin',},
        { id: '105', name: 'Current Bank', screen: 'currentBank',},
        { id: '106', name: 'Add Bank Account', screen: 'addbankaccount',},
        { id: '107', name: 'Add Rupay Credit Card', screen: 'addrupaycc',},
        { id: '108', name: 'Active UPI Lite', screen: 'UPILite',},
        { id: '109', name: 'Add Credit Line on UPI', screen: 'addcreditline',},
        { id: '110', name: 'Transaction History', screen: 'transaction',},
        { id: '111', name: 'Referral History', screen: 'referralhistory',},
        { id: '112', name: 'CashBack History', screen: 'cashbackhistory',},
        { id: '113', name: 'Permission', screen: 'Permisions',},
        { id: '114', name: 'Set Up Passcode', screen: 'SetupPasscode',},
        { id: '115', name: 'Set New Passcode', screen: 'SetNewPasscode',},
        { id: '116', name: 'Deals & Rewards', screen: 'DealsRewards',},

      ];
      // Dummy frequent items (you can modify based on real user behavior)
const frequentItems = [
    { id: '1', name: 'Mobile Recharge', screen: 'MobileStack' },
    { id: '2', name: 'Electricity Bill', screen: 'PayStack' },
    { id: '4', name: 'Credit Card Payment', screen: 'CCStack' },
  ];
      export default function SearchScreen() {
        const [searchText, setSearchText] = useState('');
        const navigation = useNavigation();
      
        const filteredItems = searchText.trim() === ''
          ? frequentItems
          : allItems.filter(item =>
              item.name.toLowerCase().includes(searchText.trim().toLowerCase())
            );
      
        const handleItemPress = (item) => {
          navigation.navigate(item.screen);
        };
      
        return (
          <View style={styles.container}>
               <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 4,marginTop:20, }}>
                 <Ionicons name="arrow-back" size={25} color="#444" />
         </Pressable>
            <TextInput
              placeholder="Search for a service..."
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
              autoFocus
            />
      
            {searchText.trim() === '' && (
              <Text style={styles.sectionTitle}>Frequently Searched</Text>
            )}
      
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.resultItem} onPress={() => handleItemPress(item)}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                searchText.trim() !== '' && (
                  <Text style={styles.noResultText}>No results found</Text>
                )
              }
            />
          </View>
        );
      }
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 16,
          backgroundColor: '#fff',
        },
        searchInput: {
          height: 60,
          borderRadius: 8,
          backgroundColor: '#f1f1f1',
          paddingHorizontal: 20,
          fontSize: 16,
          marginBottom: 20,
          marginTop: 20,
        },
        sectionTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          marginVertical: 10,
          color: '#333',
        },
        resultItem: {
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        },
        itemText: {
          fontSize: 16,
          color: '#333',
        },
        noResultText: {
          textAlign: 'center',
          marginTop: 20,
          fontSize: 16,
          color: 'grey',
        },
      });