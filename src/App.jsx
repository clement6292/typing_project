import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TypingTestPage from "./pages/TypingTestPage";
import HistoryPage from "./pages/HistoryPage";
import { ScoresProvider } from "./contexts/ScoresContext";

function App() {
  return (
    <ScoresProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main className="flex-grow">
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
          </main>
          
          <Footer />
        </div>
      </Router>
    </ScoresProvider>
  );
}

export default App;
