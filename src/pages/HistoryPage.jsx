import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScoreBoard from '../components/ScoreBoard';
import Modal from '../components/Modal';
import { useScores } from '../contexts/ScoresContext';
import { useLanguage } from '../hooks/useLanguage';

function HistoryPage() {
  const { scores, getStatistics, clearAllScores } = useScores();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { t } = useLanguage();
  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            📊 {t('history.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('history.subtitle')}
          </p>
        </div>

        {/* Statistiques globales */}
        {scores && scores.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stats.totalTests}
                </div>
                <div className="text-gray-600 font-medium">{t('history.total_tests')}</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.averageWPM}
                </div>
                <div className="text-gray-600 font-medium">{t('history.average_wpm')}</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stats.averageErrors}
                </div>
                <div className="text-gray-600 font-medium">{t('history.average_errors')}</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {stats.averageAccuracy}%
                </div>
                <div className="text-gray-600 font-medium">{t('history.average_accuracy')}</div>
              </div>
            </div>
          </div>
        )}

        {/* Bouton pour vider l'historique */}
        {scores && scores.length > 0 && (
          <div className="text-center mb-6">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
            >
              🗑️ {t('history.clear_all')}
            </button>
          </div>
        )}

        {/* Tableau des scores */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <ScoreBoard scores={scores} />
        </div>

        {/* Message si pas de scores */}
        {(!scores || scores.length === 0) && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⌨️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              {t('history.no_scores')}
            </h3>
            <p className="text-gray-500 mb-8">
              {t('history.start_test')}
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              <span className="mr-2">🎯</span>
              {t('history.start_test_button')}
            </Link>
          </div>
        )}
      </div>

      {/* Modal de confirmation */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={clearAllScores}
        confirmText={t('modal.delete_all')}
        cancelText={t('modal.cancel')}
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      >
        <div className="text-center py-4">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-gray-700 text-lg mb-2">
            {t('modal.confirm_delete')}
          </p>
          <p className="text-gray-500 text-sm">
            {t('modal.irreversible')} {scores.length} {t('modal.tests_will_be_deleted')}
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default HistoryPage;
