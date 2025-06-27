import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiBars3, HiXMark } from 'react-icons/hi2';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk menentukan kelas CSS untuk NavLink
  // Memberi gaya berbeda jika link sedang aktif
  const getNavLinkClasses = ({ isActive }) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-cyan-500/10 text-cyan-300' // Gaya untuk link aktif
        : 'text-slate-300 hover:bg-slate-700 hover:text-white' // Gaya untuk link normal
    }`;
    
  // Gaya khusus untuk link di menu mobile (agar lebih besar)
  const getMobileNavLinkClasses = ({ isActive }) => 
    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-cyan-500/20 text-cyan-300'
        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Judul Aplikasi */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-80 transition-opacity">
              Image Steganography
            </NavLink>
          </div>

          {/* Navigasi untuk Desktop (Terlihat di layar 'md' ke atas) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={getNavLinkClasses}>Home</NavLink>
              <NavLink to="/encode" className={getNavLinkClasses}>Encode</NavLink>
              <NavLink to="/decode" className={getNavLinkClasses}>Decode</NavLink>
              <NavLink to="/about" className={getNavLinkClasses}>About</NavLink>
            </div>
          </div>

          {/* Tombol Hamburger untuk Mobile (Terlihat di layar kecil, di bawah 'md') */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Buka menu utama</span>
              {isOpen ? (
                <HiXMark className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiBars3 className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Menu Dropdown untuk Mobile */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={getMobileNavLinkClasses} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/encode" className={getMobileNavLinkClasses} onClick={() => setIsOpen(false)}>Encode</NavLink>
            <NavLink to="/decode" className={getMobileNavLinkClasses} onClick={() => setIsOpen(false)}>Decode</NavLink>
            <NavLink to="/about" className={getMobileNavLinkClasses} onClick={() => setIsOpen(false)}>About</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;