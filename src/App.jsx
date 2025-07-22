import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TypingTestPage from "./pages/TypingTestPage";
import HistoryPage from "./pages/HistoryPage";
import { ScoresProvider } from "./contexts/ScoresContext";

function App() {
  return (
    <ScoresProvider>
      <Router>
        <div>
          <Header />
          
          <Routes>
            <Route 
              path="/" 
              element={<TypingTestPage />} 
            />
            <Route 
              path="/history" 
              element={<HistoryPage />} 
            />
          </Routes>
        </div>
      </Router>
    </ScoresProvider>
  );
}

export default App;
