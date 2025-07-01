import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  containerss: {
    marginTop: 20,
    marginBottom:-10,
    marginLeft:-3,
    marginRight:-3,
  },
  image: {
    width: wp('98.4'),
    height: hp('16.8%'),
    resizeMode: "cover",
    marginBottom:-15,
  },
  cardContainers: {
    backgroundColor: '#fff',            // white card background
    borderRadius: 12,                   // rounded corners
    borderWidth: 1,                     // border width
    borderColor: '#e0e0e0',             // light grey border
    padding: 5,                        // space inside
    margin: 0,                         // space outside
    shadowColor: '#000',               // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,                      // Android shadow
    flexDirection: 'row',              // horizontal layout if needed
    alignItems: 'center',              // vertical alignment
    justifyContent: 'space-between',
    width:180,

  },
  cardText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  insuranceRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftCard: {
    top: 0,
    left: 0,
  },
  rightCard: {
    bottom: 0,
    left: 220,
  },
  insuranceCard: {
    alignItems: 'center',
    width: 100,
    marginHorizontal: 8,
  },
  insuranceImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  insuranceName: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
  viewMoreText: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 10,
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  insuranceListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    borderRadius: 11,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    marginTop: 6,
    backgroundColor: 'transparent',
  },
  iconWrapper: {
    marginRight: 9,
    backgroundColor: '#1d154a',
    padding: 6,
    borderRadius: 50,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 14,
    color: '#00000',
    textShadowColor: 'rgba(0, 122, 255, 0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  greeting: { fontSize: 24, marginBottom: 20 },
  circleText: { fontSize: 20, fontWeight: "bold", color: "#FFF" },
  text: { 
    textAlign: "center",
     marginTop: 20, 
     fontSize: 18
     },

    sliderContainer: {
      height: hp('20%'),
      marginVertical: 2,
      
    },
    sliderContainers: {
      height: hp('10%'),
      marginVertical: 5,
    },
    sliderItems: {
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      backgroundColor: "#ffa560",
      marginHorizontal: 5.7,
      borderRadius: 10,
    },
    sliderItem: {
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      backgroundColor: "#1d1534",
      marginHorizontal: 5.7,
      borderRadius: 10,
    },
    sliderTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 10,
    },
    sliderSubtitle: {
      fontSize: 14,
      color: "#fff",
      textAlign:"center",
    },
    sliderTitles: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#1d154a",
      marginBottom: 10,
    },
    sliderSubtitles: {
      fontSize: 14,
      color: "#1d15ab",
      textAlign:"center",
    },
    dotsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#fff",
      margin: 5,
    },
    dotActive: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#ffa500",
      margin: 5,
    },
  
  
  transferSection: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 2,
    borderRadius: 10,
  },
  transferTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  transferButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upiContainer: {
    marginTop: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upiText: {
    fontSize: 12,
    marginTop: 2,
    color: 	'#5E5CE6',
    textShadowColor: 'rgba(0, 122, 255, 0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#FFD700",
    padding: 4,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  upiHighlight: {
    color: "#ffa540",
    fontWeight: "bold",
  },
  circle: {
    position: 'absolute',
    top: -17,
    left: 7,
    width: 45,
    height:45,
    borderRadius: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  circleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  
// recharge and bill 
container: {
  flex: 1,
  backgroundColor: "#fff",
  padding: 10,
  marginTop: -20,
  paddingBottom: 4,
 
},
card: {
  backgroundColor: "#fff",
  padding: 0,
  borderRadius: 10,
  marginTop: -4,
  marginBottom:10,
},
header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},
headerText: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#333",
},
viewAllButton: {
  backgroundColor: "#fff",
  paddingVertical: 4,
  paddingHorizontal: 12,
  borderRadius: 12,
},
viewAllText: {
  fontSize: 10,
  color: "#fff",
  fontWeight: "bold",
  backgroundColor: "#b2762d",
  // paddingVertical: 4,
  // paddingHorizontal: 12,
  // borderRadius: 12,
},
serviceRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 14,
},
serviceItem: {
  alignItems: "center",
  width: 80,
},
serviceImage: {
  width: 28,
  height: 30,
  resizeMode: "contain",
},
serviceText: {
  fontSize: 11,
  color: "#000",
  textAlign: "center",
  marginTop: 5,
  fontWeight: "bold",
},
serviceItems: {
  alignItems: "center",
  width: 80,
},
serviceImages: {
  width: 40,
  height: 40,
  resizeMode: "contain",
},
serviceTexts: {
  fontSize: 12,
  color: "#000",
  textAlign: "center",
  marginTop: 5,
  fontWeight: "bold",
},
modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
},
modalContent: {
  width: "0%",
  backgroundColor: "#fff",
  justifyContent:"center",
  padding: 20,
  borderRadius: 10,
},
modalTitle: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 10,
  textAlign: "center",
},
modalServiceContainer: {
  flexDirection: "row",
  flexWrap: "wrap",

  justifyContent: "space-around", // Align items with space in between
},

