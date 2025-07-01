import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const PackageDetails = ({ route, navigation }) => {
    const { packageData } = route.params || {}; 

    if (!packageData) {
        return <Text style={styles.errorText}>No package details available.</Text>;
    }

    const dummyImages = [
        require("../assets/packages/krabi.jpg"),
        require("../assets/packages/kerala.jpg"),
        require("../assets/packages/rajasthan.jpeg"),
    ];
    
    const imagesToShow = packageData?.images || dummyImages;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Details</Text>
            </View>

            <ScrollView style={styles.container}>
                {/* Horizontal Image Scroll */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                    {imagesToShow.map((img, index) => (
                        <Image key={index} source={img} style={styles.image} />
                    ))}
                </ScrollView>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{packageData.destination}</Text>
                    <Text style={styles.subText}>{packageData.location}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.originalPrice}>₹ 2,50,000</Text>
                        <Text style={styles.discountedPrice}>₹{packageData.price}</Text>
                    </View>

                    <Text style={styles.itineraryTitle}>🗺️ Itinerary</Text>

                    {/* Day 1 */}
                    <View style={styles.itineraryItem}>
                        <Text style={styles.dayNumber}>📅 Day 1</Text>
                        <View style={styles.itineraryContent}>
                            <Text style={styles.itineraryHeading}>✈️ Arrival & Luxury Hotel Check-in</Text>
                            <Text style={styles.itineraryText}>
                                - Arrival at {packageData.location} airport.{"\n"} 
                                - Private chauffeur pick-up 🚖 to your 5-star sea-facing hotel.{"\n"}  
                                - Relax at the infinity pool or enjoy a spa session 🧖.{"\n"}  
                                - Evening: Welcome dinner 🍽️ with a live music performance.  
                            </Text>
                            <Text style={styles.transport}>🚖 Private Airport Transfer</Text>
                            <Text style={styles.meal}>🍽️ Dinner Included</Text>
                        </View>
                    </View>

                    {/* Day 2 */}
                    <View style={styles.itineraryItem}>
                        <Text style={styles.dayNumber}>🏛️ Day 2</Text>
                        <View style={styles.itineraryContent}>
                            <Text style={styles.itineraryHeading}>🏰 Grand City Tour & Shopping Spree</Text>
                            <Text style={styles.itineraryText}>
                                - Explore historical palaces & temples ⛩️ with a local guide.{"\n"} 
                                - Boat cruise 🚢 on the city's scenic river. {"\n"}
                                - Shop for local handicrafts 🛍️ at the bustling market.{"\n"}  
                                - Enjoy a traditional street food tour 🍜 in the evening.{"\n"}  
                            </Text>
                            <Text style={styles.transport}>🚌 AC Tourist Bus</Text>
                            <Text style={styles.meal}>🍽️ Breakfast & Dinner Included</Text>
                        </View>
                    </View>

                    {/* Day 3 */}
                    <View style={styles.itineraryItem}>
                        <Text style={styles.dayNumber}>🏖️ Day 3</Text>
                        <View style={styles.itineraryContent}>
                            <Text style={styles.itineraryHeading}>🌊 Island Adventure & Water Sports</Text>
                            <Text style={styles.itineraryText}>
                                - Morning speedboat transfer 🚤 to a tropical island.{"\n"}  
                                - Snorkeling 🤿, jet skiing 🏄 & kayaking 🛶 session.{"\n"}  
                                - Beachside seafood BBQ 🍖with fresh catch of the day.{"\n"}  
                                - Sunset yacht cruise ⛵ with champagne.{"\n"}  
                            </Text>
                            <Text style={styles.transport}>🚤 Speedboat & Yacht</Text>
                            <Text style={styles.meal}>🍽️ Breakfast & Dinner Included</Text>
                        </View>
                    </View>

                    {/* Day 4 */}
                    <View style={styles.itineraryItem}>
                        <Text style={styles.dayNumber}>🎭 Day 4</Text>
                        <View style={styles.itineraryContent}>
                            <Text style={styles.itineraryHeading}>🎨 Cultural Immersion & Cooking Class</Text>
                            <Text style={styles.itineraryText}>
                                - Hands-on cooking workshop 👨‍🍳 with a celebrity chef.{"\n"}  
                                - Explore local art galleries 🖼️ & theater 🎭.{"\n"}  
                                - Evening: Traditional folk dance performance 💃.{"\n"}  
                            </Text>
                            <Text style={styles.transport}>🚗 Private Car</Text>
                            <Text style={styles.meal}>🍽️ Breakfast & Dinner Included</Text>
                        </View>
                    </View>

                    {/* Day 5 */}
                    <View style={styles.itineraryItem}>
                        <Text style={styles.dayNumber}>✈️ Day 5</Text>
                        <View style={styles.itineraryContent}>
                            <Text style={styles.itineraryHeading}>🏡 Departure & Farewell</Text>
                            <Text style={styles.itineraryText}>
                                - Morning free time for last-minute shopping.{"\n"}  
                                - Hotel checkout at noon with private transfer to airport.{"\n"}  
                                - Board your flight ✈️ home with unforgettable memories! {"\n"} 
                            </Text>
                            <Text style={styles.transport}>🚖 Private Airport Transfer</Text>
                            <Text style={styles.meal}>🍽️ Breakfast Included</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f8f9fa',
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f5f5f5',
        gap:10,
    },
    backButton: {
        padding: 2,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        flex: 1, 
    },
    imageScroll: { 
        marginVertical: 15,
        paddingLeft: 10,
    },
    image: { 
        width: Dimensions.get('window').width * 0.9,
        height: 220, 
        marginRight: 12, 
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        resizeMode: 'cover',
    },
    detailsContainer: { 
        padding: 20, 
        backgroundColor: '#fff', 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#333', 
        marginBottom: 5,
    },
    subText: { 
        fontSize: 16, 
        color: '#1D154A', 
        fontWeight: '500',   
    },
    priceContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 10 
    },
    originalPrice: { 
        fontSize: 16, 
        color: 'gray', 
        textDecorationLine: 'line-through', 
        marginRight: 8 
    },
    discountedPrice: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#ff5722' 
    },
    itineraryTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#2a9d8f', 
        marginTop: 15, 
        borderBottomWidth: 2, 
        borderBottomColor: '#ddd',
        paddingBottom: 5 
    },
    itineraryItem: { 
        alignItems: 'flex-start', 
        backgroundColor: '#f9f9f9', 
        padding: 10, 
        marginVertical: 6, 
        borderRadius: 8, 
        borderWidth: 1, 
        borderColor: '#ddd' 
    },
    dayNumber: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#0077b6', 
        paddingBottom: 8,
    },
    itineraryContent: {
        flex: 1,
    },
    itineraryHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    itineraryText: { 
        fontSize: 14, 
        color: '#444', 
        flex: 1,
        lineHeight: 20 
    },
    transport: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        color: '#1e88e5', 
        marginTop: 5 
    },
    meal: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        color: 'green', 
        marginTop: 5 
    },
    errorText: {
        padding: 20,
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    }
});

export default PackageDetails;