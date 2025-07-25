import React from 'react';
import { Link } from 'react-router-dom';
import { useScores } from '../contexts/ScoresContext';
import { useLanguage } from '../hooks/useLanguage';
import ThreeBackground from '../components/ThreeBackground';

function DashboardPage() {
  const { scores, getStatistics } = useScores();
  const { t } = useLanguage();
  const stats = getStatistics();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fond 3D spectaculaire */}
      <ThreeBackground />
      {/* Contenu principal dans une card translucide et animée */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 max-w-5xl w-full mx-auto p-8 bg-white/70 rounded-3xl shadow-2xl backdrop-blur-md animate-fade-in max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-extrabold text-blue-900 mb-2 drop-shadow">👋 {t('dashboard.title')}</h2>
              <p className="text-lg text-blue-700">{t('dashboard.motivation')}</p>
            </div>
            {/* <img src="/logo192.png" alt="Logo" className="w-24 h-24 rounded-full shadow-lg border-4 border-white" /> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="bg-white/90 rounded-xl p-6 shadow text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.totalTests}</div>
              <div className="text-gray-600">{t('dashboard.total_tests')}</div>
            </div>
            <div className="bg-white/90 rounded-xl p-6 shadow text-center">
              <div className="text-3xl font-bold text-green-600">{stats.averageWPM}</div>
              <div className="text-gray-600">{t('dashboard.average_wpm')}</div>
            </div>
            <div className="bg-white/90 rounded-xl p-6 shadow text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.averageAccuracy}%</div>
              <div className="text-gray-600">{t('dashboard.average_accuracy')}</div>
            </div>
            <div className="bg-white/90 rounded-xl p-6 shadow text-center">
              <div className="text-3xl font-bold text-red-600">{stats.averageErrors}</div>
              <div className="text-gray-600">{t('dashboard.average_errors')}</div>
            </div>
          </div>
          <div className="bg-white/80 rounded-2xl p-8 shadow-xl mb-8">
            {/* Tu peux afficher un graphique ici */}
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/test" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 transition text-xl flex items-center justify-center">
              <span className="mr-2">⌨️</span> {t('dashboard.start_test')}
            </Link>
            <Link to="/history" className="px-8 py-4 bg-gray-200 text-gray-700 font-semibold rounded-xl shadow hover:bg-gray-300 transition text-xl flex items-center justify-center">
              <span className="mr-2">📊</span> {t('dashboard.see_history')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
