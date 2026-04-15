import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Clock, BarChart2, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // লিঙ্ক স্টাইল ফাংশন (Active এবং Inactive আলাদা করার জন্য)
  const getLinkClass = ({ isActive }) => 
    `flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
      isActive 
        ? 'bg-[#244d3f] text-white shadow-md' // Active: Deep Green background, White text
        : 'text-gray-600 hover:text-[#244d3f] hover:bg-gray-50' // Inactive style
    }`;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Brand Name (Custom Colors as requested) */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <NavLink to="/" className="text-2xl font-black tracking-tighter">
              <span className="text-black">Keen</span>
              <span className="text-[#244d3f]">Keeper</span>
            </NavLink>
          </div>

          {/* Right: Desktop Navigation Links with Icons */}
          <div className="hidden md:flex space-x-4 items-center">
            <NavLink to="/" className={getLinkClass}>
              <Home size={18} />
              Home
            </NavLink>
            <NavLink to="/timeline" className={getLinkClass}>
              <Clock size={18} />
              Timeline
            </NavLink>
            <NavLink to="/stats" className={getLinkClass}>
              <BarChart2 size={18} />
              Stats
            </NavLink>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-[#244d3f] p-2 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 px-4 py-6 shadow-2xl absolute w-full left-0 z-50">
          <div className="flex flex-col space-y-3">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={getLinkClass}>
              <Home size={18} />
              Home
            </NavLink>
            <NavLink to="/timeline" onClick={() => setIsOpen(false)} className={getLinkClass}>
              <Clock size={18} />
              Timeline
            </NavLink>
            <NavLink to="/stats" onClick={() => setIsOpen(false)} className={getLinkClass}>
              <BarChart2 size={18} />
              Stats
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;