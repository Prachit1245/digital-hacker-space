
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
    
    // Enhanced matrix effect with more visible characters
    const maxStreams = 60; // Increased for better coverage
    const codeChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[];:><.,=+-*/";
    
    // Create initial streams with more spread
    for (let i = 0; i < maxStreams; i++) {
      createStream(
        container, 
        codeChars, 
        Math.random() * window.innerWidth, 
        Math.random() * 5000 // Shorter random start time for faster initial appearance
      );
    }
    
    // Continuously create new streams more frequently
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        // Create 2 streams at once for more density
        for (let i = 0; i < 2; i++) {
          createStream(
            container, 
            codeChars, 
            Math.random() * window.innerWidth,
            0
          );
        }
      }
    }, 300); // More frequent stream creation
    
    // Handle window resize for responsive matrix
    const handleResize = () => {
      // Clear and recreate on resize
      container.innerHTML = '';
      for (let i = 0; i < maxStreams; i++) {
        createStream(
          container, 
          codeChars, 
          Math.random() * window.innerWidth,
          Math.random() * 2000 // Shorter delay for faster appearance after resize
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
  
  // Stream creation with darker, more visible colors for white background
  const createStream = (container: HTMLDivElement, chars: string, xPosition: number, delay: number) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text';
    stream.style.left = `${xPosition}px`;
    stream.style.animationDelay = `${delay}ms`;
    stream.style.animationDuration = `${5 + Math.random() * 10}s`; // Faster animation for better visibility
    
    // Use higher opacities for better visibility
    const opacity = 0.7 + Math.random() * 0.3; // Range from 0.7 to 1.0
    
    // Darker blue/teal colors for better visibility on white
    const colorOptions = [
      'rgba(0, 80, 150, ' + opacity + ')', // Darker Blue
      'rgba(0, 100, 150, ' + opacity + ')', // Dark Teal
      'rgba(20, 80, 120, ' + opacity + ')', // Navy Blue
      'rgba(0, 70, 110, ' + opacity + ')', // Deep Blue
      'rgba(10, 60, 100, ' + opacity + ')', // Royal Blue
      'rgba(0, 50, 90, ' + opacity + ')'    // Midnight Blue
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
    
    // Set font size randomly for varied appearance
    stream.style.fontSize = `${12 + Math.floor(Math.random() * 6)}px`;
    
    // Add a slight text shadow for better visibility
    stream.style.textShadow = `0 0 6px ${stream.style.color}`;
    
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
