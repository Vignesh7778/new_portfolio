import React, { useState, useEffect, useRef } from 'react';
import CyberLoader from './components/CyberLoader';
import BreachScreen from './components/BreachScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import InternshipSection from './components/InternshipSection';
import EducationSection from './components/EducationSection';
import CertificatesSection from './components/CertificatesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import { AnimatePresence, motion } from 'framer-motion';

// Sound Synthesizers using Web Audio API
const getSharedAudioCtx = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!window._sharedAudioCtx) {
    window._sharedAudioCtx = new AudioContext();
  }
  if (window._sharedAudioCtx.state === 'suspended') {
    window._sharedAudioCtx.resume();
  }
  return window._sharedAudioCtx;
};

const playExplosionSound = () => {
  try {
    const ctx = getSharedAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(10, now + 1.2);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(10, now + 1.2);
    
    const bufferSize = ctx.sampleRate * 1.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(120, now);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.00001, now + 1.2);
    
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 1.2);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    osc.start(now);
    noiseNode.start(now);
    
    osc.stop(now + 1.2);
    noiseNode.stop(now + 1.2);
  } catch (e) {}
};

const playOverloadAlarm = () => {
  try {
    const ctx = getSharedAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    for (let i = 0; i < 2; i++) {
      const start = now + i * 0.6;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, start);
      osc.frequency.linearRampToValueAtTime(880, start + 0.25);
      osc.frequency.linearRampToValueAtTime(440, start + 0.5);
      
      gain.gain.setValueAtTime(0.04, start);
      gain.gain.exponentialRampToValueAtTime(0.00001, start + 0.55);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.55);
    }
  } catch (e) {}
};

const playGlassShatter = () => {
  try {
    const ctx = getSharedAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const bufferSize = ctx.sampleRate * 0.6;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1500, now);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.5);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start(now);
    noise.stop(now + 0.55);
    
    const freqs = [1800, 2400, 3600, 4800];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.exponentialRampToValueAtTime(f * 0.8, now + 0.2 + idx * 0.05);
      
      oscGain.gain.setValueAtTime(0.03, now);
      oscGain.gain.exponentialRampToValueAtTime(0.00001, now + 0.25 + idx * 0.05);
      
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3 + idx * 0.05);
    });
  } catch (e) {}
};

const playCrtStatic = () => {
  try {
    const ctx = getSharedAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const bufferSize = ctx.sampleRate * 1.0;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(60, now + 0.9);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.95);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start(now);
    noise.stop(now + 1.0);
    
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(600, now + 0.8);
    
    oscGain.gain.setValueAtTime(0.03, now);
    oscGain.gain.exponentialRampToValueAtTime(0.00001, now + 0.85);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.85);
  } catch (e) {}
};

const playTerminalTick = () => {
  try {
    const ctx = getSharedAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    
    gain.gain.setValueAtTime(0.006, now);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.025);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  } catch (e) {}
};

let voiceAudioInstance = null;

const speakBlastMessage = () => {
  try {
    if (voiceAudioInstance) {
      voiceAudioInstance.pause();
      voiceAudioInstance.currentTime = 0;
    }
    const audio = new Audio('/voice.wav');
    audio.volume = 1.0;
    voiceAudioInstance = audio;
    audio.play().catch(err => console.log("Voice audio play blocked:", err));
  } catch (e) {
    console.log("Voice audio play error:", e);
  }
};

const stopBlastVoice = () => {
  try {
    if (voiceAudioInstance) {
      voiceAudioInstance.pause();
      voiceAudioInstance.currentTime = 0;
    }
  } catch (e) {}
};

const playSuccessChime = () => {
  try {
    const ctx = getSharedAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const freqs = [329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((f, index) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + index * 0.05);
      
      gainNode.gain.setValueAtTime(0.012, now + index * 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, now + index * 0.05 + 0.5);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now + index * 0.05);
      osc.stop(now + index * 0.05 + 0.5);
    });
  } catch (e) {}
};

const playFailureAlarm = () => {
  try {
    const ctx = getSharedAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc1.type = 'sawtooth';
    osc2.type = 'square';
    
    osc1.frequency.setValueAtTime(300, now);
    osc1.frequency.linearRampToValueAtTime(60, now + 0.8);
    
    osc2.frequency.setValueAtTime(150, now);
    osc2.frequency.linearRampToValueAtTime(30, now + 0.8);
    
    gainNode.gain.setValueAtTime(0.025, now);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.8);
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc1.start(now);
    osc2.start(now);
    
    osc1.stop(now + 0.8);
    osc2.stop(now + 0.8);
  } catch (e) {}
};

