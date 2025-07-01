import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const MovieSetupScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const movie = route?.params?.movie;

  const [movieName, setMovieName] = useState(movie?.title || '');
  const [location, setLocation] = useState('');
  const [cinemaName, setCinemaName] = useState('');
  const [screenName, setScreenName] = useState('');
  const [category, setCategory] = useState('2D');

  const availableCinemas = [
    { movieTitle: 'Avengers: Endgame', cinema: 'PVR Mall', location: 'Mumbai' },
    { movieTitle: 'Spider-Man: No Way Home', cinema: 'INOX City Center', location: 'Delhi' },
    { movieTitle: 'John Wick: Chapter 3 – Parabellum', cinema: 'PVR Icon', location: 'Bangalore' },
    { movieTitle: 'The Notebook', cinema: 'Carnival Cinemas', location: 'Chennai' },
    { movieTitle: 'Titanic', cinema: 'Cinepolis High Street', location: 'Pune' },
    { movieTitle: 'The Conjuring', cinema: 'PVR Phoenix', location: 'Hyderabad' },
    { movieTitle: 'It', cinema: 'INOX GVK One', location: 'Hyderabad' },
    { movieTitle: 'A Quiet Place', cinema: 'Wave Cinemas', location: 'Lucknow' },
  ];

  const locations = [...new Set(availableCinemas.map(item => item.location))];
  const cinemas = [...new Set(availableCinemas.map(item => item.cinema))];

  const handleSubmit = () => {
    const isMovieAvailable = availableCinemas.some(
      (entry) =>
        entry.movieTitle.toLowerCase() === movieName.toLowerCase() &&
        entry.cinema.toLowerCase() === cinemaName.toLowerCase() &&
        entry.location.toLowerCase() === location.toLowerCase()
    );

    if (!isMovieAvailable) {
      Alert.alert('Movie Not Available', 'This movie is not showing in the selected theater.');
      return;
    }

    navigation.navigate('MovieSeat', {
      movieName,
      location,
      cinemaName,
      screenName,
      category,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {movie ? (
          <>
            <Image source={movie.image} style={styles.image} />
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.description}>{movie.description}</Text>
            <Text style={styles.label}>Actors: {movie.actors.join(', ')}</Text>
            <Text style={styles.label}>Timings: {movie.availableTimings.join(' | ')}</Text>
          </>
        ) : (
          <Text style={styles.title}>No Movie Selected</Text>
        )}

        <Text style={[styles.title, { marginTop: 30 }]}>Add Movie Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Movie Name"
          value={movieName}
          onChangeText={setMovieName}
        />

        {/* Row with Location, Cinema, Category */}
        <View style={styles.row}>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={location}
                onValueChange={(itemValue) => setLocation(itemValue)}
              >
                <Picker.Item label="Select Location" value="" />
                {locations.map((loc, index) => (
                  <Picker.Item key={index} label={loc} value={loc} />
                ))}
              </Picker>
            </View>
          </View>

         

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                <Picker.Item label="2D" value="2D" />
                <Picker.Item label="3D" value="3D" />
                <Picker.Item label="4D" value="4D" />
                <Picker.Item label="IMAX" value="IMAX" />
              </Picker>
            </View>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Cinema</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={cinemaName}
                onValueChange={(itemValue) => setCinemaName(itemValue)}
              >
                <Picker.Item label="Select Cinema" value="" />
                {cinemas.map((cinema, index) => (
                  <Picker.Item key={index} label={cinema} value={cinema} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Movie</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MovieSetupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  image: {
    width: width * 0.65,
    height: width * 0.9,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#1D154A',
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'justify',
    color: '#444',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    width: '100%',
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
    width: '100%',
  },
  pickerContainer: {
    flex: 1,
    minWidth: width / 3.2,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  submitButton: {
    backgroundColor: '#6200EE',
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});