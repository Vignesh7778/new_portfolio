import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CyberLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = [
    "Mounting_Secure_Kernel...",
    "Initializing_D3_HUD...",
    "Authorizing_Admin_V...",
    "Establishing_Session_Node...",
    "Handshake_Verified"
  ];

  useEffect(() => {
    const totalDuration = 2500;
    const intervalTime = 50;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(currentProgress);

      const newTextIndex = Math.floor((currentProgress / 100) * loadingTexts.length);
      if (newTextIndex < loadingTexts.length) {
        setTextIndex(newTextIndex);
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, loadingTexts.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-cyber-cyan text-xs tracking-[0.6em] animate-pulse mb-6 font-mono uppercase">
        VIGNESH_VANGUARD_OS_V16 // AUTHORIZING
      </div>
      
      <div className="w-[250px] h-[1px] bg-[#111] overflow-hidden mb-4">
        <div 
          className="h-full bg-cyber-cyan shadow-[0_0_15px_#00f3ff]" 
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>

      <div className="text-[8px] text-gray-600 font-mono uppercase tracking-widest min-h-[12px]">
        {loadingTexts[textIndex]}
      </div>
    </motion.div>
  );
};

export default CyberLoader;
