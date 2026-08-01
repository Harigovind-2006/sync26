'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth trailing lag interpolation
  const springInner = { damping: 25, stiffness: 350 };
  const springOuter = { damping: 35, stiffness: 180 };

  const innerX = useSpring(mouseX, springInner);
  const innerY = useSpring(mouseY, springInner);

  const outerX = useSpring(mouseX, springOuter);
  const outerY = useSpring(mouseY, springOuter);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half size to center cursor elements
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is interactive
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.classList.contains('interactive-hover');
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden md:block">
      {/* Outer Ring Trailing Lag */}
      <motion.div
        className="absolute w-8 h-8 rounded-full border border-[#C8FF2E] -mt-4 -ml-4"
        style={{
          x: outerX,
          y: outerY,
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(200, 255, 46, 0.05)' : 'rgba(200, 255, 46, 0)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
      
      {/* Inner Dot Fast Follower */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-[#C8FF2E] -mt-1 -ml-1"
        style={{
          x: innerX,
          y: innerY,
          scale: isHovered ? 0.5 : 1,
        }}
      />
    </div>
  );
}
