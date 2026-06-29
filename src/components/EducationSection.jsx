import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { Shield, Code, Award, GraduationCap } from 'lucide-react';
import { playHoverTick } from '../utils/audio';

const colorThemes = {
  "theme-primary": {
    text: "text-cyber-green",
    bg: "bg-cyber-green/5",
    border: "border-cyber-green/20",
    borderHover: "group-hover:border-cyber-green/40",
    shadowHover: "group-hover:shadow-[0_0_30px_rgba(57,255,20,0.12)]",
    hoverBorder: "group-hover:border-cyber-green",
    barColor: "bg-cyber-green",
    hex: "#39ff14"
  },
  "theme-secondary": {
    text: "text-cyber-cyan",
    bg: "bg-cyber-cyan/5",
    border: "border-cyber-cyan/20",
    borderHover: "group-hover:border-cyber-cyan/40",
    shadowHover: "group-hover:shadow-[0_0_30px_rgba(0,243,255,0.12)]",
    hoverBorder: "group-hover:border-cyber-cyan",
    barColor: "bg-cyber-cyan",
    hex: "#00f3ff"
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

const educationItems = [
  {
    title: "B.E. Computer Science & Engineering",
    subtitle: "UNDERGRADUATE REGISTRY",
    institution: "Chennai Node University",
    desc: "Specializing in software engineering architectures, database logic, and computer networking security protocols.",
    icon: Code,
    themeKey: "theme-secondary"
  },
  {
    title: "Pre-Final Year Candidate",
    subtitle: "ACADEMIC TIMELINE",
    institution: "Active Term: 2023 - 2027",
    desc: "Engaged in threat simulation protocols, full-stack application development paradigms, and secure coding implementations.",
    icon: Shield,
    themeKey: "theme-primary"
  },
  {
    title: "General Proficiency Rank 2",
    subtitle: "ACADEMIC EXCELLENCE",
    institution: "First Year Evaluation Registry",
    desc: "Recognized for outstanding academic achievement, advanced analytical performance, and mathematical logic.",
    icon: Award,
    themeKey: "yellow-500",
    link: "https://ibb.co/mrF5qBRk"
  }
];

const EducationSection = () => {
  const handleLinkClick = (e, url) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('trigger-cyber-crash', {
      detail: { url }
    }));
  };

  return (
    <section id="education" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex items-center gap-10 mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter font-cyber">
            ACADEMIC REGISTRY
          </h2>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {educationItems.map((item, idx) => {
            const theme = colorThemes[item.themeKey] || colorThemes["theme-primary"];
            const isClickable = !!item.link;
            const CardComponent = isClickable ? motion.a : motion.div;
            const extraProps = isClickable 
              ? { 
                  href: item.link, 
                  target: "_blank", 
                  rel: "noreferrer", 
                  onClick: (e) => handleLinkClick(e, item.link),
                  className: "cursor-pointer block"
                } 
              : {};
            
            return (
              <Tilt key={idx} options={{ max: 10, scale: 1.02, speed: 600 }} className="h-full">
                <CardComponent 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onMouseEnter={playHoverTick}
                  className={`bg-[rgba(10,12,18,0.95)] backdrop-blur-md border border-white/5 ${theme.border} ${theme.borderHover} ${theme.shadowHover} p-6 flex flex-col justify-between group h-full relative overflow-hidden transition-all duration-300 rounded-xl`}
                  {...extraProps}
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
                      {/* Top Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-2 rounded-lg ${theme.bg} ${theme.text} border ${theme.border}`}>
                          <item.icon size={24} />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-theme-muted bg-white/5 px-2.5 py-1 rounded-sm border border-white/5 flex items-center gap-1.5">
                          {item.subtitle} {isClickable && <span className="text-yellow-500 font-bold">↗</span>}
                        </span>
                      </div>

                      <h3 className="font-cyber font-bold text-theme-text text-lg mb-1 leading-tight group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <div className={`text-[11px] font-mono mb-4 ${theme.text} tracking-wider font-bold`}>
                        {item.institution}
                      </div>
                      <p className="text-xs text-theme-muted font-mono tracking-wide leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Cryptographic metadata details */}
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-theme-muted">
                      <div>
                        <span className="opacity-45">REG:</span> <span className="text-white/60 font-bold">{`0x${(idx * 983271).toString(16).toUpperCase().padEnd(6, 'F').slice(0, 6)}`}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.barColor} animate-pulse`} />
                        <span className="opacity-70 tracking-wider">ACTIVE_NODE</span>
                      </div>
                    </div>
                  </div>
                </CardComponent>
              </Tilt>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default EducationSection;
