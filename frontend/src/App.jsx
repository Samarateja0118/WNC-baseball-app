import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-baseball-cream">
        <Navigation />

        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="bg-nationals-red text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">© 2025 MLB Pitch Analysis Dashboard by Samara</p>
            <p className="text-xs mt-2 opacity-75">Data from 2025 MLB Season</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
