import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#244d3f] text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Brand Name */}
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          KeenKeeper
        </h2>
        
        {/* Description */}
        <p className="text-[#cbfadb] text-opacity-80 max-w-2xl mb-10 text-sm md:text-base font-medium leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        
        {/* Social Links Section */}
        <h3 className="text-lg font-bold mb-4 text-[#cbfadb]">Social Links</h3>
        <div className="flex gap-4 mb-16">
          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#244d3f] hover:scale-110 transition-transform shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
          
          {/* Custom Facebook Icon */}
          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#244d3f] hover:scale-110 transition-transform shadow-md">
            <span className="font-bold text-[22px] leading-none mb-1 mr-0.5">f</span>
          </a>
          
          {/* Custom X Icon */}
          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#244d3f] hover:scale-110 transition-transform shadow-md">
            <span className="font-black text-[17px] leading-none mt-0.5">X</span>
          </a>
        </div>

        {/* Divider Line */}
        <div className="w-full border-t border-[#3a7a64] mb-6"></div>

        {/* Bottom Copyright & Links */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-[#cbfadb] text-opacity-70 font-medium">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;