import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, ScrollView ,Pressable} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Replace these with the paths to your images in the assets folder
const movies = [
  // Action Category
  {
    id: '1',
    title: 'Avengers: Endgame',
    image: require('../assets/avengers.jpeg'), // Replace with actual asset path
    category: 'Action',
    availableTimings: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
    description: 'The Avengers must reunite to undo the destruction caused by Thanos.',
    actors: ['Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo'],
  },
  {
    id: '2',
    title: 'Spider-Man: No Way Home',
    image: require('../assets/spider.jpeg'), // Replace with actual asset path
    category: 'Action',
    availableTimings: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
    description: 'Spider-Man faces a multiverse of danger as villains from other dimensions arrive.',
    actors: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch'],
  },
//   {
//     id: '3',
//     title: 'Mission: Impossible – Fallout',
//     image: require('./assets/.jpg'), // Replace with actual asset path
//     category: 'Action',
//     availableTimings: ['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
//     description: 'Ethan Hunt and his IMF team must track down a nuclear weapon.',
//     actors: ['Tom Cruise', 'Henry Cavill', 'Simon Pegg'],
//   },
  {
    id: '4',
    title: 'Mad Max: Fury Road',
    image: require('../assets/mad.jpeg'), // Replace with actual asset path
    category: 'Action',
    availableTimings: ['1:00 PM', '4:00 PM', '7:00 PM'],
    description: 'Max teams up with Furiosa to escape a warlord in a post-apocalyptic wasteland.',
    actors: ['Tom Hardy', 'Charlize Theron'],
  },
  {
    id: '5',
    title: 'John Wick: Chapter 3 – Parabellum',
    image: require('../assets/john.jpeg'), // Replace with actual asset path
    category: 'Action',
    availableTimings: ['2:00 PM', '5:00 PM', '8:00 PM'],
    description: 'John Wick is on the run after being declared excommunicado.',
    actors: ['Keanu Reeves', 'Halle Berry', 'Ian McShane'],
  },

  // Romantic Category
  {
    id: '6',
    title: 'The Notebook',
    image: require('../assets/the.jpeg'), // Replace with actual asset path
    category: 'Romantic',
    availableTimings: ['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
    description: 'A couple falls in love despite the challenges they face.',
    actors: ['Ryan Gosling', 'Rachel McAdams'],
  },
  {
    id: '7',
    title: 'La La Land',
    image: require('../assets/la.jpeg'), // Replace with actual asset path
    category: 'Romantic',
    availableTimings: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
    description: 'A jazz musician and an aspiring actress fall in love, but their dreams pull them apart.',
    actors: ['Ryan Gosling', 'Emma Stone'],
  },
  {
    id: '8',
    title: 'Titanic',
    image: require('../assets/titanic.jpeg'), // Replace with actual asset path
    category: 'Romantic',
    availableTimings: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
    description: 'A young couple from different social backgrounds fall in love aboard the ill-fated R.M.S. Titanic.',
    actors: ['Leonardo DiCaprio', 'Kate Winslet'],
  },
  {
    id: '9',
    title: 'Pride & Prejudice',
    image: require('../assets/pride.jpeg'), // Replace with actual asset path
    category: 'Romantic',
    availableTimings: ['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
    description: 'Elizabeth Bennet navigates love, relationships, and family in 19th-century England.',
    actors: ['Keira Knightley', 'Matthew Macfadyen'],
  },
  {
    id: '10',
    title: 'The Fault in Our Stars',
    image: require('../assets/fault.jpeg'), // Replace with actual asset path
    category: 'Romantic',
    availableTimings: ['1:00 PM', '4:00 PM', '7:00 PM'],
    description: 'Two teenagers with cancer fall in love and try to make the most of their time together.',
    actors: ['Shailene Woodley', 'Ansel Elgort'],
  },

  // Horror Category
  {
    id: '11',
    title: 'The Conjuring',
    image: require('../assets/conj.jpeg'), // Replace with actual asset path
    category: 'Horror',
    availableTimings: ['10:00 PM', '1:00 AM', '4:00 AM'],
    description: 'The haunting of the Perron family by dark forces.',
    actors: ['Patrick Wilson', 'Vera Farmiga'],
  },
  {
    id: '12',
    title: 'It',
    image: require('../assets/it.jpeg'), // Replace with actual asset path
    category: 'Horror',
    availableTimings: ['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
    description: 'A group of children are terrorized by a shape-shifting clown in the town of Derry.',
    actors: ['Bill Skarsgård', 'Jaeden Lieberher'],
  },
  {
    id: '13',
    title: 'A Quiet Place',
    image: require('../assets/place.jpeg'), // Replace with actual asset path
    category: 'Horror',
    availableTimings: ['1:00 PM', '4:00 PM', '7:00 PM'],
    description: 'A family must live in silence while hiding from creatures that hunt by sound.',
    actors: ['Emily Blunt', 'John Krasinski'],
  },
  {
    id: '14',
    title: 'Hereditary',
    image: require('../assets/heri.jpeg'), // Replace with actual asset path
    category: 'Horror',
    availableTimings: ['2:00 PM', '5:00 PM', '8:00 PM'],
    description: 'A family’s dark secrets are uncovered after the death of their matriarch.',
    actors: ['Toni Collette', 'Alex Wolff'],
  },
  {
    id: '15',
    title: 'Get Out',
    image: require('../assets/get.jpeg'), // Replace with actual asset path
    category: 'Horror',
    availableTimings: ['3:00 PM', '6:00 PM', '9:00 PM'],
    description: 'A black man uncovers a disturbing secret when he visits his white girlfriend’s family.',
    actors: ['Daniel Kaluuya', 'Allison Williams'],
  },
];

export default function MovieBookingScreen() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedMovie(null);
  };

  const handleBookNow = () => {
    setIsModalVisible(false);
    navigation.navigate('MovieSetupScreen', { movie: selectedMovie });
  };

  const categories = ['Action', 'Romantic', 'Horror'];

  return (
    <View style={styles.container}>
      <ScrollView>
        {categories.map((category) => (
          <View key={category}>
            <Text style={styles.categoryHeading}>{category}</Text>
            <FlatList
              data={movies.filter((movie) => movie.category === category)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleMoviePress(item)} style={styles.movieCard}>
                  <Image source={item.image} style={styles.movieImage} />
                  <Text style={styles.movieTitle}>{item.title}</Text>
                  <Text style={styles.movieTimings}>{item.availableTimings.join(' | ')}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ))}
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalScrollContent} showsVerticalScrollIndicator={false}>
              {selectedMovie && (
                <>
                  <Image source={selectedMovie.image} style={styles.modalImage} />
                  <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
                  <Text style={styles.modalDescription}>{selectedMovie.description}</Text>
                  <Text style={styles.modalActors}>🎭 Actors: {selectedMovie.actors.join(', ')}</Text>
                  <Text style={styles.modalTimings}>🕒 Timings: {selectedMovie.availableTimings.join(' | ')}</Text>

                  <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>

            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  categoryHeading: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 12,
    color: '#444',
  },
  movieCard: {
    width: wp('43%'),
    marginRight: 15,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    marginBottom: 12,
    alignItems: 'center',
    padding: 10,
  },
  movieImage: {
    width: '100%',
    height: 180,
    borderRadius:8,
    marginBottom:8,
  },
  movieTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieTimings: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: wp('90%'),
    height: hp('80%'),
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingBottom: 10,
    overflow: 'hidden',
  },
  modalScrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: wp('46%'),
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
  },
  modalActors: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  modalTimings: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 7,
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});