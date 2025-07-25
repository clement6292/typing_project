import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

function Header() {
  const location = useLocation();
  const { t, toggleLanguage, currentLanguage } = useLanguage();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <span className="text-3xl">⌨️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                TypingMaster
              </h1>
              <p className="text-blue-200 text-sm">
                {currentLanguage === 'fr' 
                  ? 'Améliorez votre vitesse de frappe'
                  : 'Improve your typing speed'
                }
              </p>
            </div>
          </div>

          {/* Navigation et bouton de langue */}
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-1">
              <Link
                to="/"
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isActive('/') 
                    ? 'bg-white text-blue-700 shadow-lg transform scale-105'
                    : 'text-white hover:bg-white/20 hover:backdrop-blur-sm'
                }`}
              >
                <span className="text-lg">🏠</span>
                <span>{t('nav.dashboard') || "Accueil"}</span>
              </Link>
              <Link
                to="/test"
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isActive('/test')
                    ? 'bg-white text-blue-700 shadow-lg transform scale-105'
                    : 'text-white hover:bg-white/20 hover:backdrop-blur-sm'
                }`}
              >
                <span className="text-lg">⌨️</span>
                <span>{t('nav.typing_test') || "Test de frappe"}</span>
              </Link>
              <Link
                to="/history"
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isActive('/history')
                    ? 'bg-white text-blue-700 shadow-lg transform scale-105'
                    : 'text-white hover:bg-white/20 hover:backdrop-blur-sm'
                }`}
              >
                <span className="text-lg">📊</span>
                <span>{t('nav.history') || "Historique"}</span>
              </Link>
            </nav>

            {/* Bouton de changement de langue */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-white/20 text-white rounded-lg font-medium transition-all duration-200 hover:bg-white/30 hover:backdrop-blur-sm flex items-center space-x-2 border border-white/20"
            >
              <span className="text-lg">🌐</span>
              <span>{t('typing.language_switch')}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Ligne décorative */}
      <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600"></div>
    </header>
  );
}

export default Header;