const playCrashBuzzer = () => {
  try {
    const ctx = getSharedAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    for (let i = 0; i < 3; i++) {
      const time = now + i * 0.15;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, time);
      osc.frequency.linearRampToValueAtTime(220, time + 0.1);
      gainNode.gain.setValueAtTime(0.04, time);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, time + 0.12);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.12);
    }
    
    const oscLow = ctx.createOscillator();
    const gainLow = ctx.createGain();
    oscLow.type = 'square';
    oscLow.frequency.setValueAtTime(60, now);
    oscLow.frequency.linearRampToValueAtTime(45, now + 3);
    
    const filterLow = ctx.createBiquadFilter();
    filterLow.type = 'lowpass';
    filterLow.frequency.setValueAtTime(100, now);
    
    gainLow.gain.setValueAtTime(0.05, now);
    gainLow.gain.exponentialRampToValueAtTime(0.00001, now + 3);
    
    oscLow.connect(filterLow);
    filterLow.connect(gainLow);
    gainLow.connect(ctx.destination);
    
    oscLow.start(now);
    oscLow.stop(now + 3);
  } catch (e) {
    console.log("Crash audio error:", e);
  }
};

const CrackedScreen = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-[9999999] opacity-80" viewBox="0 0 1000 1000" preserveAspectRatio="none">
    <circle cx="500" cy="500" r="3" fill="#ffffff" filter="drop-shadow(0 0 8px #ffffff)" />
    <circle cx="500" cy="500" r="8" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
    <circle cx="500" cy="500" r="18" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.4" />
    <path d="M 500 500 L 450 420 L 410 400 L 320 370 L 200 360 L 50 340" fill="none" stroke="#ffffff" strokeWidth="2.5" filter="drop-shadow(0 0 4px #ffffff)" />
    <path d="M 450 420 L 480 340 L 490 220 L 480 50" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
    <path d="M 410 400 L 360 460 L 280 490 L 150 510 L 0 520" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
    <path d="M 500 500 L 580 430 L 670 380 L 790 350 L 920 310 L 1000 300" fill="none" stroke="#ffffff" strokeWidth="2" filter="drop-shadow(0 0 3px #ffffff)" />
    <path d="M 580 430 L 610 520 L 640 650 L 680 800 L 710 1000" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
    <path d="M 500 500 L 460 580 L 420 670 L 390 790 L 360 920 L 350 1000" fill="none" stroke="#ffffff" strokeWidth="2.5" filter="drop-shadow(0 0 4px #ffffff)" />
    <path d="M 460 580 L 380 590 L 260 580 L 120 560 L 0 550" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.85" />
    <path d="M 500 500 L 590 560 L 680 610 L 800 680 L 910 740 L 1000 770" fill="none" stroke="#ffffff" strokeWidth="1.8" opacity="0.95" />
    <path d="M 320 370 L 300 290 L 260 260 L 180 240" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.7" />
    <path d="M 670 380 L 720 310 L 790 280 L 880 270" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.7" />
    <path d="M 680 610 L 730 700 L 790 760 L 850 800" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.7" />
    <path d="M 420 670 L 500 700 L 580 730 L 650 750" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
    <path d="M 480 340 L 580 430 M 410 400 L 450 420 M 460 580 L 590 560 M 360 460 L 460 580" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
    <circle cx="850" cy="200" r="1.5" fill="#ffffff" />
    <path d="M 850 200 L 810 160 L 750 140" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
    <path d="M 850 200 L 890 220 L 950 230" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
    <path d="M 850 200 L 860 260 L 880 320" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.4" />
  </svg>
);

const overlayVariants = {
  idle: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    filter: "brightness(1) contrast(1)",
    x: 0,
    y: 0
  },
  overload: {
    opacity: 1,
    scaleX: [1, 1.02, 0.98, 1.02, 0.98, 1],
    scaleY: [1, 0.98, 1.02, 0.98, 1.02, 1],
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    y: [0, 5, -5, 5, -5, 2, -2, 0],
    filter: [
      "brightness(1) contrast(1) hue-rotate(0deg)",
      "brightness(1.5) contrast(1.3) hue-rotate(15deg)",
      "brightness(1) contrast(1) hue-rotate(0deg)"
    ],
    transition: {
      x: { repeat: Infinity, duration: 0.2 },
      y: { repeat: Infinity, duration: 0.2 },
      scaleX: { repeat: Infinity, duration: 0.3 },
      scaleY: { repeat: Infinity, duration: 0.3 },
      filter: { repeat: Infinity, duration: 0.4 }
    }
  },
  detonation: {
    opacity: 1,
    scaleX: [1, 1.05, 0.95, 1.05, 1],
    scaleY: [1, 0.95, 1.05, 0.95, 1],
    x: [0, -20, 20, -20, 20, -10, 10, 0],
    y: [0, 10, -10, 10, -10, 5, -5, 0],
    backgroundColor: [
      "rgba(0,0,0,0.95)",
      "rgba(255,0,0,0.85)",
      "rgba(255,255,255,0.95)",
      "rgba(0,243,255,0.85)",
      "rgba(0,0,0,0.95)"
    ],
    transition: {
      x: { repeat: Infinity, duration: 0.15 },
      y: { repeat: Infinity, duration: 0.15 },
      backgroundColor: { repeat: Infinity, duration: 0.2 }
    }
  },
  collapse: {
    scaleY: [1, 0.005, 0.005, 0],
    scaleX: [1, 1, 0.005, 0],
    filter: [
      "brightness(1) contrast(1)",
      "brightness(4) contrast(3)",
      "brightness(8) contrast(5)",
      "brightness(0)"
    ],
    transition: {
      scaleY: { duration: 0.4, ease: "easeIn" },
      scaleX: { delay: 0.4, duration: 0.3, ease: "easeIn" },
      filter: { duration: 0.7, ease: "easeIn" }
    }
  },
  reboot: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    filter: "brightness(1) contrast(1)",
    x: 0,
    y: 0,
    transition: { duration: 0.3 }
  }
};

