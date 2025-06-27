import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();

  const navClass = (path) => pathname === path ? 'text-blue-400 font-semibold' : 'hover:text-blue-400';

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm border-b border-gray-700 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        <h1 className="text-xl font-bold">Image Steganography</h1>
        <div className="flex items-center space-x-8 font-medium">
            <Link to="/" className="hover:text-blue-400 transition">Home</Link>
            <Link to="/encode" className="hover:text-blue-400 transition">Encode</Link>
            <Link to="/decode" className="hover:text-blue-400 transition">Decode</Link>
            <Link to="/about" className="hover:text-blue-400 transition">About</Link>
        </div>
        </div>
    </div>
    </nav>

  );
};

export default Navbar;
