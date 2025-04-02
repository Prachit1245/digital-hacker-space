
import { useEffect, useRef, useState } from 'react';

const MatrixBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    return () => mediaQuery.removeEventListener('change', handleReducedMotionChange);
  }, []);
  
  useEffect(() => {
    if (!containerRef.current || isReducedMotion) return;
    
    const container = containerRef.current;
    container.innerHTML = '';
    
    // Enhanced matrix effect
    const maxStreams = 40;
    const codeChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[];:><.,=+-*/";
    
    // Create initial streams
    for (let i = 0; i < maxStreams; i++) {
      createStream(
        container, 
        codeChars, 
        Math.random() * window.innerWidth, 
        Math.random() * 10000 // Random start time
      );
    }
    
    // Continuously create new streams
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        createStream(
          container, 
          codeChars, 
          Math.random() * window.innerWidth,
          0
        );
      }
    }, 400);
    
    // Handle window resize for responsive matrix
    const handleResize = () => {
      // Clear and recreate on resize
      container.innerHTML = '';
      for (let i = 0; i < maxStreams; i++) {
        createStream(
          container, 
          codeChars, 
          Math.random() * window.innerWidth,
          Math.random() * 5000
        );
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Function cleanup on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [isReducedMotion]);
  
  // Stream creation with lighter colors for white background
  const createStream = (container: HTMLDivElement, chars: string, xPosition: number, delay: number) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text';
    stream.style.left = `${xPosition}px`;
    stream.style.animationDelay = `${delay}ms`;
    stream.style.animationDuration = `${5 + Math.random() * 15}s`; // Variable speed animation
    
    // Use different opacities for depth effect
    const opacity = 0.5 + Math.random() * 0.5;
    
    // Colors for white background - using blue/gray tones
    const colorOptions = [
      'rgba(0, 100, 200, ' + opacity + ')', // Blue
      'rgba(30, 144, 255, ' + opacity + ')', // Dodger Blue
      'rgba(0, 128, 128, ' + opacity + ')', // Teal
      'rgba(70, 130, 180, ' + opacity + ')', // Steel Blue
      'rgba(25, 25, 112, ' + opacity + ')', // Midnight Blue
      'rgba(0, 0, 139, ' + opacity + ')'     // Dark Blue
    ];
    
    const colorIndex = Math.floor(Math.random() * colorOptions.length);
    stream.style.color = colorOptions[colorIndex];
    
    // Variable length streams for more natural look
    const length = 5 + Math.floor(Math.random() * 15); // Between 5-20 characters
    let streamText = '';
    for (let j = 0; j < length; j++) {
      streamText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    stream.textContent = streamText;
    
    // Set a timeout to remove stream after animation
    const duration = parseFloat(stream.style.animationDuration) * 1000;
    setTimeout(() => {
      if (container.contains(stream)) {
        container.removeChild(stream);
      }
    }, duration + delay + 500);
    
    container.appendChild(stream);
  };
  
  return (
    <div 
      ref={containerRef} 
      className="matrix-text-container"
      style={{ 
        background: '#ffffff', // White background
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;
