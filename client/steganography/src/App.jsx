import React, { useState } from 'react';
import Encode from './Encode';

function App() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className="pt-64 App min-h-screen font-sans bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold p-10">Image Steganography</h1>
        <div className="mt-2">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            Modified F5 / optimDMCSS
          </span>
        </div>
        <h2 className="mt-6 text-lg">
          Upload an image that you would like to hide or extract a message from.
        </h2>
        <h2 className="text-sm text-gray-300 italic mt-2">
          This tool uses <span className="text-blue-400">DCT-based steganography</span> techniques: F5 and optimDMCSS.
        </h2>
      </div>

      <div className="text-center pt-12">
        {!started && (
          <button
            onClick={handleStart}
            className="bg-blue-700 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-all"
          >
            Start
          </button>
        )}
      </div>

      <div className="mt-8">
        {started && <Encode />}
      </div>

      <footer className="mt-20 text-center text-xs text-gray-500 pb-10">
        This project is developed as part of an academic assignment. It implements a modified DCT-domain steganography algorithm based on F5 and optimDMCSS methods.
      </footer>
    </div>
  );
}

export default App;
