import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || 
          e.target.tagName.toLowerCase() === 'button' ||
          e.target.closest('a') ||
          e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-cyber-cyan rounded-full pointer-events-none z-[10001] mix-blend-screen"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className={`fixed top-0 left-0 w-10 h-10 border pointer-events-none z-[10000] transition-colors duration-300 ${isHovering ? 'border-cyber-purple bg-cyber-purple/5' : 'border-cyber-cyan'}`}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          x: isHovering ? mousePosition.x - 30 : mousePosition.x - 20,
          y: isHovering ? mousePosition.y - 30 : mousePosition.y - 20,
          rotate: isHovering ? 45 : 0,
        }}
        transition={{ type: 'tween', ease: [0.175, 0.885, 0.32, 1.275], duration: 0.3 }}
      />
    </>
  );
};

export default CustomCursor;
