import React from 'react';
import KeyboardTest from '../components/KeyboradTest';
import { useScores } from '../contexts/ScoresContext';
import { useLocation } from 'react-router-dom';

function TypingTestPage() {
  const { addScore } = useScores();
  const location = useLocation();
  const replayText = location.state?.replayText;
  const replayLanguage = location.state?.replayLanguage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="py-8">
        <KeyboardTest onScoreAdd={addScore} initialText={replayText} initialLanguage={replayLanguage} />
      </div>
    </div>
  );
}

export default TypingTestPage;
