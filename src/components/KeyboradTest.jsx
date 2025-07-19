import React, { useState, useRef, useEffect } from "react";
import useChrono from "../hooks/useChrono";

function KeyboardTest() {
  const [sampleText, setSampleText] = useState("");
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const textContainerRef = useRef(null);

  // Chrono hook
  const { elapsed, reset } = useChrono(started && !finished, () => {
    setFinished(true);
    setInput(""); // Réinitialise le champ de saisie
  });

  // Fonction pour charger un texte aléatoire depuis l'API
  const fetchRandomText = async () => {
    setLoading(true);
    setInput("");
    setStarted(false);
    setFinished(false);
    try {
      const res = await fetch("https://baconipsum.com/api/?type=meat-and-filler&sentences=2");
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
  }, []);

  useEffect(() => {
    if (textContainerRef.current) {
      // Trouve le span du caractère courant
      const currentChar = textContainerRef.current.querySelector('.current-char');
      if (currentChar) {
        currentChar.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [input]);

  const handleChange = (e) => {
    if (!started) setStarted(true);
    setInput(e.target.value);

    if (e.target.value === sampleText) {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setInput("");
    setStarted(false);
    setFinished(false);
    reset();
    fetchRandomText();
  };

  const getErrors = () => {
    let errors = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== sampleText[i]) errors++;
    }
    return errors;
  };

  const getWPM = () => {
    const words = input.trim().split(/\s+/).length;
    const minutes = elapsed / 60;
    return minutes > 0 ? (words / minutes).toFixed(2) : 0;
  };

  function getColoredText(sampleText, input) {
    return sampleText.split("").map((char, idx) => {
      let color = "";
      let extra = "";
      if (idx < input.length) {
        color = input[idx] === char ? "text-green-600" : "text-red-600";
      } else if (idx === input.length) {
        color = "text-blue-600";
        extra = "current-char font-bold underline";
      } else {
        color = "text-gray-400";
      }
      return (
        <span key={idx} className={`${color} ${extra}`}>
          {char}
        </span>
      );
    });
  }

  return (
    <div className="min-h-screen w-full h-full flex items-center justify-center  from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full max-w-5xl mx-auto p-8 bg-white/90 rounded-3xl shadow-2xl border border-blue-200 flex flex-col justify-center">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-800 tracking-tight drop-shadow">
          Test de Saisie Clavier
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <span className="text-gray-700 text-base bg-white/80 px-4 py-2 rounded shadow">
            ⏱️ <span className="font-bold">{elapsed}s</span>
          </span>
          <span className="text-gray-700 text-base bg-white/80 px-4 py-2 rounded shadow">
            Erreurs : <span className="font-bold text-red-600">{getErrors()}</span>
          </span>
          <span className="text-gray-700 text-base bg-white/80 px-4 py-2 rounded shadow">
            Vitesse : <span className="font-bold text-blue-700">{getWPM()}</span> MPM
          </span>
        </div>
        <div
          ref={textContainerRef}
          className="bg-white border border-blue-200 p-8 rounded-xl mb-8 min-h-[90px] font-mono text-4xl leading-relaxed shadow-inner transition-all overflow-x-auto whitespace-nowrap"
          style={{ maxWidth: "100%" }}
        >
          {loading ? (
            <span className="text-blue-400 animate-pulse">Chargement...</span>
          ) : (
            getColoredText(sampleText, input)
          )}
        </div>
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleChange}
          disabled={finished || loading}
          rows={5}
          className="w-full p-6 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition text-2xl font-mono bg-blue-50 placeholder:text-blue-300 disabled:bg-gray-100 disabled:cursor-not-allowed mb-6"
          placeholder="Commencez à taper ici..."
          spellCheck={false}
          autoCorrect="off"
          autoComplete="off"
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {finished && (
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-xl shadow hover:from-blue-700 hover:to-blue-500 transition text-xl"
            >
              Nouveau texte
            </button>
          )}
          {!finished && (
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-8 py-4 bg-gray-200 text-gray-700 font-semibold rounded-xl shadow hover:bg-gray-300 transition text-xl"
              disabled={loading}
            >
              Générer un autre texte
            </button>
          )}
        </div>
        {finished && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-green-100 border border-green-300 text-green-800 px-8 py-5 rounded-2xl shadow font-semibold text-2xl">
              <p className="mb-2">🎉 <strong>Test terminé !</strong></p>
              <p>Temps écoulé : <span className="font-bold">{elapsed}</span> secondes</p>
              <p>Erreurs : <span className="font-bold">{getErrors()}</span></p>
              <p>Vitesse : <span className="font-bold">{getWPM()}</span> mots par minute</p>
            </div>
          </div>
        )}
        {finished && elapsed >= 60 && (
          <div className="text-red-600 font-bold mt-4 text-xl text-center">
            ⏰ Temps écoulé 
          </div>
        )}
      </div>
    </div>
  );
}

export default KeyboardTest;