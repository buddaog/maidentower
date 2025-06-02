import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationAz from './locales/az/translation.json';
import translationRu from './locales/ru/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    az: { translation: translationAz },
    ru: { translation: translationRu },
  },
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
