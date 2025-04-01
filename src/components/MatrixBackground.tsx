
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
    
    // Improved matrix effect with slightly more streams but still performance-optimized
    const maxStreams = 25; // Slightly increased for better visual effect
    const codeChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    
    // Create initial streams
    const createInitialStreams = () => {
      for (let i = 0; i < maxStreams; i++) {
        createStream(container, codeChars, Math.random() * window.innerWidth);
      }
    };
    
    // Create additional streams periodically
    createInitialStreams();
    
    const interval = setInterval(() => {
      // Only create a new stream if there aren't too many already
      if (container.childElementCount < maxStreams) {
        createStream(container, codeChars, Math.random() * window.innerWidth);
      }
    }, 1000); // Add a new stream every second
    
    // Function cleanup on unmount
    return () => {
      clearInterval(interval);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [isReducedMotion]);
  
  // Optimized stream creation
  const createStream = (container: HTMLDivElement, chars: string, xPosition: number) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text';
    stream.style.left = `${xPosition}px`;
    stream.style.animationDuration = `${10 + Math.random() * 8}s`; // Random speed between 10-18s
    stream.style.opacity = `${0.2 + Math.random() * 0.5}`; // Random opacity for depth
    
    // Variable length streams
    const length = 5 + Math.floor(Math.random() * 8); // Between 5-12 characters
    let streamText = '';
    for (let j = 0; j < length; j++) {
      streamText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    stream.textContent = streamText; // Using textContent instead of innerHTML for better performance
    
    // Set a timeout to remove this stream after its animation completes
    const duration = parseFloat(stream.style.animationDuration) * 1000;
    setTimeout(() => {
      if (container.contains(stream)) {
        container.removeChild(stream);
      }
    }, duration + 1000); // Add 1 second buffer
    
    container.appendChild(stream);
  };
  
  return (
    <div 
      ref={containerRef} 
      className="matrix-text-container fixed inset-0 w-full h-full overflow-hidden -z-10 contain-paint"
      style={{ 
        zIndex: -1, 
        opacity: 0.3, // Increased opacity for better visibility
        background: 'rgba(0, 0, 0, 0.97)' // Dark background for better contrast
      }}
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;
