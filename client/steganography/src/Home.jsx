// src/Home.jsx
import React from "react";

const Home = () => {
  return (
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
  );
};

export default Home;
