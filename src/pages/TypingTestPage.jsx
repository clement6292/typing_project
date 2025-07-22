import React from 'react';
import KeyboardTest from '../components/KeyboradTest';
import { useScores } from '../contexts/ScoresContext';

function TypingTestPage() {
  const { addScore } = useScores();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="py-8">
        <KeyboardTest onScoreAdd={addScore} />
      </div>
    </div>
  );
}

export default TypingTestPage;
