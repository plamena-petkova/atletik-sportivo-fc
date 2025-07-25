import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import enTranslations from '../public/locales/en/common.json';
import deTranslations from '../public/locales/bg/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      bg: { translation: deTranslations },
    },
    lng: 'bg', 
    fallbackLng: 'bg',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
