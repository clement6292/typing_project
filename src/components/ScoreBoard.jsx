import React from "react";
import { useTranslation } from 'react-i18next';

function ScoreBoard({ scores }) {
  const { t } = useTranslation();

  if (!scores || scores.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">📊</div>
        <p className="text-gray-500 text-lg">{t('scoreboard.no_scores')}</p>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 95) return 'text-green-600 bg-green-50';
    if (accuracy >= 85) return 'text-blue-600 bg-blue-50';
    if (accuracy >= 75) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getWPMColor = (wpm) => {
    if (wpm >= 60) return 'text-green-600';
    if (wpm >= 40) return 'text-blue-600';
    if (wpm >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="mr-3">📈</span>
          {t('scoreboard.detailed_history')}
        </h3>
        <div className="text-sm text-gray-500">
          {scores.length} {scores.length > 1 ? t('scoreboard.tests') : t('scoreboard.test')} {t('scoreboard.completed')}
        </div>
      </div>

      <div className="space-y-4">
        {scores.slice().reverse().map((score, idx) => (
          <div 
            key={score.id || idx} 
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300"
          >
            {/* En-tête avec date et langue */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  #{scores.length - idx}
                </div>
                <div className="text-gray-500 text-sm">
                  {formatDate(score.timestamp)}
                </div>
                {score.language && (
                  <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                    {score.language === 'fr' ? '🇫🇷 FR' : '🇺🇸 EN'}
                  </div>
                )}
              </div>
            </div>

            {/* Métriques principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getWPMColor(score.wpm)}`}>
                  {Math.round(score.wpm)}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('scoreboard.wpm_label')}</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {score.time}s
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('scoreboard.time_label')}</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {score.errors}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('scoreboard.errors_label')}</div>
              </div>
              
              <div className="text-center">
                <div className={`text-2xl font-bold ${getAccuracyColor(score.accuracy).split(' ')[0]}`}>
                  {score.accuracy}%
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('scoreboard.accuracy_label')}</div>
              </div>
            </div>

            {/* Métriques secondaires */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="bg-gray-50 px-3 py-2 rounded-lg">
                <span className="text-gray-600 text-sm">
                  📝 {score.charactersTyped || score.input?.length || 0} {t('scoreboard.characters_typed')}
                </span>
              </div>
              <div className="bg-gray-50 px-3 py-2 rounded-lg">
                <span className="text-gray-600 text-sm">
                  📖 {score.wordsTyped || Math.ceil((score.input?.length || 0) / 5)} {t('scoreboard.words_typed')}
                </span>
              </div>
              <div className={`px-3 py-2 rounded-lg ${getAccuracyColor(score.accuracy)}`}>
                <span className="text-sm font-medium">
                  🎯 {score.accuracy}% {t('scoreboard.precision')}
                </span>
              </div>
            </div>

            {/* Aperçu du texte */}
            <div className="border-t pt-4">
              <div className="text-sm text-gray-600 mb-2 font-medium">{t('scoreboard.text_excerpt')}</div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "{score.text}"
                </p>
              </div>
            </div>

            {/* Barre de progression visuelle */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{t('scoreboard.progress')}</span>
                <span>{score.accuracy}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    score.accuracy >= 95 ? 'bg-green-500' :
                    score.accuracy >= 85 ? 'bg-blue-500' :
                    score.accuracy >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${score.accuracy}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreBoard;