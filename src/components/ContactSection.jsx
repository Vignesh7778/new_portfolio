import React, { useState } from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const colorThemes = {
  "cyber-cyan": {
    text: "text-cyber-cyan",
    bg: "bg-cyber-cyan/5",
    border: "border-cyber-cyan/20",
    borderHover: "group-hover:border-cyber-cyan/40",
    shadowHover: "group-hover:shadow-[0_0_40px_rgba(0,243,255,0.12)]",
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

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = colorThemes["cyber-cyan"];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const rawForm = e.target;
    const formData = new FormData(rawForm);
    const data = Object.fromEntries(formData);

    setIsSubmitting(true);

    const submitPromise = fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    window.dispatchEvent(new CustomEvent('trigger-cyber-exfil', {
      detail: {
        name: data.name ? data.name.substring(0, 3) + '***' : 'UNKNOWN',
        email: data.email ? data.email.split('@')[0].substring(0, 2) + '***@' + data.email.split('@')[1] : 'UNKNOWN',
        size: `${JSON.stringify(data).length} BYTES`,
        submitPromise,
        onComplete: () => {
          rawForm.reset();
          setIsSubmitting(false);
        }
      }
    }));
  };

  return (
    <section id="uplink" className="scroll-mt-32 px-6 lg:px-12 max-w-7xl mx-auto mb-48 relative z-10">
      <Tilt options={{ max: 3, scale: 1.002, speed: 600 }} className="w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onMouseEnter={playHoverTick}
          className={`bg-[rgba(10,12,18,0.95)] backdrop-blur-md border border-white/5 ${theme.border} ${theme.borderHover} ${theme.shadowHover} p-6 md:p-12 lg:p-24 rounded-xl group relative overflow-hidden transition-all duration-300 h-full flex flex-col justify-between`}
        >
          {/* Cyber Dot-Matrix Overlay Grid */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${theme.hex}04 0%, transparent 80%), 
                                radial-gradient(${theme.hex}06 1px, transparent 1px)`,
              backgroundSize: '100% 100%, 16px 16px',
            }}
          />

          {/* Corner Brackets */}
          <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l border-white/15 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-t-2 group-hover:border-l-2 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 ${theme.hoverBorder} z-10`} />
          <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r border-white/15 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-t-2 group-hover:border-r-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${theme.hoverBorder} z-10`} />
          <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/15 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-b-2 group-hover:border-l-2 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 ${theme.hoverBorder} z-10`} />
          <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/15 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-b-2 group-hover:border-r-2 group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${theme.hoverBorder} z-10`} />

          {/* Laser Scanline */}
          <div className={`absolute top-0 left-0 w-full h-[2px] ${theme.barColor} opacity-0 group-hover:opacity-75 group-hover:animate-[scan-pass_4.5s_linear_infinite] pointer-events-none z-10`}
               style={{
                 boxShadow: `0 0 10px ${theme.hex}`,
               }}
          />

          {/* Watermark Overlay */}
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-25 transition-all duration-300 group-hover:scale-110 pointer-events-none z-0">
             <Mail size={120} className={`${theme.text}`} />
          </div>

          <div className="relative z-10 flex-grow">
            {/* Top Header info */}
            <div className="flex justify-between items-start mb-12">
              <div className={`p-2 rounded-lg ${theme.bg} ${theme.text} border ${theme.border}`}>
                <Mail size={24} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-theme-muted bg-white/5 px-2.5 py-1 rounded-sm border border-white/5 flex items-center gap-1.5">
                SECURE_UPLINK
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter font-cyber">
                  CONTACT ME
                </h2>
                <p className="text-gray-500 text-sm mb-12 font-mono leading-relaxed uppercase">
                  Feel free to reach out. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
                   
                <div className="space-y-10 text-[11px] font-mono text-cyber-cyan/70">
                  <div className="flex flex-col gap-2 uppercase">
                    <span className="text-gray-800 font-bold tracking-[0.4em]">Email Address</span>
                    <span className="text-white text-base break-all">vigneshdevi22@gmail.com</span>
                  </div>
                  <div className="flex flex-col gap-2 uppercase">
                    <span className="text-gray-800 font-bold tracking-[0.4em]">Phone Number</span>
                    <span className="text-white text-base">+91 6374340277</span>
                  </div>
                  <div className="flex flex-col gap-3 uppercase">
                    <span className="text-gray-800 font-bold tracking-[0.4em]">Curriculum Vitae</span>
                    <div>
                      <button 
                        type="button"
                        onClick={triggerCVExtraction}
                        className="btn-outline-fill !px-6 !py-2.5 !text-[10px] tracking-widest cursor-pointer"
                      >
                        DOWNLOAD RESUME
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <form id="contact-form" className="space-y-6 font-mono" onSubmit={handleSubmit}>
                <input type="hidden" name="access_key" value="b48523cf-4e77-4832-a0bb-00a7e5418205" />
                <input type="hidden" name="subject" value="New Message from Portfolio Website" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="FULL NAME" 
                    required 
                    className="bg-[rgba(0,10,15,0.7)] border border-white/10 text-white font-mono text-[0.8rem] p-[15px] outline-none w-full transition-all duration-300 focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,243,255,0.1)] animate-none"
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="EMAIL ADDRESS" 
                    required 
                    className="bg-[rgba(0,10,15,0.7)] border border-white/10 text-white font-mono text-[0.8rem] p-[15px] outline-none w-full transition-all duration-300 focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,243,255,0.1)] animate-none"
                  />
                </div>
                
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="PHONE NUMBER" 
                  className="bg-[rgba(0,10,15,0.7)] border border-white/10 text-white font-mono text-[0.8rem] p-[15px] outline-none w-full transition-all duration-300 focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,243,255,0.1)] animate-none"
                />
                
                <textarea 
                  name="message" 
                  placeholder="YOUR MESSAGE" 
                  rows="5" 
                  required 
                  className="bg-[rgba(0,10,15,0.7)] border border-white/10 text-white font-mono text-[0.8rem] p-[15px] outline-none w-full transition-all duration-300 focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,243,255,0.1)] resize-none animate-none"
                ></textarea>
                
                <button type="submit" disabled={isSubmitting} className="btn-apex w-full tracking-[0.6em] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Uplinking...' : 'Send Message'}
                </button>
                
                <div className="text-[10px] font-mono mt-6 uppercase text-center min-h-[1.5em] tracking-widest text-cyber-cyan">
                  STATUS: {isSubmitting ? 'UPLINK IN PROGRESS' : 'READY TO UPLINK'}
                </div>
              </form>
            </div>

            {/* Cryptographic metadata details */}
            <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-theme-muted">
              <div>
                <span className="opacity-45">HASH:</span> <span className="text-white/60 font-bold">0x0A9F8E</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${theme.barColor} animate-pulse`} />
                <span className="opacity-70 tracking-wider">READY_TO_UPLINK</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Tilt>
    </section>
  );
};

export default ContactSection;
