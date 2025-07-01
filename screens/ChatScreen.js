import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

const ChatScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { contact } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [amount, setAmount] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [wallpaper, setWallpaper] = useState(null);
  const [amountModalVisible, setAmountModalVisible] = useState(false);

  const pickWallpaper = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setWallpaper(result.uri);
    }
  };

  const pickImageToSend = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setMessages([...messages, { type: 'image', uri: result.uri }]);
    }
  };

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { type: 'text', text: input }]);
      setInput('');
    }
  };

  const sendMoney = () => {
    if (amount.trim() !== '' && !isNaN(amount)) {
      setMessages([...messages, { type: 'money', text: `${t('chat.sent')} ₹${amount}` }]);
      setAmount('');
      setAmountModalVisible(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: wallpaper ? `url(${wallpaper})` : '#fff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: contact.image }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{contact.name}</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: 'lightgray', borderRadius: 8, marginBottom: 5 }}>
            {item.type === 'text' ? (
              <Text>{item.text}</Text>
            ) : item.type === 'money' ? (
              <Text style={{ color: 'green', fontWeight: 'bold' }}>{item.text}</Text>
            ) : (
              <Image source={{ uri: item.uri }} style={{ width: 200, height: 200, borderRadius: 10 }} />
            )}
          </View>
        )}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, padding: 10 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, padding: 10, borderRadius: 8, marginRight: 10 }}
          placeholder={t('chat.type_message')}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={{ backgroundColor: 'purple', padding: 10, borderRadius: 8 }}>
          <Text style={{ color: 'white' }}>{t('chat.send')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAmountModalVisible(true)} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 8, marginLeft: 5 }}>
          <Text style={{ color: 'white' }}>{t('chat.send_money')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImageToSend} style={{ backgroundColor: 'green', padding: 10, borderRadius: 8, marginLeft: 5 }}>
          <FontAwesome name="image" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <Modal visible={amountModalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, width: 250 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>{t('chat.enter_amount')}</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 }}
              placeholder={`₹ ${t('chat.enter_amount')}`}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TouchableOpacity onPress={sendMoney} style={{ backgroundColor: 'green', padding: 10, borderRadius: 8 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>{t('chat.send')} ₹{amount}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAmountModalVisible(false)} style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 18, textAlign: 'center', color: 'red' }}>{t('chat.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={menuVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, width: 250 }}>
            <TouchableOpacity onPress={() => { navigation.navigate('VoiceCallScreen'); setMenuVisible(false); }}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>{t('chat.voice_call')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('VideoCallScreen'); setMenuVisible(false); }}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>{t('chat.video_call')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { pickWallpaper(); setMenuVisible(false); }}>
              <Text style={{ fontSize: 18 }}>{t('chat.set_wallpaper')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={{ fontSize: 18, marginTop: 10, textAlign: 'center', color: 'red' }}>{t('chat.close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatScreen;