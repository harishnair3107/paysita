import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const VideoCallScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Video Call</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginTop: 20, padding: 10, backgroundColor: 'red', borderRadius: 8 }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>End Call</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoCallScreen;
