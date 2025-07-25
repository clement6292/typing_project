import React, { createContext, useContext, useState, useEffect } from 'react';

// Créer le contexte
const ScoresContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useScores = () => {
  const context = useContext(ScoresContext);
  if (!context) {
    throw new Error('useScores must be used within a ScoresProvider');
  }
  return context;
};

// Provider component
export const ScoresProvider = ({ children }) => {
  const [scores, setScores] = useState([]);

  // Charger les scores depuis localStorage au démarrage (robuste et migration)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('typingTestScores');
      if (saved) {
        let parsed;
        try {
          parsed = JSON.parse(saved);
        } catch {
          setScores([]);
          localStorage.removeItem('typingTestScores');
          return;
        }
        // Si c'est un tableau (ancienne version)
        if (Array.isArray(parsed)) {
          setScores(parsed);
          // On migre vers la nouvelle structure
          localStorage.setItem('typingTestScores', JSON.stringify({ scores: parsed, savedAt: Date.now() }));
        }
        // Si c'est un objet avec scores et savedAt
        else if (parsed.scores && parsed.savedAt) {
          if (Date.now() - parsed.savedAt < 24 * 60 * 60 * 1000) {
            setScores(parsed.scores);
          } else {
            setScores([]);
            localStorage.removeItem('typingTestScores');
          }
        }
        // Si c'est un objet avec juste scores (pas de savedAt)
        else if (parsed.scores) {
          setScores(parsed.scores);
          localStorage.setItem('typingTestScores', JSON.stringify({ scores: parsed.scores, savedAt: Date.now() }));
        }
        // Cas inattendu
        else {
          setScores([]);
          localStorage.removeItem('typingTestScores');
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des scores:', error);
      setScores([]);
      localStorage.removeItem('typingTestScores');
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    try {
      const dataToStore = {
        scores,
        savedAt: Date.now()
      };
      localStorage.setItem('typingTestScores', JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des scores:', error);
    }
  }, [scores]);

  // Fonction pour ajouter un nouveau score
  const addScore = (finalStats) => {
    const newScore = {
      id: Date.now(), // ID unique basé sur le timestamp
      text: finalStats.sampleText, // <-- ici, le texte d'origine
      time: finalStats.elapsed,
      wpm: parseFloat(finalStats.wpm),
      errors: finalStats.errors,
      accuracy: ((finalStats.input.length - finalStats.errors) / finalStats.input.length * 100).toFixed(1),
      wordsTyped: finalStats.input.trim().split(/\s+/).length,
      charactersTyped: finalStats.input.length,
      date: new Date().toLocaleDateString('fr-FR'),
      timestamp: Date.now(),
      language: finalStats.language || 'en'
    };
    
    setScores(prevScores => [...prevScores, newScore]);
    return newScore;
  };

  // Fonction pour supprimer un score
  const removeScore = (scoreId) => {
    setScores(prevScores => prevScores.filter(score => score.id !== scoreId));
  };

  // Fonction pour vider tous les scores
  const clearAllScores = () => {
    setScores([]);
  };

  // Statistiques calculées
  const getStatistics = () => {
    if (scores.length === 0) {
      return {
        totalTests: 0,
        averageWPM: 0,
        averageErrors: 0,
        averageAccuracy: 0,
        bestWPM: 0,
        totalWordsTyped: 0,
        totalTimeSpent: 0
      };
    }

    const totalWPM = scores.reduce((sum, score) => sum + score.wpm, 0);
    const totalErrors = scores.reduce((sum, score) => sum + score.errors, 0);
    const totalAccuracy = scores.reduce((sum, score) => sum + parseFloat(score.accuracy), 0);
    const totalWordsTyped = scores.reduce((sum, score) => sum + score.wordsTyped, 0);
    const totalTimeSpent = scores.reduce((sum, score) => sum + score.time, 0);
    const bestWPM = Math.max(...scores.map(score => score.wpm));

    return {
      totalTests: scores.length,
      averageWPM: Math.round(totalWPM / scores.length),
      averageErrors: Math.round(totalErrors / scores.length),
      averageAccuracy: Math.round(totalAccuracy / scores.length),
      bestWPM: Math.round(bestWPM),
      totalWordsTyped,
      totalTimeSpent: Math.round(totalTimeSpent)
    };
  };

  const value = {
    scores,
    addScore,
    removeScore,
    clearAllScores,
    getStatistics
  };

  return (
    <ScoresContext.Provider value={value}>
      {children}
    </ScoresContext.Provider>
  );
};
