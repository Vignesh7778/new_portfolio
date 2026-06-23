import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const skillsData = [
  { name: 'React.js / Next.js', val: 95 },
  { name: 'Node.js / Express', val: 88 },
  { name: 'Python / Java', val: 85 },
  { name: 'SQL / MongoDB', val: 90 },
  { name: 'Security Forensics', val: 94 }
];

const radarData = {
  labels: ['PROBLEM SOLVING', 'ANALYSIS', 'FULL-STACK', 'LOGIC', 'AGILITY', 'TEAMWORK'],
  datasets: [{
    data: [98, 92, 90, 85, 95, 88],
    backgroundColor: 'rgba(0, 243, 255, 0.1)',
    borderColor: '#00f3ff',
    borderWidth: 1,
    pointBackgroundColor: '#00f3ff'
  }]
};

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      grid: { color: 'rgba(255, 255, 255, 0.05)' },
      angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
      ticks: { display: false },
      pointLabels: { color: '#00f3ff', font: { size: 9, weight: 'bold', family: 'JetBrains Mono' } }
    }
  },
  plugins: { legend: { display: false } }
};

const colorThemes = {
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

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Radar Visualization */}
          <Tilt options={{ max: 5, scale: 1.01, speed: 600 }} className="h-full">
            <div 
              onMouseEnter={playHoverTick}
              className={`bg-[rgba(10,12,18,0.95)] backdrop-blur-md border border-white/5 ${colorThemes["cyber-cyan"].border} ${colorThemes["cyber-cyan"].borderHover} ${colorThemes["cyber-cyan"].shadowHover} p-6 md:p-12 rounded-2xl group relative overflow-hidden transition-all duration-300 h-full flex flex-col justify-between`}
            >
              {/* Cyber Dot-Matrix Overlay Grid */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, ${colorThemes["cyber-cyan"].hex}06 0%, transparent 70%), 
                                    radial-gradient(${colorThemes["cyber-cyan"].hex}08 1px, transparent 1px)`,
                  backgroundSize: '100% 100%, 14px 14px',
                }}
              />

              {/* Corner Brackets */}
              <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-t-2 group-hover:border-l-2 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 ${colorThemes["cyber-cyan"].hoverBorder} z-10`} />
              <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-t-2 group-hover:border-r-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${colorThemes["cyber-cyan"].hoverBorder} z-10`} />
              <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-b-2 group-hover:border-l-2 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 ${colorThemes["cyber-cyan"].hoverBorder} z-10`} />
              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/15 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-b-2 group-hover:border-r-2 group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${colorThemes["cyber-cyan"].hoverBorder} z-10`} />

              {/* Laser Scanline */}
              <div className={`absolute top-0 left-0 w-full h-[2px] ${colorThemes["cyber-cyan"].barColor} opacity-0 group-hover:opacity-75 group-hover:animate-[scan-pass_3s_linear_infinite] pointer-events-none z-10`}
                   style={{
                     boxShadow: `0 0 10px ${colorThemes["cyber-cyan"].hex}`,
                   }}
              />

              <div className="relative z-10">
                <h3 className="text-xs font-bold text-cyber-cyan uppercase tracking-[0.4em] mb-12 text-center font-mono">
                  SKILL MATRIX
                </h3>
                <div className="h-[320px]">
                  <Radar data={radarData} options={radarOptions} />
                </div>
              </div>
            </div>
          </Tilt>

          {/* Saturation Progress */}
          <Tilt options={{ max: 5, scale: 1.01, speed: 600 }} className="h-full">
            <div 
              onMouseEnter={playHoverTick}
              className={`bg-[rgba(10,12,18,0.95)] backdrop-blur-md border border-white/5 ${colorThemes["cyber-purple"].border} ${colorThemes["cyber-purple"].borderHover} ${colorThemes["cyber-purple"].shadowHover} p-6 md:p-12 rounded-2xl group relative overflow-hidden transition-all duration-300 h-full flex flex-col justify-between`}
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

              <div className="relative z-10 w-full">
                <h3 className="text-xs font-bold text-cyber-purple uppercase tracking-[0.4em] mb-12 text-center font-mono">
                  TECHNICAL PROFICIENCY
                </h3>
                <div className="space-y-8">
                  {skillsData.map((s, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1.5 uppercase font-mono">
                        <span>{s.name}</span>
                        <span className="text-cyber-cyan">{s.val}%</span>
                      </div>
                      <div className="h-1 bg-white/5 mt-3 overflow-hidden">
                        <motion.div 
                          className="h-full bg-cyber-cyan shadow-[0_0_10px_#00f3ff]"
                          initial={{ width: 0 }}
                          animate={isVisible ? { width: `${s.val}%` } : { width: 0 }}
                          transition={{ duration: 2, delay: idx * 0.1, ease: [0.1, 1, 0.1, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tilt>
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
