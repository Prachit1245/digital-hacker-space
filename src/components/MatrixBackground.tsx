
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
    
    // Enhanced matrix effect with more coverage
    const maxStreams = 50; // Increased number of streams
    const codeChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    
    // Create initial streams - more for fuller coverage
    for (let i = 0; i < maxStreams; i++) {
      createStream(
        container, 
        codeChars, 
        Math.random() * window.innerWidth, 
        Math.random() * 10000 // Random start time
      );
    }
    
    // Continuously create new streams more frequently
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        createStream(
          container, 
          codeChars, 
          Math.random() * window.innerWidth,
          0
        );
      }
    }, 300); // More frequent stream creation
    
    // Handle window resize for responsive matrix
    const handleResize = () => {
      // Clear and recreate on resize with more streams
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
  
  // Improved stream creation with better visuals
  const createStream = (container: HTMLDivElement, chars: string, xPosition: number, delay: number) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text';
    stream.style.left = `${xPosition}px`;
    stream.style.animationDelay = `${delay}ms`;
    stream.style.animationDuration = `${5 + Math.random() * 10}s`; // Faster animation (5-15s)
    stream.style.opacity = `${0.6 + Math.random() * 0.4}`; // Higher opacity
    
    // Variable length streams for more natural look
    const length = 5 + Math.floor(Math.random() * 20); // Between 5-25 characters
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
      className="matrix-text-container fixed inset-0 w-full h-full overflow-hidden z-[-10]"
      style={{ 
        background: 'rgba(0, 0, 0, 0.9)', // Darker background
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;
