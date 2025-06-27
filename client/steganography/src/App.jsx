import React, { useState } from 'react';
import Encode from './Encode';
import Decode from './Decode';
import About from './About';

function App() {
  const [useSample, setUseSample] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [enc, setEnc] = useState(false);
  const [dec, setDec] = useState(false);

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  const handleEncodeClick = () => {
    setEnc(true);
    setDec(false);
  };

  const handleDecodeClick = () => {
    setDec(true);
    setEnc(false);
  };

  const handleSample = () => {
    setUseSample(true);
    setEnc(true);
    setDec(false);
  };

  return (
    <div className="App min-h-screen flex flex-col justify-between font-sans bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm border-b border-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">Image Steganography</h1>
            <div className="flex items-center space-x-8 font-medium">
              <button onClick={() => window.location.reload()} className="hover:text-blue-400 transition">Home</button>
              <button onClick={handleEncodeClick} className="hover:text-blue-400 transition">Encode</button>
              <button onClick={handleDecodeClick} className="hover:text-blue-400 transition">Decode</button>
              <button onClick={toggleAbout} className="hover:text-blue-400 transition">About</button>
              <button onClick={handleSample} className="hover:text-blue-400 transition">Use Sample</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
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
        </div>

        {/* Show form based on choice */}
        <div className="text-center pt-10">
          <div className="mt-8">
            {enc && <Encode useSample={useSample} />}
            {dec && <Decode />}
          </div>
        </div>

        {/* About Section */}
        <div className="mt-4">
          {showAbout && <About />}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center text-xs text-gray-500 pb-10 px-4">
        This project is developed as part of an academic assignment. It implements a modified DCT-domain steganography algorithm based on F5 and optimDMCSS methods.
      </footer>
    </div>
  );
}

export default App;