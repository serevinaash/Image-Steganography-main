import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Encode from './Encode';
import Decode from './Decode';
import About from './About';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <Navbar />

        <main className="flex-grow pt-24 px-6">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center pt-16">
                  <h1 className="text-6xl font-bold p-10">Image Steganography</h1>
                  <div className="mt-2">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      Modified F5 / optimDMCSS
                    </span>
                  </div>
                  <h2 className="mt-6 text-lg">
                    Upload an image to <strong>embed</strong> a hidden message inside it.
                  </h2>
                  <h2 className="text-sm text-gray-300 italic mt-2">
                    Uses <span className="text-blue-400">DCT-based algorithms</span>: F5 and optimDMCSS.
                  </h2>
                </div>
              }
            />
            <Route path="/encode" element={<Encode />} />
            <Route path="/decode" element={<Decode />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="mt-40 text-center text-xs text-gray-500 pb-10 px-4">
          This project is developed as part of an academic assignment. It implements a modified DCT-domain steganography algorithm based on F5 and optimDMCSS methods.
        </footer>
      </div>
    </Router>
  );
}

export default App;
