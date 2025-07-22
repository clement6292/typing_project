import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section À propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">⌨️</span>
              {t('footer.about_title')}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footer.about_description')}
            </p>
          </div>

          {/* Section Fonctionnalités */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">🚀</span>
              {t('footer.features_title')}
            </h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                {t('footer.feature_multilingual')}
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                {t('footer.feature_realtime')}
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                {t('footer.feature_history')}
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                {t('footer.feature_statistics')}
              </li>
            </ul>
          </div>

          {/* Section Contact/Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">📊</span>
              {t('footer.stats_title')}
            </h3>
            <div className="text-gray-300 text-sm space-y-2">
              <div className="flex items-center">
                <span className="mr-2">🌍</span>
                {t('footer.languages_supported')}
              </div>
              <div className="flex items-center">
                <span className="mr-2">⏱️</span>
                {t('footer.test_duration')}
              </div>
              <div className="flex items-center">
                <span className="mr-2">📈</span>
                {t('footer.performance_tracking')}
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © Abk{currentYear} {t('footer.copyright')}
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <span className="mr-1">💻</span>
                {t('footer.made_with')} React
              </div>
              <div className="flex items-center">
                <span className="mr-1">🎨</span>
                {t('footer.styled_with')} Tailwind CSS
              </div>
              <div className="flex items-center">
                <span className="mr-1">🌐</span>
                {t('footer.powered_by')} i18next
              </div>
            </div>
          </div>
        </div>

        {/* Message motivationnel */}
        <div className="text-center mt-6 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm italic">
            {t('footer.motivation_message')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
