import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BreachScreen = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const humOscRef = useRef(null);
  const humGainRef = useRef(null);
  const mpegAudioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [systemRestored, setSystemRestored] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const logsPool = [
    "[INFO] Refresh event detected at " + new Date().toLocaleTimeString(),
    "[WARN] Security rollback attempt intercepted",
    "[FAIL] Handshake protocol bypassed by external node",
    "[SYS] Triggering Counter-Protocol 0x7E3A",
    "[BREACH] Injecting payload into /src/components/ProjectsSection.jsx",
    "[BREACH] Local storage registry decrypted successfully",
    "[BREACH] Extracting resume binary: VIGNESH_M_resume.pdf",
    "[SYS] Uploading files to dark_net_exfil_node_09",
    "[BREACH] Copying CertificatesSection metadata...",
    "[WARN] Local firewall status: COMPROMISED",
    "[SYS] Port 8080 redirected to remote proxy",
    "[INFO] Remote Session established at Chennai server",
    "[SYS] All portfolio data has been successfully mapped"
  ];

  // 1. Red Matrix Code Rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, columns;
    const fontSize = 14;
    const chars = "010101010101_SYSTEM_BREACHED_DATA_LEAK_WARNING_010101";
    let drops = [];

    const initMatrix = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(1, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#ff003c"; // Crimson red
      ctx.font = fontSize + "px 'JetBrains Mono'";
      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.985) drops[i] = 0;
        drops[i]++;
      }
    };

    initMatrix();
    const interval = setInterval(drawMatrix, 50);
    window.addEventListener('resize', initMatrix);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', initMatrix);
    };
  }, []);

  // 2. Advanced Audio Synthesizer (Web Audio API)
  const getLocalContext = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return null;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      return audioContextRef.current;
    } catch (e) {
      return null;
    }
  };

  const startHum = (ctx) => {
    if (isMuted || humOscRef.current) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, ctx.currentTime); // Deep rumbling A1 (55Hz)

      // Low pass filter to make it a clean sub-bass
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(90, ctx.currentTime);

      // LFO modulation for pulsating effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(3.5, ctx.currentTime); // 3.5Hz pulse
      lfoGain.gain.setValueAtTime(12, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 1.5); // slow fade-in

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      lfo.start();
      osc.start();

      humOscRef.current = osc;
      humGainRef.current = gain;
    } catch (e) {
      console.log("Hum start failed", e);
    }
  };

  const stopHum = () => {
    if (humGainRef.current) {
      try {
        const ctx = audioContextRef.current;
        if (ctx) {
          humGainRef.current.gain.setValueAtTime(humGainRef.current.gain.value, ctx.currentTime);
          humGainRef.current.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.4);
          const osc = humOscRef.current;
          setTimeout(() => {
            try { osc.stop(); } catch (e) {}
          }, 500);
        }
      } catch (e) {}
      humOscRef.current = null;
      humGainRef.current = null;
    }
  };

  const playSiren = () => {
    if (isMuted) return;
    try {
      const ctx = getLocalContext();
      if (!ctx) return;

      startHum(ctx);

      const now = ctx.currentTime;
      const duration = 0.95;

      // Dual detuned square and sawtooth oscillators for a harsh retro sci-fi alarm tone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'square';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.linearRampToValueAtTime(800, now + 0.35);
      osc1.frequency.linearRampToValueAtTime(250, now + 0.7);
      osc1.frequency.linearRampToValueAtTime(440, now + duration);

      osc2.frequency.setValueAtTime(444, now); // Detuned chorusing
      osc2.frequency.linearRampToValueAtTime(804, now + 0.35);
      osc2.frequency.linearRampToValueAtTime(254, now + 0.7);
      osc2.frequency.linearRampToValueAtTime(444, now + duration);

      filter.type = 'peaking';
      filter.frequency.setValueAtTime(700, now);
      filter.frequency.linearRampToValueAtTime(1100, now + 0.5);

      gainNode.gain.setValueAtTime(0.007, now);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (error) {
      console.log("Siren failed to play", error);
    }
  };

  const playTick = () => {
    if (isMuted) return;
    try {
      const ctx = getLocalContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500 + Math.random() * 500, now); // high frequency click
      
      gainNode.gain.setValueAtTime(0.003, now);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.03);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.03);
    } catch (e) {}
  };

  const playSuccessChime = () => {
    if (isMuted) return;
    try {
      stopHum();
      const ctx = getLocalContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51]; // C4, E4, G4, C5, E5, G5, C6, E6

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        
        gainNode.gain.setValueAtTime(0.012, now + idx * 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + idx * 0.05 + 0.45);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.45);
      });
    } catch (e) {
      console.log("Success chime blocked", e);
    }
  };

  // WhatsApp Audio (refresh_sound) initialization & Autoplay Attempt
  useEffect(() => {
    const audio = new Audio();
    audio.src = '/refresh_sound.mp3';
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = 0.55;
    mpegAudioRef.current = audio;

    // Attempt autoplay immediately
    audio.play()
      .then(() => {
        setHasStarted(true);
      })
      .catch(err => {
        console.log("Autoplay blocked. Awaiting user interaction gesture.", err);
      });

    return () => {
      audio.pause();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Sync WhatsApp Audio play/pause state with mute state and progress
  useEffect(() => {
    if (!hasStarted) return;
    if (isMuted || systemRestored) {
      if (mpegAudioRef.current) {
        mpegAudioRef.current.pause();
      }
    } else {
      if (mpegAudioRef.current && mpegAudioRef.current.paused) {
        mpegAudioRef.current.play().catch(e => console.log("Audio play blocked", e));
      }
    }
  }, [hasStarted, isMuted, systemRestored]);

  // 3. Progress and Terminal Logs simulation
  useEffect(() => {
    if (!hasStarted) return;

    const totalDuration = 4500; // 4.5 seconds for complete simulation
    const intervalTime = 60;
    const steps = totalDuration / intervalTime;
    let currentStep = Math.floor((progress / 100) * steps);

    // Seed initial logs
    setTerminalLogs([
      "[INFO] Loading module: Intrusion_Protocol_V1.dll",
      "[INFO] Remote Port scanning active..."
    ]);

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(Math.floor(currentProgress));
      
      // Play digital key click on processing ticks
      playTick();

      // Periodically append random logs based on progress
      if (currentStep % 5 === 0 && currentStep < steps) {
        const logIndex = Math.floor((currentProgress / 100) * logsPool.length);
        if (logIndex < logsPool.length) {
          setTerminalLogs(prev => {
            const nextLog = logsPool[logIndex];
            // Don't duplicate logs
            if (prev.includes(nextLog)) return prev;
            return [...prev, nextLog];
          });
        }
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        setTerminalLogs(prev => [...prev, "[SUCCESS] Payload exfiltrated. System locks active.", "[HALT] Action required: Authorize override to clear memory cache."]);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [hasStarted, progress]);

  // 4. Fullscreen state change detection (Escape key locks the screen)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && hasStarted && !systemRestored) {
        setHasStarted(false);
        if (navigator.keyboard && typeof navigator.keyboard.unlock === 'function') {
          navigator.keyboard.unlock();
        }
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [hasStarted, systemRestored]);

  // 5. Intercept keydowns to block Escape key propagation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && hasStarted && !systemRestored) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [hasStarted, systemRestored]);

  const handleOverride = () => {
    if (isRestoring) return;
    setIsRestoring(true);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch((err) => console.log("Exit fullscreen failed", err));
    }
    if (navigator.keyboard && typeof navigator.keyboard.unlock === 'function') {
      navigator.keyboard.unlock();
    }
    playSuccessChime();
    setSystemRestored(true);
    if (mpegAudioRef.current) {
      mpegAudioRef.current.pause();
    }
    setTimeout(() => {
      onComplete();
    }, 1200); // Wait for transition animation
  };

  if (!hasStarted) {
    return (
      <div 
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black select-none overflow-hidden font-mono cursor-pointer"
        onClick={() => {
          setHasStarted(true);
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().then(() => {
              if (navigator.keyboard && typeof navigator.keyboard.lock === 'function') {
                navigator.keyboard.lock(['Escape']).catch((err) => console.log("Keyboard lock failed", err));
              }
            }).catch((err) => console.log("Request fullscreen failed", err));
          }
          if (mpegAudioRef.current) {
            console.log("Starting refresh warning audio...");
            mpegAudioRef.current.play().catch(e => console.log("Audio play blocked on click:", e));
          }
        }}
      >
        {/* Background Matrix Rain */}
        <canvas ref={canvasRef} className="absolute inset-0 opacity-[0.2] pointer-events-none" />
        
        {/* Cyberpunk Scanlines */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent pointer-events-none animate-scanline" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card !border-red-500/40 p-8 text-center max-w-md mx-6 relative z-10 bg-black/95 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
        >
          <div className="text-red-500 text-5xl mb-6 animate-pulse">⚠️</div>
          <h2 className="font-cyber text-xl font-bold tracking-widest text-red-500 uppercase mb-4">
            SECURITY ANOMALY DETECTED
          </h2>
          <p className="text-xs text-red-400/80 mb-8 uppercase leading-relaxed tracking-wider">
            Protocol refresh-rollback initiated. Local secure connection has been compromised.
          </p>
          <div className="text-[10px] sm:text-xs md:text-sm font-bold text-red-500 uppercase tracking-widest animate-pulse border border-red-500/30 py-3 px-4 sm:px-6 bg-red-500/5 rounded whitespace-nowrap">
            [ CLICK SCREEN TO DECRYPT UPLINK ]
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black select-none overflow-hidden font-mono">
      {/* Background Matrix Rain */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-[0.25] pointer-events-none" />

      {/* Cyberpunk Scanlines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent pointer-events-none animate-scanline" />

      <div className="relative z-10 w-full max-w-2xl px-6">
        <AnimatePresence mode="wait">
          {!systemRestored ? (
            <motion.div
              key="breach"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="glass-card !border-red-500/50 p-6 md:p-8 rounded-lg shadow-[0_0_40px_rgba(239,68,68,0.15)] bg-black/90 relative overflow-hidden"
            >
              {/* Pulsing Alarm Header */}
              <div className="flex items-center justify-between border-b border-red-500/30 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping absolute" />
                  <span className="w-3.5 h-3.5 rounded-full bg-red-600 relative inline-block" />
                  <h2 className="font-cyber text-lg md:text-xl font-bold tracking-widest text-red-500 uppercase">
                    ALERT: SYSTEM COMPROMISED
                  </h2>
                </div>
                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className="text-[10px] border border-red-500/30 hover:border-red-500/80 px-2 py-0.5 rounded text-red-400 hover:text-red-300 transition"
                >
                  {isMuted ? "SOUND: OFF" : "SOUND: ON"}
                </button>
              </div>

              {/* Warning Message */}
              <div className="mb-6 bg-red-950/20 border border-red-500/20 p-4 rounded text-red-300 text-xs leading-relaxed">
                <div className="font-bold text-red-500 mb-1 uppercase">▶ REFRESH PROTOCOL DETECTED ◀</div>
                User initiated a page reload. In cybersecurity environments, page rollbacks force local socket resets.
                As a defense simulation measure, all portfolio database records are currently locked. exfiltration process: ACTIVE.
              </div>

              {/* Terminal Logs Window */}
              <div className="h-44 bg-black/80 border border-red-950/80 rounded p-3 text-[10px] text-red-400 overflow-y-auto mb-6 flex flex-col gap-1 select-text scrollbar-thin">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-red-600">{`>`}</span>
                    <span className="whitespace-pre-wrap">{log}</span>
                  </div>
                ))}
                <div className="w-1.5 h-3 bg-red-500 animate-pulse mt-0.5" />
              </div>

              {/* Progress and status */}
              <div className="mb-8">
                <div className="flex justify-between text-[11px] font-bold text-red-400 uppercase tracking-wider mb-2">
                  <span>EXFILTRATING DATA PACKAGE</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-red-950/80 border border-red-500/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-700 via-red-500 to-red-400 shadow-[0_0_15px_#ef4444]"
                    style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 border-t border-red-500/20 pt-4">
                {progress === 100 ? (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    onClick={handleOverride}
                    disabled={isRestoring}
                    className="btn-apex !bg-red-500 !text-white hover:!bg-red-600 hover:shadow-[0_0_25px_#ef4444] transition-all !px-6 !py-3 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    OVERRIDE WARNING & RESTORE SYSTEM
                  </motion.button>
                ) : (
                  <div className="text-[10px] text-red-500/50 uppercase tracking-widest animate-pulse py-2 font-bold w-full text-center sm:text-right">
                    BLOCKED BY THREAT INTRUSION PROTOCOL...
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="restored"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="glass-card !border-green-500/50 p-8 rounded-lg shadow-[0_0_40px_rgba(34,197,94,0.15)] bg-black/90 text-center"
            >
              <div className="text-5xl mb-4 text-green-500 animate-bounce">✓</div>
              <h2 className="font-cyber text-2xl font-black text-green-400 uppercase tracking-widest mb-2">
                SYSTEM PATTERNS RESTORED
              </h2>
              <p className="text-xs text-green-300 font-mono max-w-sm mx-auto mb-6">
                Security countermeasures active. Cache memory cleared and localized sandbox successfully restored.
              </p>
              <div className="text-[9px] text-green-500/60 uppercase tracking-widest animate-pulse font-bold">
                INITIATING SECURE ENCRYPTED UPLINK...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BreachScreen;
