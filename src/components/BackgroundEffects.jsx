import React, { useEffect, useRef } from 'react';

const BackgroundEffects = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, columns;
    const fontSize = 14;
    const chars = "01VIGNESH_VANGUARD_V16_STABLE";
    let drops = [];

    const initMatrix = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(1, 1, 3, 0.1)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#00f3ff"; // neon-cyan
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

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Matrix Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-[0.15]" />
      
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/5 rounded-full blur-[120px] mix-blend-screen" />
    </div>
  );
};

export default BackgroundEffects;
