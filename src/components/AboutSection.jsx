import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { Shield, Coffee, Code2, BrainCircuit } from 'lucide-react';

const colorThemes = {
  "cyber-green": {
    text: "text-cyber-green",
    bg: "bg-cyber-green/5",
    border: "border-cyber-green/20",
    borderHover: "group-hover:border-cyber-green/40",
    shadowHover: "group-hover:shadow-[0_0_30px_rgba(57,255,20,0.12)]",
    hoverBorder: "group-hover:border-cyber-green",
    barColor: "bg-cyber-green",
    hex: "#39ff14"
  },
  "cyber-cyan": {
    text: "text-cyber-cyan",
    bg: "bg-cyber-cyan/5",
    border: "border-cyber-cyan/20",
    borderHover: "group-hover:border-cyber-cyan/40",
    shadowHover: "group-hover:shadow-[0_0_30px_rgba(0,243,255,0.12)]",
    hoverBorder: "group-hover:border-cyber-cyan",
    barColor: "bg-cyber-cyan",
    hex: "#00f3ff"
  },
  "cyber-purple": {
    text: "text-cyber-purple",
    bg: "bg-cyber-purple/5",
    border: "border-cyber-purple/20",
    borderHover: "group-hover:border-cyber-purple/40",
    shadowHover: "group-hover:shadow-[0_0_30px_rgba(255,0,255,0.12)]",
    hoverBorder: "group-hover:border-cyber-purple",
    barColor: "bg-cyber-purple",
    hex: "#ff00ff"
  },
  "yellow-500": {
    text: "text-yellow-500",
    bg: "bg-yellow-500/5",
    border: "border-yellow-500/20",
    borderHover: "group-hover:border-yellow-500/40",
    shadowHover: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.12)]",
    hoverBorder: "group-hover:border-yellow-500",
    barColor: "bg-yellow-500",
    hex: "#eab308"
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

const aboutItems = [
  {
    title: "Secure Development",
    desc: "Focused on ethical hacking foundations and defensive coding architectures from day one.",
    icon: Shield,
    themeKey: "cyber-green"
  },
  {
    title: "Java Engineering",
    desc: "Strong problem-solving capability with Java, C, and Python backends.",
    icon: Coffee,
    themeKey: "cyber-purple"
  },
  {
    title: "Full-Stack Web Dev",
    desc: "Skilled in React.js, Node, and MongoDB basics for high-def responsive UI.",
    icon: Code2,
    themeKey: "cyber-cyan"
  },
  {
    title: "Agile Methodology",
    desc: "Continuous learner with growth mindset, proven in internship environments.",
    icon: BrainCircuit,
    themeKey: "yellow-500"
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter font-cyber">
            ABOUT ME
          </h2>
          <div className="h-px flex-1 bg-white/5"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {aboutItems.map((item, idx) => {
            const theme = colorThemes[item.themeKey] || colorThemes["cyber-green"];
            
            return (
              <Tilt key={idx} options={{ max: 15, scale: 1.05, speed: 600 }} className="h-full">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onMouseEnter={playHoverTick}
                  className={`bg-[rgba(10,12,18,0.95)] backdrop-blur-md border border-white/5 ${theme.border} ${theme.borderHover} ${theme.shadowHover} p-6 rounded-xl group relative overflow-hidden transition-all duration-300 h-full flex flex-col justify-between block`}
                >
                  {/* Cyber Dot-Matrix Overlay Grid */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, ${theme.hex}08 0%, transparent 60%), 
                                        radial-gradient(${theme.hex}10 1px, transparent 1px)`,
                      backgroundSize: '100% 100%, 12px 12px',
                    }}
                  />

                  {/* Corner Brackets */}
                  <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-t-2 group-hover:border-l-2 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 ${theme.hoverBorder} z-10`} />
                  <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-t-2 group-hover:border-r-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${theme.hoverBorder} z-10`} />
                  <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-b-2 group-hover:border-l-2 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 ${theme.hoverBorder} z-10`} />
                  <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-b-2 group-hover:border-r-2 group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${theme.hoverBorder} z-10`} />

                  {/* Laser Scanline */}
                  <div className={`absolute top-0 left-0 w-full h-[2px] ${theme.barColor} opacity-0 group-hover:opacity-75 group-hover:animate-[scan-pass_2.5s_linear_infinite] pointer-events-none z-10`}
                       style={{
                         boxShadow: `0 0 10px ${theme.hex}`,
                       }}
                  />

                  {/* Issuer Icon Overlay (Background Watermark) */}
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-25 transition-all duration-300 group-hover:scale-110 pointer-events-none z-0">
                     <item.icon size={80} className={`${theme.text}`} />
                  </div>

                  <div className="relative z-10 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Top Layout */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-2 rounded-lg ${theme.bg} ${theme.text} border ${theme.border}`}>
                          <item.icon size={24} />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-theme-muted bg-white/5 px-2.5 py-1 rounded-sm border border-white/5 flex items-center gap-1.5">
                          CORE_SKILL
                        </span>
                      </div>

                      <h3 className="font-cyber font-bold text-theme-text text-lg mb-2 leading-tight group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-theme-muted font-mono tracking-wide leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Cryptographic metadata details */}
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-theme-muted">
                      <div>
                        <span className="opacity-45">HASH:</span> <span className="text-white/60 font-bold">{`0x${(idx * 471927).toString(16).toUpperCase().padEnd(6, 'F').slice(0, 6)}`}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.barColor} animate-pulse`} />
                        <span className="opacity-70 tracking-wider">ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
