import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', label: 'മലയാളം (Malayalam)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
];

export default function ChangeLanguage() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation(); // 👈 Add navigation hook

  const change = async (lang) => {
    const selectedLang = languages.find(l => l.code === lang);
    await i18n.changeLanguage(lang);

    // Handle RTL layout for Urdu
    if (selectedLang?.rtl) {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }

    // Go back automatically after language change
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{t('change_language')}</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {languages.map((lang, index) => (
          <TouchableOpacity key={index} style={styles.langButton} onPress={() => change(lang.code)}>
            <Text style={styles.langText}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1A237E',
  },
  scroll: {
    alignItems: 'center',
  },
  langButton: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginVertical: 8,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  langText: {
    fontSize: 18,
    color: '#0D47A1',
    fontWeight: '600',
  },
});
