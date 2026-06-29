import React from 'react';
import { playHoverTick } from '../utils/audio';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const colorThemes = {
  "cyber-lime": {
    text: "text-cyber-lime",
    bg: "bg-cyber-lime/5",
    border: "border-cyber-lime/20",
    borderHover: "group-hover:border-cyber-lime/40",
    shadowHover: "group-hover:shadow-[0_0_35px_rgba(191,255,0,0.12)]",
    hoverBorder: "group-hover:border-cyber-lime",
    barColor: "bg-cyber-lime",
    hex: "#bfff00"
  },
  "cyber-cyan": {
    text: "text-cyber-cyan",
    bg: "bg-cyber-cyan/5",
    border: "border-cyber-cyan/20",
    borderHover: "group-hover:border-cyber-cyan/40",
    shadowHover: "group-hover:shadow-[0_0_25px_rgba(0,243,255,0.12)]",
    hoverBorder: "group-hover:border-cyber-cyan",
    barColor: "bg-cyber-cyan",
    hex: "#00f3ff"
  }
};

const InternshipSection = () => {
  const theme = colorThemes["cyber-lime"];

  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter font-cyber">
            WORK EXPERIENCE
          </h2>
          <div className="h-px flex-1 bg-white/5"></div>
        </div>

        <Tilt options={{ max: 4, scale: 1.005, speed: 600 }} className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onMouseEnter={playHoverTick}
            className={`bg-[rgba(10,12,18,0.95)] backdrop-blur-md border border-white/5 ${theme.border} ${theme.borderHover} ${theme.shadowHover} p-6 md:p-10 rounded-xl group relative overflow-hidden transition-all duration-300 h-full flex flex-col justify-between`}
          >
            {/* Cyber Dot-Matrix Overlay Grid */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, ${theme.hex}06 0%, transparent 70%), 
                                  radial-gradient(${theme.hex}08 1px, transparent 1px)`,
                backgroundSize: '100% 100%, 14px 14px',
              }}
            />

            {/* Corner Brackets */}
            <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-t-2 group-hover:border-l-2 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 ${theme.hoverBorder} z-10`} />
            <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-t-2 group-hover:border-r-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${theme.hoverBorder} z-10`} />
            <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-b-2 group-hover:border-l-2 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 ${theme.hoverBorder} z-10`} />
            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-b-2 group-hover:border-r-2 group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${theme.hoverBorder} z-10`} />

            {/* Laser Scanline */}
            <div className={`absolute top-0 left-0 w-full h-[2px] ${theme.barColor} opacity-0 group-hover:opacity-75 group-hover:animate-[scan-pass_3s_linear_infinite] pointer-events-none z-10`}
              style={{
                boxShadow: `0 0 10px ${theme.hex}`,
              }}
            />

            {/* Watermark Overlay */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-25 transition-all duration-300 group-hover:scale-110 pointer-events-none z-0">
              <Briefcase size={80} className={`${theme.text}`} />
            </div>

            <div className="relative z-10 flex-grow">
              {/* Top Header info */}
              <div className="flex justify-between items-start mb-6">
                <div className={`p-2 rounded-lg ${theme.bg} ${theme.text} border ${theme.border}`}>
                  <Briefcase size={24} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-theme-muted bg-white/5 px-2.5 py-1 rounded-sm border border-white/5 flex items-center gap-1.5">
                  TIMELINE
                </span>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
                <div>
                  <span className="text-[9px] text-cyber-lime font-bold uppercase tracking-widest font-mono">
                    Internship Placement
                  </span>
                  <h3 className="font-cyber font-bold text-theme-text text-lg mb-2 leading-tight group-hover:text-white transition-colors">
                    Full Stack Web Development Intern
                  </h3>
                  <div className="text-cyber-cyan font-mono text-xs tracking-wide">
                    Adventure Technology Solutions Pvt Ltd
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs font-bold text-white px-4 py-1 border border-white/10 bg-white/5 inline-block">
                    02/06/2025 – 02/07/2025
                  </div>
                  <div className="text-[9px] text-gray-600 uppercase mt-2">
                    Tambaram, Chennai
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-6">
                <div className="lg:col-span-2">
                  <h4 className="text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-widest border-b border-white/5 pb-2 font-mono">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-4 font-mono">
                    <li className="flex items-start gap-4 text-[11px] text-gray-300 uppercase leading-relaxed">
                      <span className="text-cyber-lime mt-1">▶</span> Engineered responsive web interfaces using React.js and modern CSS patterns.
                    </li>
                    <li className="flex items-start gap-4 text-[11px] text-gray-300 uppercase leading-relaxed">
                      <span className="text-cyber-lime mt-1">▶</span> Assisted in backend integration tasks, bridging UI with data layers.
                    </li>
                    <li className="flex items-start gap-4 text-[11px] text-gray-300 uppercase leading-relaxed">
                      <span className="text-cyber-lime mt-1">▶</span> Gained hands-on mastery over HTML5, CSS3, JavaScript, and Full-Stack workflows.
                    </li>
                  </ul>
                </div>

                {/* Inner technologies box */}
                <Tilt options={{ max: 10, scale: 1.03, speed: 600 }} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    onMouseEnter={(e) => { e.stopPropagation(); playHoverTick(); }}
                    className={`bg-[rgba(5,7,12,0.98)] p-6 border ${colorThemes["cyber-cyan"].border} ${colorThemes["cyber-cyan"].borderHover} ${colorThemes["cyber-cyan"].shadowHover} rounded-lg group/tech relative overflow-hidden transition-all duration-300 h-full`}
                  >
                    {/* Cyber Dot-Matrix Overlay Grid */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, ${colorThemes["cyber-cyan"].hex}06 0%, transparent 70%), 
                                          radial-gradient(${colorThemes["cyber-cyan"].hex}08 1px, transparent 1px)`,
                        backgroundSize: '100% 100%, 10px 10px',
                      }}
                    />

                    {/* Corner Brackets */}
                    <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 transition-all duration-300 group-hover/tech:w-3 group-hover/tech:h-3 group-hover/tech:border-t group-hover/tech:border-l ${colorThemes["cyber-cyan"].hoverBorder} z-10`} />
                    <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 transition-all duration-300 group-hover/tech:w-3 group-hover/tech:h-3 group-hover/tech:border-t group-hover/tech:border-r ${colorThemes["cyber-cyan"].hoverBorder} z-10`} />
                    <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 transition-all duration-300 group-hover/tech:w-3 group-hover/tech:h-3 group-hover/tech:border-b group-hover/tech:border-l ${colorThemes["cyber-cyan"].hoverBorder} z-10`} />
                    <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 transition-all duration-300 group-hover/tech:w-3 group-hover/tech:h-3 group-hover/tech:border-b group-hover/tech:border-r ${colorThemes["cyber-cyan"].hoverBorder} z-10`} />

                    {/* Laser Scanline */}
                    <div className={`absolute top-0 left-0 w-full h-[1.5px] ${colorThemes["cyber-cyan"].barColor} opacity-0 group-hover/tech:opacity-75 group-hover/tech:animate-[scan-pass_2s_linear_infinite] pointer-events-none z-10`}
                      style={{
                        boxShadow: `0 0 8px ${colorThemes["cyber-cyan"].hex}`,
                      }}
                    />

                    <h4 className="text-[10px] font-bold text-white mb-4 uppercase font-mono relative z-10">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2 font-mono relative z-10">
                      <span className="px-2 py-1 border border-cyber-cyan/30 text-[8px] text-cyber-cyan bg-cyber-cyan/5">REACT.JS</span>
                      <span className="px-2 py-1 border border-cyber-cyan/30 text-[8px] text-cyber-cyan bg-cyber-cyan/5">NODE.JS</span>
                      <span className="px-2 py-1 border border-cyber-cyan/30 text-[8px] text-cyber-cyan bg-cyber-cyan/5">JAVASCRIPT</span>
                    </div>
                  </motion.div>
                </Tilt>
              </div>

              {/* Cryptographic metadata details */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-theme-muted">
                <div>
                  <span className="opacity-45">HASH:</span> <span className="text-white/60 font-bold">0x8B7CA1</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${theme.barColor} animate-pulse`} />
                  <span className="opacity-70 tracking-wider">COMPLETED</span>
                </div>
              </div>
            </div>
          </motion.div>
        </Tilt>

      </div>
    </section>
  );
};

export default InternshipSection;
