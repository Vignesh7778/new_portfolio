import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { Utensils, Terminal, Palette, Smartphone } from 'lucide-react';

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

const ProjectsSection = () => {
  const handleLinkClick = (e, url) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('trigger-cyber-crash', {
      detail: { url }
    }));
  };

  const projectItems = [
    {
      title: "Restaurant Table Booking",
      desc: "A luxury dining reservation system featuring real-time table availability, interactive slot selection, and elegant customer onboarding protocols.",
      tech: ["REACT", "TAILWIND", "VITE"],
      icon: Utensils,
      themeKey: "cyber-purple",
      link: "https://resturant-table-booking-project.vercel.app/",
      status: "LIVE",
      buttonText: "View Live Site"
    },
    {
      title: "CyberSec EduSuite",
      desc: "A Linux-based educational cybersecurity simulation tool designed to teach cybersecurity concepts through safe, containerized labs.",
      tech: ["LINUX", "SECURITY_LABS"],
      icon: Terminal,
      themeKey: "cyber-purple",
      link: "https://www.linkedin.com/posts/vignesh-m-b4a5ba300_cybersecurity-ethicalhacking-linux-activity-7427705005240983553-rNXK",
      status: "COMPLETED",
      buttonText: "View Project"
    },
    {
      title: "Mehndi Creations",
      desc: "High-performance multi-page artist deployment with automated gallery indexing and client booking protocols.",
      tech: ["BOOTSTRAP", "JS_ES6"],
      icon: Palette,
      themeKey: "cyber-cyan",
      link: "https://vignesh7778.github.io/Gomathi_mehendi_creations/",
      status: "LIVE",
      buttonText: "View Live Site"
    },
    {
      title: "EduAura Flutter App",
      desc: "An interactive and gamified quiz application built for school students to enhance learning engagement and track academic performance metrics.",
      tech: ["FLUTTER", "DART", "MOBILE_APP"],
      icon: Smartphone,
      themeKey: "cyber-cyan",
      link: "#",
      status: "ONGOING",
      buttonText: "Uplink In Progress",
      disabled: true
    }
  ];

  return (
    <section id="missions" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter font-cyber">
            MY PROJECTS
          </h2>
          <div className="h-px flex-1 bg-white/5"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {projectItems.map((project, idx) => {
            const theme = colorThemes[project.themeKey];
            
            return (
              <Tilt key={idx} options={{ max: 8, scale: 1.01, speed: 600 }} className="h-full">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onMouseEnter={playHoverTick}
                  className={`bg-[rgba(10,12,18,0.95)] backdrop-blur-md border border-white/5 ${theme.border} ${theme.borderHover} ${theme.shadowHover} p-6 md:p-10 rounded-xl group relative overflow-hidden transition-all duration-300 h-full flex flex-col justify-between`}
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

                  {/* Watermark Overlay */}
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-25 transition-all duration-300 group-hover:scale-110 pointer-events-none z-0">
                     <project.icon size={80} className={`${theme.text}`} />
                  </div>

                  <div className="relative z-10 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Top Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-2 rounded-lg ${theme.bg} ${theme.text} border ${theme.border}`}>
                          <project.icon size={24} />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-theme-muted bg-white/5 px-2.5 py-1 rounded-sm border border-white/5 flex items-center gap-1.5">
                          PROJECT {project.link !== "#" && <span className="text-yellow-500 font-bold">↗</span>}
                        </span>
                      </div>

                      <h3 className="font-cyber font-bold text-theme-text text-lg mb-2 leading-tight group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-theme-muted font-mono tracking-wide leading-relaxed mb-6 h-16">
                        {project.desc}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8 font-mono">
                        {project.tech.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-0.5 bg-black border border-white/5 text-[9px] text-white rounded-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      {project.disabled ? (
                        <a href="#" className="btn-apex !text-[9px] !px-4 !py-2 inline-block opacity-50 cursor-not-allowed" onClick={(e) => e.preventDefault()}>
                          {project.buttonText}
                        </a>
                      ) : (
                        <a href={project.link} target="_blank" rel="noreferrer" className="btn-apex !text-[9px] !px-4 !py-2 inline-block" onClick={(e) => handleLinkClick(e, project.link)}>
                          {project.buttonText}
                        </a>
                      )}

                      {/* Cryptographic metadata details */}
                      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-theme-muted">
                        <div>
                          <span className="opacity-45">HASH:</span> <span className="text-white/60 font-bold">{`0x${(idx * 837192).toString(16).toUpperCase().padEnd(6, 'F').slice(0, 6)}`}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${theme.barColor} animate-pulse`} />
                          <span className="opacity-70 tracking-wider">{project.status}</span>
                        </div>
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

export default ProjectsSection;
