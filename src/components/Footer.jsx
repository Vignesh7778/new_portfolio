import React from 'react';

const Footer = () => {
  return (
    <footer className="p-12 md:p-24 text-center bg-black border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <div className="text-[16px] font-black text-white tracking-[0.4em] uppercase font-cyber">VIGNESH M</div>
          <div className="text-[9px] text-gray-700 font-mono mt-2 uppercase tracking-widest">JAVA • CYBER • FULL-STACK</div>
        </div>
        <div className="text-[10px] font-mono text-gray-800 uppercase tracking-[1em]">
          PORTFOLIO 2026
        </div>
        <div className="text-center md:text-right text-[10px] text-gray-600 font-mono uppercase tracking-widest">
          &copy; 2026 ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
};

export default Footer;
