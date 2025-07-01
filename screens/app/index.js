import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Drawer from './Drawer';

export default function Home() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Handle outside touch to close drawer
  const handleCloseDrawer = () => {
    if (isDrawerOpen) setDrawerOpen(false);
  };

  return (
    <Pressable style={styles.container} onPress={handleCloseDrawer}>
      {/* Status Bar */}
      <StatusBar style="dark" />

      {/* Circle Link (Open Drawer) */}
      <TouchableOpacity style={styles.circle} onPress={() => setDrawerOpen(true)}>
        <Text style={styles.circleText}>AB</Text>
      </TouchableOpacity>

      {/* Centered Homepage Text */}
      <Text style={styles.homepageText}>Homepage</Text>

      {/* Drawer (Only if open) */}
      {isDrawerOpen && (
        <Drawer closeDrawer={() => setDrawerOpen(false)} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 
  },
  circle: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
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
  homepageText: {
    fontSize: 30,
    fontWeight: 'bold',
    zIndex: 1,
  },
});