const filesToBlast = [
  { name: 'VIGNESH_M_resume.pdf', size: '114KB', angle: 0 },
  { name: 'index.html', size: '1.2KB', angle: 45 },
  { name: 'secrets.db', size: '42KB', angle: 90 },
  { name: 'trojan.exe', size: '8.4MB', angle: 135 },
  { name: 'ransomware.bin', size: '256KB', angle: 180 },
  { name: 'passwords.txt', size: '14B', angle: 225 },
  { name: 'exploit.sh', size: '2KB', angle: 270 },
  { name: 'root_access.key', size: '1KB', angle: 315 }
];

function App() {
  const [loading, setLoading] = useState(true);
  const [isReload, setIsReload] = useState(false);
  const [breachWarning, setBreachWarning] = useState(false);
  const [logs, setLogs] = useState(["Auth: Handshake Success", "Scan: 0 Intrusions", "Node: Chennai Active", "Link: Encrypted", "V-Core: Optimized"]);

  // Ref for Background Music
  const bgAudioRef = useRef(null);
  const hackingAudioRef = useRef(null);
  const crashAudioRef = useRef(null);
  const crashIntervalRef = useRef(null);

  // State for Global Exfiltration Overlay
  const [exfilActive, setExfilActive] = useState(false);
  const [exfilState, setExfilState] = useState('idle'); // idle, transmitting, success, error
  const [exfilProgress, setExfilProgress] = useState(0);
  const [exfilLogs, setExfilLogs] = useState([]);
  const [exfilFormDataSummary, setExfilFormDataSummary] = useState({ name: '', email: '', size: '' });
  const [exfilIsBlasted, setExfilIsBlasted] = useState(false);
  const [exfilStuck, setExfilStuck] = useState(false);
  const [blastPhase, setBlastPhase] = useState('idle'); // idle | overload | detonation | collapse | reboot
  const [biosLogs, setBiosLogs] = useState([]);

  // State for Global Crash Overlay
  const [crashActive, setCrashActive] = useState(false);
  const [crashCountdown, setCrashCountdown] = useState(5.00);
  const [crashUrl, setCrashUrl] = useState('');
  const [crashComplete, setCrashComplete] = useState(false);

  // State to stop background music when resume is downloaded
  const [bgMusicStopped, setBgMusicStopped] = useState(false);

  // Initialize Background Music
  useEffect(() => {
    const audio = new Audio('/background.mp3');
    audio.loop = true;
    audio.volume = 0.28;
    bgAudioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  // Play/Pause Background Music based on active overlay/loading status
  useEffect(() => {
    if (!bgAudioRef.current) return;
    const shouldPlay = !loading && !isReload && !exfilActive && !crashActive && !bgMusicStopped;
    if (shouldPlay) {
      bgAudioRef.current.play().catch(err => {
        console.log("Background audio play blocked. Awaiting interaction gesture.", err);
      });
    } else {
      bgAudioRef.current.pause();
    }
  }, [loading, isReload, exfilActive, crashActive, bgMusicStopped]);

  // Click handler fallback to kick off background music after initial interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!bgAudioRef.current) return;
      const shouldPlay = !loading && !isReload && !exfilActive && !crashActive && !bgMusicStopped;
      if (shouldPlay && bgAudioRef.current.paused) {
        bgAudioRef.current.play().catch(() => {});
      }
    };
    window.addEventListener('click', handleUserInteraction);
    return () => window.removeEventListener('click', handleUserInteraction);
  }, [loading, isReload, exfilActive, crashActive, bgMusicStopped]);

  useEffect(() => {
    const sessionActive = sessionStorage.getItem('site_session_active');
    const comingBack = sessionStorage.getItem('coming_back_from_redirect');
    if (comingBack) {
      sessionStorage.removeItem('coming_back_from_redirect');
      setIsReload(false);
      setLoading(false);
      setBgMusicStopped(false);
      
      const savedScroll = sessionStorage.getItem('saved_scroll_y');
      if (savedScroll) {
        const scrollY = parseInt(savedScroll, 10);
        window.scrollTo(0, scrollY);
        setTimeout(() => {
          window.scrollTo(0, scrollY);
          sessionStorage.removeItem('saved_scroll_y');
        }, 150);
      }
    } else if (sessionActive) {
      setIsReload(true);
      setLoading(true);
    } else {
      sessionStorage.setItem('site_session_active', 'true');
    }
  }, []);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setBreachWarning(true);
      setTimeout(() => setBreachWarning(false), 2500);
    };
    
    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  useEffect(() => {
    if (loading) return;
    const logPhrases = ["Auth: Handshake Success", "Scan: 0 Intrusions", "Node: Chennai Active", "Link: Encrypted", "V-Core: Optimized", "Routing: Secure", "Threat: None"];
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLog = `[${new Date().toLocaleTimeString()}] ${logPhrases[Math.floor(Math.random() * logPhrases.length)]}`;
        return [...prev.slice(1), newLog];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [loading]);

  // Global Exfiltration Trigger
  useEffect(() => {
    const handleTriggerExfil = (e) => {
      const { name, email, size, submitPromise, onComplete } = e.detail;

      if (name === 'VIGNESH_M_resume.pdf') {
        setBgMusicStopped(true);
      }

      setExfilFormDataSummary({ name, email, size });
      setExfilActive(true);
      setExfilState('transmitting');
      setExfilProgress(0);
      setExfilLogs(["[UPLINK] Initiating handshake to proxy gateway..."]);
      setExfilIsBlasted(false);
      setExfilStuck(false);
      setBlastPhase('idle');
      setBiosLogs([]);

      // Stop any previously playing hacking audio
      if (hackingAudioRef.current) {
        hackingAudioRef.current.pause();
        hackingAudioRef.current.currentTime = 0;
      }
      stopBlastVoice();

      // Play hacker sound (loaded from public folder)
      try {
        const audio = new Audio('/hacking_sound.mp3');
        audio.volume = 0.55;
        hackingAudioRef.current = audio;
        audio.play().catch(err => console.log("Audio play blocked:", err));
      } catch (err) {
        console.log("Audio play error:", err);
      }

      const logMilestones = [
        { p: 15, text: "[CRYPTO] Encrypting envelope payload with AES-256..." },
        { p: 30, text: "[INJECT] Compiling delivery binary 'web3forms_exfil.exe'..." },
        { p: 45, text: "[FIREWALL] Bypassing connection port checks..." },
        { p: 60, text: "[PACKET] Splitting telemetry into 4 SHA-256 chunks..." },
        { p: 75, text: "[CONN] Broadcasting chunks to remote node..." },
        { p: 90, text: "[STATUS] Awaiting remote execution checksum..." }
      ];

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 8) + 4;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);

          // Phase 1: Overload
          setBlastPhase('overload');
          playOverloadAlarm();
          setExfilLogs(prev => [
            ...prev,
            "[ALERT] SECURITY SYSTEM EXFIL BYPASS DETECTED.",
            "[ALERT] INTENSE VOLTAGE FLUX AT LOCAL GATEWAY.",
            "[FATAL] THERMAL SENSOR READS 148°C.",
            "[FATAL] EMERGENCY SHUTDOWN SUSPENDED BY THREAD LOCK."
          ]);

          // Phase 2: Detonation (1.2 seconds later)
          setTimeout(() => {
            setBlastPhase('detonation');
            setExfilIsBlasted(true);
            playExplosionSound();
            playGlassShatter();
            speakBlastMessage();
            // Fade out hacking audio on detonation
            if (hackingAudioRef.current) {
              const ha = hackingAudioRef.current;
              const fadeOut = setInterval(() => {
                if (ha.volume > 0.05) { ha.volume = Math.max(0, ha.volume - 0.05); }
                else { clearInterval(fadeOut); ha.pause(); ha.currentTime = 0; }
              }, 50);
            }
            setExfilLogs(prev => [
              ...prev,
              "[FATAL] CORE DETONATED! HARDWARE DAMAGED.",
              "[CRITICAL] DISPLAY DRIVER FAULT - SECTOR CRACKED."
            ]);

            // Phase 3: CRT Collapse (1.5 seconds later)
            setTimeout(() => {
              setBlastPhase('collapse');
              playCrtStatic();

              // Phase 4: Reboot BIOS diagnostic screen (1.2 seconds later)
              setTimeout(() => {
                setBlastPhase('reboot');
                setBiosLogs([]);

                const biosLines = [
                  "APEX PORTFOLIO SECURE BOOT v4.92.1",
                  "CRITICAL DETONATION SPIKE DETECTED",
                  "RESTORE POINT: BLOCK_0x982A1 [LOADED]",
                  "MEM CHECK: 64.0 GB RAM ................... [ OK ]",
                  "CORE KERNEL INTEGRITY CHECKSUM ......... [ PASS ]",
                  "CRYPTOGRAPHIC KEYCHAINS RE-LINKED ...... [ OK ]",
                  "LOCAL GATEWAY PORTS BINDING ............ [ SECURE ]",
                  "FLUSHING DETONATION FLUX CACHE ......... [ DONE ]",
                  "RE-ESTABLISHING SECURE GATEWAY UPLINK .. [ CONNECTED ]",
                  "RESTORING SYSTEM GRAPHICAL DRIVERS ..... [ OK ]",
                  "APEX PORTFOLIO UPLINK READY."
                ];

                let lineIndex = 0;
                const printInterval = setInterval(() => {
                  if (lineIndex < biosLines.length) {
                    const lineText = biosLines[lineIndex];
                    setBiosLogs(prev => [...prev, lineText]);
                    playTerminalTick();
                    lineIndex++;
                  } else {
                    clearInterval(printInterval);

                    // Finalize sequence (600ms later)
                    setTimeout(() => {
                      if (submitPromise) {
                        submitPromise
                          .then(res => {
                            if (res.status === 200) {
                              setExfilState('success');
                              playSuccessChime();
                              if (onComplete) onComplete();
                              setTimeout(() => {
                                stopBlastVoice();
                                setExfilActive(false);
                                setBgMusicStopped(false);
                                setExfilState('idle');
                                setBlastPhase('idle');
                                setExfilIsBlasted(false);
                                setBiosLogs([]);
                              }, 2000);
                            } else {
                              throw new Error("HTTP " + res.status);
                            }
                          })
                          .catch(err => {
                            setExfilState('error');
                            playFailureAlarm();
                            if (onComplete) onComplete();
                            setTimeout(() => {
                              stopBlastVoice();
                              setExfilActive(false);
                              setBgMusicStopped(false);
                              setExfilState('idle');
                              setBlastPhase('idle');
                              setExfilIsBlasted(false);
                              setBiosLogs([]);
                            }, 3000);
                          });
                      } else {
                        // Direct success for simple actions like resume download
                        setExfilState('success');
                        playSuccessChime();
                        if (onComplete) onComplete();
                        setTimeout(() => {
                          stopBlastVoice();
                          setExfilActive(false);
                          setBgMusicStopped(false);
                          setExfilState('idle');
                          setBlastPhase('idle');
                          setExfilIsBlasted(false);
                          setBiosLogs([]);
                        }, 1800);
                      }
                    }, 600);
                  }
                }, 280);
              }, 1200);
            }, 1500);
          }, 1200);
        }

        setExfilProgress(currentProgress);

        logMilestones.forEach(m => {
          if (currentProgress >= m.p) {
            setExfilLogs(prev => {
              if (prev.includes(m.text)) return prev;
              return [...prev, m.text];
            });
          }
        });
      }, 150);
    };

    window.addEventListener('trigger-cyber-exfil', handleTriggerExfil);
    return () => window.removeEventListener('trigger-cyber-exfil', handleTriggerExfil);
  }, []);

  const handleCloseCrashAndOpen = (url) => {
    if (crashIntervalRef.current) {
      clearInterval(crashIntervalRef.current);
      crashIntervalRef.current = null;
    }
    if (crashAudioRef.current) {
      crashAudioRef.current.pause();
      crashAudioRef.current.currentTime = 0;
      crashAudioRef.current = null;
    }
    // Mute background music so it doesn't bleed into target tab
    setBgMusicStopped(true);
    try {
      window.open(url, '_blank');
    } catch (err) {
      console.log("Failed to open link:", err);
    }
    setCrashActive(false);
  };

  // Global Crash Trigger
  useEffect(() => {
    const handleTriggerCrash = (e) => {
      const { url } = e.detail;

      // Save scroll Y position and coming-back bypass flag immediately on click
      sessionStorage.setItem('coming_back_from_redirect', 'true');
      sessionStorage.setItem('saved_scroll_y', window.scrollY.toString());

      setCrashUrl(url);
      setCrashActive(true);
      setCrashCountdown(5.00);
      setCrashComplete(false);

      // Stop any playing hacking/exfil audio immediately
      if (hackingAudioRef.current) {
        hackingAudioRef.current.pause();
        hackingAudioRef.current.currentTime = 0;
        hackingAudioRef.current = null;
      }
      // Stop any playing voice audio
      stopBlastVoice();
      // Stop any previous crash audio
      if (crashAudioRef.current) {
        crashAudioRef.current.pause();
        crashAudioRef.current.currentTime = 0;
      }

      // Play custom nuke audio file (looped continuously)
      try {
        const audio = new Audio('/crash_sound.mp3');
        audio.volume = 0.65;
        audio.loop = true;
        crashAudioRef.current = audio;
        audio.play().catch(err => console.log("Crash audio play blocked:", err));
      } catch (err) {
        console.log("Crash audio error:", err);
      }

      let currentCountdown = 5.00;
      if (crashIntervalRef.current) clearInterval(crashIntervalRef.current);
      crashIntervalRef.current = setInterval(() => {
        currentCountdown = Math.max(0, currentCountdown - 0.05);
        setCrashCountdown(Number(currentCountdown.toFixed(2)));

        if (currentCountdown <= 0) {
          clearInterval(crashIntervalRef.current);
          crashIntervalRef.current = null;
          setCrashComplete(true);
          // Try to auto-open
          try {
            window.open(url, '_blank');
          } catch (err) {
            console.log("Auto-open blocked:", err);
          }
        }
      }, 50);
    };

    window.addEventListener('trigger-cyber-crash', handleTriggerCrash);
    return () => {
      window.removeEventListener('trigger-cyber-crash', handleTriggerCrash);
      if (crashIntervalRef.current) clearInterval(crashIntervalRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-cyber-black text-white font-sans selection:bg-cyber-cyan/30 selection:text-white">
      <CustomCursor />
      
      {breachWarning && (
        <div className="fixed inset-0 z-[100000] bg-red-900/90 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="font-cyber text-4xl text-white font-bold tracking-widest uppercase">Security Breach Detected</h1>
            <p className="font-mono text-red-300 mt-2">UNAUTHORIZED ACCESS ATTEMPT BLOCKED</p>
          </div>
        </div>
      )}

      {/* Global Exfiltration Overlay */}
      <AnimatePresence>
        {exfilActive && (
          <motion.div 
            variants={overlayVariants}
            initial="idle"
            animate={blastPhase === 'idle' ? 'idle' : blastPhase}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[999999] flex flex-col items-center justify-center p-6 text-cyber-cyan font-mono overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/5 to-transparent pointer-events-none animate-scanline" />

            {(blastPhase === 'detonation' || blastPhase === 'collapse') && <CrackedScreen />}

            {blastPhase === 'reboot' ? (
              <div className="w-full max-w-xl border border-cyber-lime/30 bg-black p-6 rounded shadow-[0_0_50px_rgba(57,255,20,0.15)] relative overflow-hidden text-cyber-lime">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-lime shadow-[0_0_12px_#39ff14] opacity-40 animate-[scan-pass_3s_linear_infinite]" />
                <div className="flex justify-between items-center border-b border-cyber-lime/20 pb-3 mb-6 font-cyber uppercase tracking-widest text-xs">
                  <span>[ SYSTEM REBOOT PROTOCOL ]</span>
                  <span className="animate-pulse">SYS_SEC_RECOVERY</span>
                </div>
                <div className="space-y-2 text-[10px] md:text-xs font-mono leading-relaxed min-h-[220px]">
                  {biosLogs.map((log, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <span className="text-cyber-lime/40">&gt;&gt;</span>
                      <span className="text-white">{log}</span>
                    </div>
                  ))}
                  {biosLogs.length < 11 && (
                    <div className="flex gap-1 items-center">
                      <span className="text-cyber-lime/40">&gt;&gt;</span>
                      <span className="w-1.5 h-3 bg-cyber-lime animate-pulse" />
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-3 border-t border-cyber-lime/10 text-center text-[8px] uppercase tracking-[0.3em] text-cyber-lime/50 animate-pulse">
                  APEX EMERGENCY FIRMWARE SEC_RESTORE_ACTIVE
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xl border border-cyber-cyan/30 bg-black/90 p-6 rounded shadow-[0_0_50px_rgba(0,243,255,0.15)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-cyan shadow-[0_0_12px_#00f3ff] opacity-40 animate-[scan-pass_3s_linear_infinite]" />

                <div className="flex justify-between items-center border-b border-cyber-cyan/20 pb-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${exfilState === 'error' ? 'bg-red-500 animate-ping' : exfilState === 'success' ? 'bg-green-500 animate-pulse' : 'bg-cyber-cyan animate-ping'}`} />
                    <span className={`text-xs uppercase font-bold tracking-widest ${exfilState === 'error' ? 'text-red-500' : exfilState === 'success' ? 'text-green-400' : 'text-cyber-cyan'}`}>
                      {exfilState === 'transmitting' 
                        ? (exfilIsBlasted ? 'STATUS: TRANSMISSION COMPLETED' : 'Uplink: Transmitting Data') 
                        : exfilState === 'success' 
                          ? 'Uplink: Connected & Sent' 
                          : 'Uplink: Core Error'}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">
                    SYS_PORT: 0xFD91
                  </div>
                </div>

                <div className="relative h-44 border border-cyber-cyan/15 rounded flex items-center justify-center overflow-hidden mb-6 bg-black/60">
                  <div className="absolute inset-0 bg-cyber-cyan/[0.02] pointer-events-none" />
                  
                  <div className="w-full h-full flex items-center justify-center relative">
                    <motion.div 
                      className={`w-12 h-12 rounded-full border flex items-center justify-center relative z-20 ${exfilIsBlasted ? 'bg-red-500 border-red-500 shadow-[0_0_50px_#ef4444]' : 'bg-cyber-cyan/10 border-cyber-cyan/40 shadow-[0_0_30px_rgba(0,243,255,0.3)]'}`}
                      animate={exfilIsBlasted ? { scale: [1, 2.5, 0] } : { scale: [1, 1.1, 1] }}
                      transition={exfilIsBlasted ? { duration: 0.6, ease: "easeOut" } : { repeat: Infinity, duration: 1.5 }}
                    >
                      <span className={`text-[10px] font-bold ${exfilIsBlasted ? 'text-white' : 'text-cyber-cyan'}`}>
                        {exfilIsBlasted ? '💥' : 'CORE'}
                      </span>
                    </motion.div>

                    {filesToBlast.map((file, i) => {
                      const angleRad = (file.angle * Math.PI) / 180;
                      return (
                        <motion.div
                          key={i}
                          className="absolute text-[8px] bg-black/85 px-2 py-0.5 border border-white/5 rounded font-mono pointer-events-none z-10 text-cyber-cyan/80 whitespace-nowrap"
                          initial={{
                            x: Math.cos(angleRad) * 60,
                            y: Math.sin(angleRad) * 60,
                            opacity: 0.8,
                            scale: 1
                          }}
                          animate={exfilIsBlasted ? {
                            x: Math.cos(angleRad) * 350,
                            y: Math.sin(angleRad) * 350,
                            opacity: 0,
                            scale: 0.2,
                            rotate: Math.random() * 360 - 180
                          } : {
                            x: [Math.cos(angleRad) * 60, Math.cos(angleRad) * 66, Math.cos(angleRad) * 60],
                            y: [Math.sin(angleRad) * 60, Math.sin(angleRad) * 66, Math.sin(angleRad) * 60],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={exfilIsBlasted ? {
                            duration: 0.7,
                            ease: "easeOut"
                          } : {
                            repeat: Infinity,
                            duration: 2 + (i % 3),
                            ease: "easeInOut"
                          }}
                        >
                          📄 {file.name} ({file.size})
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-cyber-cyan/5 border border-cyber-cyan/15 rounded p-3 text-xs mb-6 text-cyber-cyan/80">
                  <div className="font-bold text-cyber-cyan mb-1.5 uppercase text-[10px] tracking-widest border-b border-cyber-cyan/10 pb-1">
                    Exfiltrating Payload Cache
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>SOURCE: <span className="text-white">{exfilFormDataSummary.name}</span></div>
                    <div>ADDR: <span className="text-white">{exfilFormDataSummary.email}</span></div>
                    <div>SIZE: <span className="text-white">{exfilFormDataSummary.size}</span></div>
                    <div>STATUS: <span className="text-white uppercase animate-pulse">{exfilState}</span></div>
                  </div>
                </div>

                <div className="h-32 bg-black border border-cyber-cyan/10 rounded p-3 text-[10px] text-cyber-cyan/70 overflow-y-auto mb-6 flex flex-col gap-1 select-text scrollbar-thin">
                  {exfilLogs.map((log, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="text-cyber-cyan/40">&gt;</span>
                      <span className="whitespace-pre-wrap">{log}</span>
                    </div>
                  ))}
                  {exfilState === 'transmitting' && (
                    <div className="flex gap-1 items-center">
                      <span className="text-cyber-cyan/40">&gt;</span>
                      <span className="w-1.5 h-3 bg-cyber-cyan animate-pulse" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-cyber-cyan/90 uppercase tracking-wider mb-2">
                    <span>Infiltrating Web3 Gateway</span>
                    <span>{exfilProgress}%</span>
                  </div>
                  <div className="h-1.5 bg-cyber-cyan/10 border border-cyber-cyan/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyber-cyan to-white shadow-[0_0_12px_#00f3ff]"
                      style={{ width: `${exfilProgress}%`, transition: 'width 0.1s linear' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Fullscreen Exploding Particles */}
            {exfilIsBlasted && Array.from({ length: 32 }).map((_, i) => {
              const particleAngle = (i * 360) / 32;
              const particleRad = (particleAngle * Math.PI) / 180;
              const distance = 350 + Math.random() * 450;
              return (
                <motion.div
                  key={`fullscreen-part-${i}`}
                  className="absolute w-2.5 h-2.5 bg-red-500 rounded-full z-[1000001] shadow-[0_0_12px_#ef4444] pointer-events-none"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1.5 }}
                  animate={{
                    x: Math.cos(particleRad) * distance,
                    y: Math.sin(particleRad) * distance,
                    opacity: 0,
                    scale: 0.1
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Crash Screen Overlay */}
      <AnimatePresence>
        {crashActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999999] bg-black text-[#ff003c] font-mono flex flex-col items-center justify-center p-6 select-none overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff003c]/5 to-transparent pointer-events-none animate-scanline" />
            <div className="absolute inset-0 bg-[#ff003c]/[0.02] pointer-events-none animate-pulse" />

            <div className="w-full max-w-2xl border-2 border-[#ff003c] bg-black p-8 rounded shadow-[0_0_80px_rgba(255,0,60,0.25)] relative overflow-hidden text-left">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff003c]"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff003c]"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff003c]"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff003c]"></div>

              <div className="flex justify-between items-center border-b border-[#ff003c]/40 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ff003c] animate-ping" />
                  <span className="font-cyber text-lg md:text-xl font-black tracking-widest uppercase text-white drop-shadow-[0_0_8px_rgba(255,0,60,0.8)]">
                    CRITICAL SYSTEM FAILURE
                  </span>
                </div>
                <div className="text-[10px] text-red-500/60 font-bold uppercase tracking-wider">
                  SYS_ERR_0x0000003B
                </div>
              </div>

              <div className="space-y-4 mb-8 text-xs leading-relaxed text-red-400">
                <div>
                  <span className="text-white font-bold">&gt;&gt; DETECTING INTRUSION VECTORS...</span>
                  <span className="text-red-500 animate-pulse font-bold"> [COMPROMISED]</span>
                </div>
                <div className="bg-[#ff003c]/5 border border-[#ff003c]/20 p-4 rounded text-[11px] font-mono whitespace-pre-wrap select-all">
                  *** KERNEL_SECURITY_CHECK_FAILURE ***
                  {"\n"}FATAL ERROR AT EIP 0x8F00:00A4: SEGMENT FAULT.
                  {"\n"}INTERCEPTING TARGET LINK: <span className="text-white underline">{crashUrl}</span>
                  {"\n"}FLUSHING THREAD HOOKS & COMPILING PAYLOAD...
                </div>
                <div>
                  <span className="text-white font-bold">&gt;&gt; COUNTERMEASURES:</span> DUMPING STACK DUMP TO LOCAL SWAPFILE.
                </div>
              </div>

              <div className="border border-[#ff003c]/20 bg-[#ff003c]/5 rounded p-5 flex flex-col items-center justify-center text-center">
                {!crashComplete ? (
                  <div className="w-full space-y-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#ff003c]/60 font-bold mb-1">
                      Rerouting Tunnel Gateway
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-white font-cyber tracking-widest tabular-nums animate-pulse">
                      {crashCountdown.toFixed(2)}s
                    </div>
                    <div className="w-full bg-[#ff003c]/10 h-1.5 rounded-full overflow-hidden border border-[#ff003c]/20">
                      <div 
                        className="h-full bg-gradient-to-r from-red-600 to-[#ff003c] shadow-[0_0_10px_#ff003c]"
                        style={{ width: `${(crashCountdown / 5.0) * 100}%` }}
                      />
                    </div>
                    <button
                      onClick={() => handleCloseCrashAndOpen(crashUrl)}
                      className="btn-apex !bg-red-500/20 !text-red-400 border border-[#ff003c]/40 hover:!bg-red-500 hover:!text-white hover:shadow-[0_0_20px_#ef4444] transition-all !px-4 !py-2 w-full text-[10px] font-cyber tracking-widest uppercase font-bold cursor-pointer"
                    >
                      Bypass & Access Link Now
                    </button>
                  </div>
                ) : (
                  <div className="w-full space-y-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-green-400 font-bold mb-1">
                      Uplink Decryption Complete
                    </div>
                    <button
                      onClick={() => handleCloseCrashAndOpen(crashUrl)}
                      className="btn-apex !bg-red-500 !text-white hover:!bg-red-600 hover:shadow-[0_0_25px_#ef4444] transition-all !px-6 !py-3 w-full text-xs font-cyber tracking-widest uppercase font-bold cursor-pointer"
                    >
                      Access Decrypted Link
                    </button>
                    <button
                      onClick={() => setCrashActive(false)}
                      className="text-[9px] uppercase tracking-widest text-[#ff003c]/60 hover:text-[#ff003c] transition-all mt-2 block mx-auto underline cursor-pointer"
                    >
                      Return to Portfolio
                    </button>
                  </div>
                )}
              </div>

              <div className="text-center text-[9px] text-red-500/50 uppercase tracking-[0.3em] mt-6 animate-pulse font-bold">
                SYSTEM CRASH DETECTED. SAFE MODE BYPASS ACTIVE.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {loading ? (
          <CyberLoader key="loader" onComplete={() => setLoading(false)} />
        ) : isReload ? (
          <BreachScreen key="breach" onComplete={() => setIsReload(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative z-10"
          >
            <BackgroundEffects />
            
            {/* HUD Overlays */}
            <div className="fixed bottom-5 right-5 w-56 h-20 bg-black/85 border border-white/5 text-[8px] p-2.5 text-cyber-lime font-mono pointer-events-none z-[100] flex flex-col justify-end overflow-hidden hidden md:flex">
              {logs.map((log, i) => (
                <div key={i} className="text-cyber-lime">{log}</div>
              ))}
            </div>

            <div className="fixed bottom-5 left-5 text-[8px] text-cyber-cyan opacity-50 pointer-events-none z-[100] font-mono hidden md:block">
              SESSION_ID: 0x982A1<br />
              UPLINK: SECURE_AES256<br />
              LOC: CHENNAI_NODE
            </div>

            <Navbar />
            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <InternshipSection />
              <EducationSection />
              <CertificatesSection />
              <ContactSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
