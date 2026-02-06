import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  StatusBar,
  Pressable,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../theme/Theme";

const AllServicesScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);

  const [homeServicesModalVisible, setHomeServicesModalVisible] = useState(false);
  const [taxationModalVisible, setTaxationModalVisible] = useState(false);
  const [otherServicesModelVisible, setOtherServicesModelVisible] = useState(false);
  const [realEstateModalVisible, setRealEstateModalVisible] = useState(false);

  //home service
  const homeServicesItems = [
    {
      key: "interior_designer",
      img: require("../assets/interior.png"),
      screen: "HomeServiceFormScreen",
    },
    {
      key: "painting",
      img: require("../assets/painting.png"),
      screen: "HomeServiceFormScreen",
    },
    {
      key: "vastu_consultant",
      img: require("../assets/vastu.png"),
      screen: "HomeServiceFormScreen",
    },
    {
      key: "house_cleaning",
      img: require("../assets/cleaning.png"),
      screen: "HomeServiceFormScreen",
    },
    {
      key: "pest_control",
      img: require("../assets/pest_control.png"),
      screen: "HomeServiceFormScreen",
    },
    {
      key: "civil_work",
      img: require("../assets/civil_work.png"),
      screen: "HomeServiceFormScreen",
    },
    {
      key: "wiring_rewiring",
      img: require("../assets/wiring.png"),
      screen: "HomeServiceFormScreen",
    },
    {
      key: "water_proofing",
      img: require("../assets/waterproofing.png"),
      screen: "HomeServiceFormScreen",
    },
  ];

  const realEstateItems = [
    {
      key: "flat",
      img: require("../assets/flat.png"),
      screen: "RealEstateFormScreen",
      url:{
        buy:"https://shelterbig.com/search",
        sell:"https://shelterbig.com/profile",
        rent:"https://shelterbig.com/search",
      }
    },
    {
      key: "Villa",
      img: require("../assets/bungalow.png"),
      screen: "RealEstateFormScreen",
      url:{
        buy:"https://shelterbig.com/search",
        sell:"https://shelterbig.com/profile",
        rent:"https://shelterbig.com/search",
      }
    },
    {
      key: "PG",
      img: require("../assets/shops.png"),
      screen: "RealEstateFormScreen",
      url:{
        buy:"https://shelterbig.com/search",
        sell:"https://shelterbig.com/profile",
        rent:"https://shelterbig.com/search",
      }
    },
    {
      key: "Commercial",
      img: require("../assets/factory.png"),
      screen: "RealEstateFormScreen",
      url:{
        buy:"https://shelterbig.com/search",
        sell:"https://shelterbig.com/profile",
        rent:"https://shelterbig.com/search",
      }
    },
    {
      key: "plot_land",
      img: require("../assets/agriculture_land.png"),
      screen: "RealEstateFormScreen",
      url:{
        buy:"https://shelterbig.com/search",
        sell:"https://shelterbig.com/profile",
        rent:"https://shelterbig.com/search",
      }
    },
    
  ];

  const taxationItems = [
    {
      key: "itr_filing",
      img: require("../assets/ITR.png"),
      url:"https://mtax.in/"
    },
    {
      key: "company_formation",
      img: require("../assets/company_formation.png"),
      url:"https://mtax.in/"
    },
    { key: "gst", img: require("../assets/gst.png"), screen: "GSTFormScreen" },
    {
      key: "company_audit",
      img: require("../assets/company_audit.png"),
      url:"https://mtax.in/"
    },
    {
      key: "society_audit",
      img: require("../assets/society_Audit.png"),
     url:"https://mtax.in/"
    },
    {
      key: "business_financial_advisory",
      img: require("../assets/business_financial.png"),
      url:"https://mtax.in/"
    },
    {
      key: "corporate_legal_compliance",
      img: require("../assets/corporate_legal.png"),
      url:"https://mtax.in/"
    },
    {
      key: "banking_investment_services",
      img: require("../assets/banking_investment.png"),
      url:"https://mtax.in/"
    },
  ];

  const freeZonePills = [
    {
      label: t("service.free_meal"),
      color: "#191970",
      img: require("../assets/buffet_breakfast.png"),
    },
    {
      label: t("service.free_cloth"),
      color: "#008000",
      img: require("../assets/clothespill.png"),
    },
    {
      label: t("service.free_book"),
      color: "#FF0000",
      img: require("../assets/bookpill.png"),
    },
    {
      label: t("service.free_stay"),
      color: "#C2A34B",
      img: require("../assets/personpill.png"),
    },
  ];

  const EducationalServicesItems = [
    {
      name: t("service.degree"),
      img: require("../assets/degree.png"),
      screen: "EducationalFormScreen",
    },
    {
      name: t("service.diploma"),
      img: require("../assets/diploma.png"),
      screen: "EducationalFormScreen",
    },
    {
      name: t("service.courses"),
      img: require("../assets/courses.png"),
      screen: "EducationalFormScreen",
    },
    {
      name: t("service.competitive_examination"),
      img: require("../assets/competitive_examination.png"),
      screen: "EducationalFormScreen",
    },
  ];

  const otherServicesItems = [
    {
      key: "legal_consulting",
      img: require("../assets/legal_consulting.png"),
      screen: "OtherServicesFormScreen",
    },
    {
      key: "registration_services",
      img: require("../assets/registation_services.png"),
      screen: "OtherServicesFormScreen",
    },
    {
      key: "web_app_developer",
      img: require("../assets/web-app_developer.png"),
      screen: "OtherServicesFormScreen",
    },
    {
      key: "metromony",
      img: require("../assets/metromony.png"),
      screen: "OtherServicesFormScreen",
    },
    {
      key: "marriage_registration",
      img: require("../assets/marriage_registration.png"),
      screen: "OtherServicesFormScreen",
    },
    {
      key: "digital_marketing",
      img: require("../assets/digital_marketing.png"),
      screen: "OtherServicesFormScreen",
    },
    {
      key: "sales_agreement",
      img: require("../assets/sales_agreement.png"),
      screen: "OtherServicesFormScreen",
    },
    {
      key: "sales_deed",
      img: require("../assets/sales_deed.png"),
      screen: "OtherServicesFormScreen",
    },
    {
      key: "udyam_gst_registration",
      img: require("../assets/udyam-gst_registration.png"),
      screen: "OtherServicesFormScreen",
    },
  ];

  const donationCharityItems = [
    {
      name: t("service.donation"),
      img: require("../assets/donation.png"),
      screen: "DonationAndCharityFormScreen",
    },
    {
      name: t("service.charity"),
      img: require("../assets/charity.png"),
      screen: "DonationAndCharityFormScreen",
    },
    {
      name: t("service.devotion"),
      img: require("../assets/devotion.png"),
      screen: "DonationAndCharityFormScreen",
    },
    {
      name: t("service.blood_donation"),
      img: require("../assets/blood_donation.png"),
      screen: "DonationAndCharityFormScreen",
    },
  ];

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]} edges={["top", "left", "right"]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          android_ripple={{ color: "rgba(0, 0, 0, 0.1)", borderless: true }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          All Services
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Explore Free Zone Section */}
        <View style={[styles.container, { backgroundColor: colors.option }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t("service.explore_free_zone")}
          </Text>

          <View style={styles.iconRow}>
            {[
              {
                name: t("service.courses"),
                img: require("../assets/courses1.png"),
              },
              {
                name: t("service.seminars"),
                img: require("../assets/seminars.png"),
              },
              {
                name: t("service.events"),
                img: require("../assets/events.png"),
              },
              {
                name: t("service.astrology"),
                img: require("../assets/astrology.png"),
              },
            ].map((item, index) => (
              <View key={index} style={styles.iconWrapper}>
                <Image source={item.img} style={styles.icon} />
                <Text style={[styles.iconText, { color: colors.text }]}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.freeZonePillsRow}>
            {freeZonePills.map((pill, index) => (
              <View
                key={index}
                style={[
                  styles.pill,
                  {
                    backgroundColor: pill.color,
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                  },
                ]}
              >
                <Text style={styles.pillText}>{pill.label}</Text>
                <Image source={pill.img} style={styles.pillImage} />
              </View>
            ))}
          </View>
        </View>

        {/* Home Services Section */}
        <View style={[styles.container, { backgroundColor: colors.option }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t("service.home_services")}
            </Text>
            <TouchableOpacity
              onPress={() => setHomeServicesModalVisible(true)}
              style={styles.moreButton}
            >
              <Text style={styles.moreButtonText}>{t("buttons.view_all")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconRow}>
            {homeServicesItems.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.iconWrapper}
                onPress={() => navigation.navigate(item.screen)}
              >
                <Image source={item.img} style={styles.icon} />
                <Text style={[styles.iconText, { color: colors.text }]}>
                  {t(`service.${item.key}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Real Estate Section */}
        <View style={[styles.container, { backgroundColor: colors.option }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t("service.real_estate")}
            </Text>
            <TouchableOpacity
              onPress={() => setRealEstateModalVisible(true)}
              style={styles.moreButton}
            >
              <Text style={styles.moreButtonText}>{t("buttons.view_all")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconRow}>
            {realEstateItems.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.iconWrapper}
                onPress={() =>navigation.navigate(item.screen, {urls: item.url,type: item.key,})}
              >
                <Image source={item.img} style={styles.icon} />
                <Text style={[styles.iconText, { color: colors.text }]}>
                  {t(`service.${item.key}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Taxation Section */}
        <View style={[styles.container, { backgroundColor: colors.option }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t("service.taxation")}
            </Text>
            <TouchableOpacity
              onPress={() => setTaxationModalVisible(true)}
              style={styles.moreButton}
            >
              <Text style={styles.moreButtonText}>{t("buttons.view_all")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconRow}>
            {taxationItems.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.iconWrapper}
                onPress={() => Linking.openURL(item.url)}
              >
                <Image source={item.img} style={styles.icon} />
                <Text style={[styles.iconText, { color: colors.text }]}>
                  {t(`taxation.${item.key}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Educational Services */}
        <View style={[styles.container, { backgroundColor: colors.option }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t("service.educational_services")}
            </Text>
          </View>
          <View style={styles.iconRow}>
            {EducationalServicesItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.iconWrapper}
                onPress={() => navigation.navigate(item.screen)}
              >
                <Image source={item.img} style={styles.icon} />
                <Text style={[styles.iconText, { color: colors.text }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Other Services */}
        <View style={[styles.container, { backgroundColor: colors.option }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t("section_titles.other_services")}
            </Text>
            <TouchableOpacity
              onPress={() => setOtherServicesModelVisible(true)}
              style={styles.moreButton}
            >
              <Text style={styles.moreButtonText}>{t("buttons.view_all")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconRow}>
            {otherServicesItems.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.iconWrapper}
                onPress={() => navigation.navigate(item.screen)}
              >
                <Image source={item.img} style={styles.icon} />
                <Text style={[styles.iconText, { color: colors.text }]}>
                  {t(`servic.${item.key}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Donation & Charity */}
        <View style={[styles.container, { backgroundColor: colors.option }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t("service.donation_and_charity")}
            </Text>
          </View>
          <View style={styles.iconRow}>
            {donationCharityItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.iconWrapper}
                onPress={() => navigation.navigate(item.screen)}
              >
                <Image source={item.img} style={styles.icon} />
                <Text style={[styles.iconText, { color: colors.text }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Real Estate Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={realEstateModalVisible}
        onRequestClose={() => setRealEstateModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContainer, { backgroundColor: colors.option }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t("service.real_estate")}
            </Text>
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
                  <Text style={[styles.iconText, { color: colors.text }]}>
                    {t(`service.${item.key}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setRealEstateModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Home Services Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={homeServicesModalVisible}
        onRequestClose={() => setHomeServicesModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContainer, { backgroundColor: colors.option }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t("service.home_services")}
            </Text>
            <ScrollView contentContainerStyle={styles.modalContent}>
              {homeServicesItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modeliconWrapper}
                  onPress={() => {
                    setHomeServicesModalVisible(false);
                    navigation.navigate(item.screen);
                  }}
                >
                  <Image source={item.img} style={styles.icon} />
                  <Text style={[styles.iconText, { color: colors.text }]}>
                    {t(`service.${item.key}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setHomeServicesModalVisible(false)}
              style={styles.closeButton}
            >
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
          <View style={[styles.modalContainer, { backgroundColor: colors.option }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t("service.taxation")}
            </Text>
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
                  <Text style={[styles.iconText, { color: colors.text }]}>
                    {t(`taxation.${item.key}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setTaxationModalVisible(false)}
              style={styles.closeButton}
            >
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
          <View style={[styles.modalContainer, { backgroundColor: colors.option }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t("section_titles.other_services")}
            </Text>
            <ScrollView contentContainerStyle={styles.modalContent}>
              {otherServicesItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modeliconWrapper}
                  onPress={() => {
                    setOtherServicesModelVisible(false);
                    navigation.navigate(item.screen);
                  }}
                >
                  <Image source={item.img} style={styles.icon} />
                  <Text style={[styles.iconText, { color: colors.text }]}>
                    {t(`service.${item.key}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setOtherServicesModelVisible(false)}
              style={styles.closeButton}
            >
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  scrollContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  container: {
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  moreButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  moreButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 11,
  },
  iconRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 8,
  },
  iconWrapper: {
    alignItems: "center",
    width: "22%",
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: 6,
  },
  iconText: {
    fontSize: 11,
    textAlign: "center",
    fontWeight: "600",
  },
  freeZonePillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 8,
    gap: 8,
  },
  pill: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 6,
  },
  pillImage: {
    width: 12,
    height: 12,
  },
  pillText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 10,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    maxHeight: "75%",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  modalContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  modeliconWrapper: {
    width: "45%",
    alignItems: "center",
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 12,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});

export default AllServicesScreen;