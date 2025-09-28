import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import EntryPage from "./pages/EntryPage";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-300">
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/bioorgo.com" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
