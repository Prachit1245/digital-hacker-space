
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
    
    // Very minimal matrix effect - create far fewer streams for better performance
    const maxStreams = 20; // Drastically reduced number of streams
    const codeChars = "01";
    
    for (let i = 0; i < maxStreams; i++) {
      createStream(container, codeChars, Math.random() * window.innerWidth);
    }
    
    // Function cleanup on unmount
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [isReducedMotion]);
  
  // Simplified stream creation with minimal operations
  const createStream = (container: HTMLDivElement, chars: string, xPosition: number) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text';
    stream.style.left = `${xPosition}px`;
    stream.style.animationDuration = '15s'; // Slower animation for better performance
    stream.style.opacity = '0.2'; // Very subtle
    
    // Much shorter streams
    const length = 8;
    let streamText = '';
    for (let j = 0; j < length; j++) {
      streamText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    stream.textContent = streamText; // Using textContent instead of innerHTML for better performance
    container.appendChild(stream);
  };
  
  return (
    <div 
      ref={containerRef} 
      className="matrix-text-container fixed inset-0 w-full h-full overflow-hidden -z-10 contain-paint"
      style={{ 
        zIndex: -1, 
        opacity: 0.05, // Much more subtle
        background: 'rgba(255, 255, 255, 0.98)' // Light background
      }}
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;
