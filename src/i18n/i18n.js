// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import bn from './locales/bn.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';
import pa from './locales/pa.json';

const fallbackLng = 'en';
const deviceLocale = Localization?.locale?.split?.('-')[0] || fallbackLng;

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      mr: { translation: mr },
      ta: { translation: ta },
      te: { translation: te },
      bn: { translation: bn },
      kn: { translation: kn },
      ml: { translation: ml },
      pa: { translation: pa },
    },
    lng: deviceLocale,
    fallbackLng,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
