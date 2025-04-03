
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
    
    // Better matrix effect with optimized performance
    const maxStreams = 30;
    const codeChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    
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
    }, 500); // Add streams more frequently
    
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
  
  // Improved stream creation with better visuals
  const createStream = (container: HTMLDivElement, chars: string, xPosition: number, delay: number) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text';
    stream.style.left = `${xPosition}px`;
    stream.style.animationDelay = `${delay}ms`;
    stream.style.animationDuration = `${7 + Math.random() * 10}s`; // Random speed between 7-17s
    stream.style.opacity = `${0.4 + Math.random() * 0.6}`; // Better random opacity
    
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
      className="matrix-text-container fixed inset-0 w-full h-full overflow-hidden -z-10"
      style={{ 
        zIndex: -1, 
        opacity: 0.7,
        background: 'rgba(0, 0, 0, 0.95)'
      }}
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;
