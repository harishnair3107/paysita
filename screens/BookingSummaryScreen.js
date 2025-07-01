import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const BookingSummaryScreen = ({ route, navigation }) => {
  const { t } = useTranslation();

  const {
    movieName, location, cinemaName, category, selectedSeats, totalPrice
  } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('booking_summary.title')}</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>{t('booking_summary.movie_name')}:</Text>
        <Text style={styles.detail}>{movieName}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>{t('booking_summary.cinema')}:</Text>
        <Text style={styles.detail}>{cinemaName}</Text>
        <Text style={styles.detail}>{location}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>{t('booking_summary.category')}:</Text>
        <Text style={styles.detail}>{category}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>{t('booking_summary.selected_seats')}:</Text>
        <Text style={styles.detail}>{selectedSeats.join(', ')}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>{t('booking_summary.total_amount')}:</Text>
        <Text style={styles.detail}>₹{totalPrice}</Text>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => alert(t('booking_summary.booking_confirmed'))}
      >
        <Text style={styles.confirmButtonText}>
          {t('booking_summary.confirm_booking')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>
          {t('booking_summary.go_back')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  detail: {
    fontSize: 18,
    color: '#555',
  },
  confirmButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});