import React, { useState } from 'react';
import Encode from './Encode';
import About from './About';

function App() {
  const [started, setStarted] = useState(false);
  const [useSample, setUseSample] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setUseSample(false);
  };

  const handleSample = () => {
    setStarted(true);
    setUseSample(true);
  };

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  return (
    <div className="App min-h-screen font-sans bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="text-center pt-32 px-6">
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

        {/* Tombol-tombol */}
        {!started && (
          <div className="pt-10 space-x-4">
            <button
              onClick={handleStart}
              className="bg-blue-700 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-all"
            >
              Start
            </button>

            <button
              onClick={handleSample}
              className="bg-purple-700 hover:bg-purple-500 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-all"
            >
              Use Sample
            </button>

            <button
              onClick={toggleAbout}
              className="bg-green-700 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-all"
            >
              {showAbout ? 'Hide About' : 'About'}
            </button>
          </div>
        )}
      </div>

      {/* Encode Form */}
      <div className="mt-12">
        {started && <Encode useSample={useSample} />}
      </div>

      {/* About Section */}
      <div className="mt-4">
        {showAbout && <About />}
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-xs text-gray-500 pb-10 px-4">
        This project is developed as part of an academic assignment. It implements a modified DCT-domain steganography algorithm based on F5 and optimDMCSS methods.
      </footer>
    </div>
  );
}

export default App;
