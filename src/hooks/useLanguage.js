import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;
  
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLanguage);
  };

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return {
    t,
    currentLanguage,
    toggleLanguage,
    setLanguage,
    isEnglish: currentLanguage === 'en',
    isFrench: currentLanguage === 'fr'
  };
};
