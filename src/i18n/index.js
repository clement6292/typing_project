import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import des fichiers de traduction
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';

const resources = {
  en: {
    translation: enTranslations
  },
  fr: {
    translation: frTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // langue par défaut
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false // React échappe déjà les valeurs
    }
  });

export default i18n;
