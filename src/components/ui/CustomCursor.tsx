'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default true to avoid hydration mismatch, check on mount

  useEffect(() => {
    // Check if it's a touch device
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleHoverStart);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleHoverStart);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:flex items-center justify-center mix-blend-difference"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 8),
        y: mousePosition.y - (isHovering ? 24 : 8),
        width: isHovering ? 48 : 16,
        height: isHovering ? 48 : 16,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 800,
        damping: 35,
        mass: 0.5,
      }}
    >
      <div 
        className={`w-full h-full rounded-full bg-white transition-all duration-300 ${isHovering ? 'opacity-30' : 'opacity-100'}`} 
      />
    </motion.div>
  );
}