modalServiceItem: {
  alignItems: "center",
  width: "48%", // This will allow for 2 columns with some space
  marginBottom: 15,
},

// // If you want 3 columns, you can change width to 32% like this:
// modalServiceItem3Columns: {
//   alignItems: "center",
//   width: "32%", // 3 columns with space in between
//   marginBottom: 15,
// },

modalServiceImage: {
  width: 30,
  height: 30,
  resizeMode: "contain",
},
modalServiceText: {
  fontSize: 12,
  textAlign: "center",
  marginTop: 5,
  fontWeight: "bold",
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
  // Job & Hire Section
  buttonContainer: {
    flexDirection: "row",
    marginTop: -10,
    marginBottom: -10,
  },
  jobButton: {
    backgroundColor: "#50B5AD",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 2,
    borderRightWidth: 0,
    borderColor: "#1d154a",
    flexDirection: "row",
    alignItems: "center",
   borderBottomLeftRadius:10,
   borderTopLeftRadius:10,
    width: wp('48'),
    height: hp('8.4'),
    marginLeft:wp("-1%"),
   
  },
  jobImage: {
    marginTop:1.1,
    borderRightWidth: 0,
    borderColor: "#1d154a",
    borderBottomLeftRadius:10,
    borderTopLeftRadius:10,
    width: wp('20'),
    height: hp('8.2'),
    marginLeft:-1,
    marginRight: 13,
  },
  jobText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  hireButton: {
    backgroundColor: "#50B5AD",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#1d154a",
    flexDirection: "row",
    alignItems: "center",
    borderRightRadius: 10,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
    width: wp('50'),
    height: hp('8.4'),
  },
  hireImage: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftRadius:20,
    borderColor: "#1d154a",
    width: wp('20'),
    height: hp('8.1'),
    marginRight: 13,
    marginTop:0,
  },
  hireText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },

  // Insurance Section
  insuranceContainer: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    paddingBottom: 2,
    marginTop: 5,
  },
  insuranceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  insuranceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllButton: {
    backgroundColor: "#b2762d",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  viewAllText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  insuranceGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  insuranceItem: {
    alignItems: "center",
    width: 80,
  },
  insuranceImage: {
    width: 28,
    height: 30,
    resizeMode: "contain",
  },
  insuranceText: {
    fontSize: 11,
    color: "#000",
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  modalItem: {
    alignItems: "center",
    width: 100,
    marginBottom: 15,
  },
  modalImage: {
    width: 30,
    height: 35,
    resizeMode: "contain",
  },
  modalText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
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
  container: {
    backgroundColor: "#fff",
    padding: 9,
    borderRadius: 10,
    marginTop: 5,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllButton: {
    backgroundColor: "#b2762d",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  viewAllText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  categoryItem: {
    alignItems: "center",
    width: 80,
  },
  categoryImage: {
    width: 28,
    height: 30,
    resizeMode: "contain",
  },
  categoryText: {
    fontSize: 11,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 1,
  },
  scrollContainer: {
    marginTop: -10,
    paddingHorizontal: 0,
    marginBottom: -10,
  },
  ticketItem: {
    borderRadius: 10,
    marginRight: 10,
  },
  ticketImage: {
    width: 200,
    height: 70,
    borderRadius: 10,
    resizeMode: "contain",
  },
  container: {
    backgroundColor: "#fff",
    padding: 7,
    borderRadius: 10,
    marginTop: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllButton: {
    backgroundColor: "#b2762d",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  viewAllText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  travelOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 14,
    marginTop: 10,
  },
  travelOption: {
    alignItems: "center",
    width: 80,
  },
  travelImage: {
    width: 28,
    height: 30,
    resizeMode: "contain",
  },
  travelText: {
    fontSize: 11,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 2,
  },
  imageSliderContainer: {
    marginTop: 1,
    height: 200,
  },
  sliderImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 2,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#bbb",
    marginHorizontal: 5,
  },
  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: "#ffa500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  travelOptionWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  travelOptionItem: {
    alignItems: "center",
    width: 100,
    marginBottom: 15,
  },
  modalImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  modalText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
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
  container: {
    backgroundColor: "#fff",
    padding: 10,
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