import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import KeyboardTest from "./components/KeyboradTest";
import ErrorCounter from "./components/ErrorCounter";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [sampleText, setSampleText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [finished, setFinished] = useState(false);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  // Fonction pour charger un texte aléatoire depuis l'API
  const fetchRandomText = async () => {
    setLoading(true);
    setInput("");
    setStartTime(null);
    setEndTime(null);
    setFinished(false);
    try {
      const res = await fetch(
        "https://baconipsum.com/api/?type=meat-and-filler&sentences=2"
      );
      const data = await res.json();
      setSampleText(data[0]);
    } catch (e) {
      setSampleText("Erreur lors du chargement du texte.");
    }
    setLoading(false);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  useEffect(() => {
    fetchRandomText();
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e) => {
    if (!startTime) setStartTime(Date.now());
    setInput(e.target.value);

    if (e.target.value === sampleText) {
      setEndTime(Date.now());
      setFinished(true);
      const time = ((Date.now() - startTime) / 1000).toFixed(2);
      const wpm = getWPM(Date.now());
      const errors = getErrors(e.target.value, sampleText);
      setScores([
        ...scores,
        { text: sampleText.slice(0, 30) + "...", time, wpm, errors },
      ]);
    }
  };

  const handleRestart = () => {
    fetchRandomText();
  };

  const getWPM = (currentEndTime) => {
    if (!startTime || !currentEndTime) return 0;
    const minutes = (currentEndTime - startTime) / 60000;
    const words = sampleText.split(" ").length;
    return (words / minutes).toFixed(2);
  };

  function getErrors(input, sampleText) {
    let errors = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== sampleText[i]) errors++;
    }
    return errors;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-xl mx-auto">
        <KeyboardTest
          sampleText={sampleText}
          input={input}
          onInputChange={handleInputChange}
          finished={finished}
          onRestart={handleRestart}
          startTime={startTime}
          endTime={endTime}
          getWPM={getWPM}
          inputRef={inputRef}
          loading={loading}
        />
        <ErrorCounter input={input} sampleText={sampleText} />
        <ScoreBoard scores={scores} />
      </div>
    </div>
  );
}

export default App;
