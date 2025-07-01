import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Rows A-H
const seatsPerRow = 8;

// Pricing logic
const getSeatPrice = (row) => {
  if (['A', 'B', 'C'].includes(row)) return 350;
  if (['D', 'E', 'F'].includes(row)) return 250;
  return 200;
};

// Seat type color config
const seatTypes = {
  royal: { label: 'Royal', borderColor: '#DAA520' },
  premium: { label: 'Premium', borderColor: '#388E3C' },
  normal: { label: 'Normal', borderColor: '#A9A9A9' }
};

const MovieSeatSelectionScreen = ({ route }) => {
  const {
    movieName,
    location,
    cinemaName,
    screenName,
    category
  } = route.params;

  const navigation = useNavigation();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const isSelected = (seatId) => selectedSeats.includes(seatId);

  const totalPrice = selectedSeats.reduce((sum, seatId) => {
    const row = seatId.charAt(0);
    return sum + getSeatPrice(row);
  }, 0);

  const handleBooking = () => {
    navigation.navigate('BookingSummaryScreen', {
      movieName,
      location,
      cinemaName,
      screenName,
      category,
      selectedSeats,
      totalPrice
    });
  };

  const renderSeats = () => {
    return rows.map((row) => (
      <View key={row} style={styles.row}>
        <View style={styles.rowLabelContainer}>
          <Text style={styles.rowLabel}>{row}</Text>
          <Text style={styles.rowPrice}>₹{getSeatPrice(row)}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Array.from({ length: seatsPerRow }).map((_, i) => {
            const seatId = `${row}${i + 1}`;
            const selected = isSelected(seatId);
            const seatType =
              ['A', 'B', 'C'].includes(row)
                ? seatTypes.royal
                : ['D', 'E', 'F'].includes(row)
                ? seatTypes.premium
                : seatTypes.normal;

            return (
              <TouchableOpacity
                key={seatId}
                style={[
                  styles.seat,
                  selected
                    ? { backgroundColor: '#4CAF50' }
                    : {
                        backgroundColor: seatType.color,
                        borderColor: seatType.borderColor
                      },
                  selected && { borderColor: '#4CAF50' }
                ]}
                onPress={() => toggleSeat(seatId)}
              >
                <Text style={styles.seatText}>{i + 1}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Seats for {movieName}</Text>

      {/* Legend */}
      <View style={styles.legend}>
        <View
          style={[
            styles.legendItem,
            { borderColor: seatTypes.royal.borderColor }
          ]}
        >
          <Text style={styles.legendText}>{seatTypes.royal.label}</Text>
        </View>
        <View
          style={[
            styles.legendItem,
            { borderColor: seatTypes.premium.borderColor }
          ]}
        >
          <Text style={styles.legendText}>{seatTypes.premium.label}</Text>
        </View>
        <View
          style={[
            styles.legendItem,
            { borderColor: seatTypes.normal.borderColor }
          ]}
        >
          <Text style={styles.legendText}>{seatTypes.normal.label}</Text>
        </View>
      </View>

      {/* Entire Seat Grid wrapped in ScrollView */}
      <ScrollView contentContainerStyle={styles.seatGridContainer}>
        {renderSeats()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.selectedText}>
          Selected Seats: {selectedSeats.join(', ') || 'None'}
        </Text>
        <Text style={styles.totalPrice}>Total: ₹{totalPrice}</Text>

        <TouchableOpacity
          style={styles.bookButton}
          disabled={selectedSeats.length === 0}
          onPress={handleBooking}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MovieSeatSelectionScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10
  },
  legendItem: {
    width: 80,
    height: 40,
    marginHorizontal: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2
  },
  legendText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000'
  },
  seatGridContainer: {
    flexGrow: 1,
    paddingHorizontal: 6
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  rowLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowLabel: {
    width: 15,
    fontSize: 16,
    fontWeight: '600'
  },
  rowPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#000'
  },
  seat: {
    width: wp('8%'),
    height: hp('4%'),
    margin: 5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2
    
  },
  seatText: {
    color: '#000',
    fontSize: 14
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 15,
    alignItems: 'center'
  },
  selectedText: {
    fontSize: 16,
    marginBottom: 5
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  bookButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 40
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});