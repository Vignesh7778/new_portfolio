import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerCVExtraction = () => {
    window.dispatchEvent(new CustomEvent('trigger-cyber-exfil', {
      detail: {
        name: 'VIGNESH_M_resume.pdf',
        email: 'LOCAL_UPLINK@PORT',
        size: '114 KB',
        url: '/VIGNESH_M_resume.pdf'
      }
    }));
  };

  return (
    <nav className={`fixed w-full z-50 border-b transition-all duration-300 ${scrolled ? 'bg-black/90 border-white/5 backdrop-blur-lg' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-20">

        <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <div className="w-10 h-10 border border-cyber-cyan/30 flex items-center justify-center font-bold text-cyber-cyan bg-cyber-cyan/5 font-cyber">V</div>
          <div className="hidden sm:block">
            <div className="text-[11px] font-bold text-white uppercase tracking-widest leading-none font-mono">VIGNESH M</div>
            <div className="text-[7px] text-cyber-cyan uppercase opacity-60 mt-1 font-mono">CyberSecurity Engineer</div>
          </div>
        </div>

        <div className="hidden md:flex space-x-8 text-[10px] font-black tracking-[0.2em] uppercase font-cyber">
          <a href="#hero" className="hover:text-cyber-cyan transition-all cursor-pointer">HOME</a>
          <a href="#skills" className="hover:text-cyber-cyan transition-all cursor-pointer">SKILLS</a>
          <a href="#missions" className="hover:text-cyber-cyan transition-all cursor-pointer">PROJECTS</a>
          <a href="#uplink" className="hover:text-cyber-cyan transition-all cursor-pointer">CONTACT</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={triggerCVExtraction} className="btn-outline-fill !px-5 !py-2 !text-[9px]">DOWNLOAD RESUME</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-cyber-cyan p-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-64 border-b border-white/5 bg-black/95 backdrop-blur-lg' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-4">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block text-center hover:text-cyber-cyan transition-all cursor-pointer text-[10px] font-black tracking-[0.2em] uppercase font-cyber py-2">HOME</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block text-center hover:text-cyber-cyan transition-all cursor-pointer text-[10px] font-black tracking-[0.2em] uppercase font-cyber py-2">SKILLS</a>
          <a href="#missions" onClick={() => setMobileMenuOpen(false)} className="block text-center hover:text-cyber-cyan transition-all cursor-pointer text-[10px] font-black tracking-[0.2em] uppercase font-cyber py-2">PROJECTS</a>
          <a href="#uplink" onClick={() => setMobileMenuOpen(false)} className="block text-center hover:text-cyber-cyan transition-all cursor-pointer text-[10px] font-black tracking-[0.2em] uppercase font-cyber py-2">CONTACT</a>
          <div className="flex justify-center pt-4">
            <button onClick={triggerCVExtraction} className="btn-outline-fill !px-5 !py-2 !text-[9px]">DOWNLOAD RESUME</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
