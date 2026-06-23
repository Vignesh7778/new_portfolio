import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const colorThemes = {
  "cyber-purple": {
    text: "text-cyber-purple",
    bg: "bg-cyber-purple/5",
    border: "border-cyber-purple/20",
    borderHover: "group-hover:border-cyber-purple/40",
    shadowHover: "group-hover:shadow-[0_0_30px_rgba(255,0,255,0.12)]",
    hoverBorder: "group-hover:border-cyber-purple",
    barColor: "bg-cyber-purple",
    hex: "#ff00ff"
  }
};

const playHoverTick = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!window._sharedAudioCtx) {
      window._sharedAudioCtx = new AudioContext();
    }
    const ctx = window._sharedAudioCtx;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.06);
    
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) {
    // Ignore audio engine blockage
  }
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center z-10 gap-16">

        {/* Left Content */}
        <div className="w-full lg:w-2/3 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 text-cyber-cyan text-[10px] font-bold uppercase tracking-[0.4em] mb-8">
              <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-ping"></span>
              Available for new opportunities
            </div>

            <h1 className="font-cyber text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white leading-none mb-6 drop-shadow-[3px_3px_0px_#00f3ff]">
              VIGNESH M
            </h1>

            <h2 className="text-xl md:text-2xl text-gray-500 font-bold uppercase tracking-tighter mb-8 font-cyber">
              Cybersecurity Engineer <span className="text-cyber-cyan/50 mx-2">/</span> Full-Stack Developer
            </h2>

            <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-2xl border-l-2 border-cyber-cyan/50 pl-6 italic mb-10">
              "Motivated Computer Science Engineering student with a strong interest in cybersecurity and full-stack web development. Passionate about building secure, user-friendly applications and continuously improving problem-solving skills."
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <a href="#missions" className="btn-apex shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                Explore Projects
              </a>
              <a href="#uplink" className="btn-outline">
                Contact Me
              </a>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-8 pt-8 opacity-40">
              <a href="https://www.linkedin.com/in/vignesh-murali-dharan/" target="_blank" rel="noreferrer" className="text-[9px] hover:text-cyber-cyan transition-all font-bold tracking-widest uppercase flex items-center gap-2">
                <FaLinkedin size={14} /> LINKEDIN
              </a>
              <a href="https://github.com/Vignesh7778" target="_blank" rel="noreferrer" className="text-[9px] hover:text-cyber-cyan transition-all font-bold tracking-widest uppercase flex items-center gap-2">
                <FaGithub size={14} /> GITHUB
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Profile Widget */}
        <div className="w-full lg:w-1/3 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Tilt options={{ max: 10, scale: 1.02, speed: 600 }} className="h-full">
              <div 
                onMouseEnter={playHoverTick}
                className={`bg-[rgba(10,12,18,0.95)] backdrop-blur-md border border-white/5 border-t-4 border-t-cyber-purple ${colorThemes["cyber-purple"].border} ${colorThemes["cyber-purple"].borderHover} ${colorThemes["cyber-purple"].shadowHover} p-10 text-center rounded-xl group relative overflow-hidden transition-all duration-300`}
              >
                {/* Cyber Dot-Matrix Overlay Grid */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, ${colorThemes["cyber-purple"].hex}06 0%, transparent 70%), 
                                      radial-gradient(${colorThemes["cyber-purple"].hex}08 1px, transparent 1px)`,
                    backgroundSize: '100% 100%, 14px 14px',
                  }}
                />

                {/* Corner Brackets */}
                <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-t-2 group-hover:border-l-2 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 ${colorThemes["cyber-purple"].hoverBorder} z-10`} />
                <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-t-2 group-hover:border-r-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${colorThemes["cyber-purple"].hoverBorder} z-10`} />
                <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-b-2 group-hover:border-l-2 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 ${colorThemes["cyber-purple"].hoverBorder} z-10`} />
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-b-2 group-hover:border-r-2 group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${colorThemes["cyber-purple"].hoverBorder} z-10`} />

                {/* Laser Scanline */}
                <div className={`absolute top-0 left-0 w-full h-[2px] ${colorThemes["cyber-purple"].barColor} opacity-0 group-hover:opacity-75 group-hover:animate-[scan-pass_3s_linear_infinite] pointer-events-none z-10`}
                     style={{
                       boxShadow: `0 0 10px ${colorThemes["cyber-purple"].hex}`,
                     }}
                />

                <div className="relative z-10">
                  <span className="text-[9px] text-cyber-cyan/50 uppercase block mb-4 font-bold tracking-widest">Academic Record</span>
                  <div className="text-5xl font-black text-white font-cyber">8.98</div>
                  <div className="text-[9px] text-gray-500 font-bold mt-2 uppercase tracking-widest">CGPA</div>

                  <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                    <div className="flex justify-between text-[9px] font-bold font-mono">
                      <span className="text-gray-600">STATUS:</span>
                      <span className="text-white">PRE-FINAL YEAR STUDENT</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-bold font-mono">
                      <span className="text-gray-600">EXPERIENCE:</span>
                      <span className="text-white">INTERNSHIP COMPLETED</span>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
