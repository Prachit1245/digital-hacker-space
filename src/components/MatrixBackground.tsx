
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
    const containerWidth = container.offsetWidth;
    
    // Clear any existing matrix streams
    container.innerHTML = '';
    
    // Reduced density for better performance
    const density = 10; // Higher number means fewer streams
    const numStreams = Math.floor(containerWidth / density);
    
    // Simplified character set for better performance
    const codeChars = "01アイウエオカキクケコサシスセソ/*-+\\|@#$%^&*()";
    
    // Create fewer initial streams
    for (let i = 0; i < numStreams; i++) {
      if (Math.random() > 0.3) { // Only create streams with 70% probability
        createStream(container, codeChars, Math.random() * containerWidth);
      }
    }
    
    // Create new streams less frequently
    const interval = setInterval(() => {
      if (document.body.contains(container)) {
        if (container.children.length < 250 && Math.random() > 0.7) {
          createStream(container, codeChars, Math.random() * containerWidth);
        }
        
        // Remove old streams to prevent too many elements
        if (container.children.length > 300) {
          container.removeChild(container.children[0]);
        }
      } else {
        clearInterval(interval);
      }
    }, 200); // Much slower interval
    
    // Create "PRACHIT REGMI" special stream less frequently
    const specialStreamInterval = setInterval(() => {
      if (document.body.contains(container) && Math.random() > 0.8) {
        const xPos = Math.random() * containerWidth;
        createSpecialStream(container, "PRACHIT REGMI", xPos);
      } else {
        clearInterval(specialStreamInterval);
      }
    }, 2000);
    
    // Handle window resize with debounce
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      
      resizeTimeout = window.setTimeout(() => {
        if (container) {
          // Clear and recreate streams
          container.innerHTML = '';
          const newDensity = window.innerWidth < 768 ? 15 : 10;
          const newNumStreams = Math.floor(window.innerWidth / newDensity);
          for (let i = 0; i < Math.min(newNumStreams, 30); i++) {
            createStream(container, codeChars, Math.random() * containerWidth);
          }
        }
      }, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      clearInterval(specialStreamInterval);
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, [isReducedMotion]);
  
  // Simplified stream creation
  const createStream = (container: HTMLDivElement, chars: string, xPosition: number) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text';
    
    // Position
    stream.style.left = `${xPosition}px`;
    
    // More consistent animation speed
    const speed = Math.random() * 3 + 6; // between 6-9s (slower)
    stream.style.animationDuration = `${speed}s`;
    
    // Minimal delay
    stream.style.animationDelay = `${Math.random() * 0.5}s`;
    
    // Shorter stream length
    const length = Math.floor(Math.random() * 20 + 10);
    
    // Generate characters
    let streamText = '';
    for (let j = 0; j < length; j++) {
      streamText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Only add 1-2 highlight points per stream
    const highlightIndices = [];
    const numHighlights = Math.floor(Math.random() * 2) + 1;
    
    for (let i = 0; i < numHighlights; i++) {
      highlightIndices.push(Math.floor(Math.random() * length));
    }
    
    // Format text with highlights
    let formattedText = '';
    for (let j = 0; j < length; j++) {
      if (highlightIndices.includes(j)) {
        formattedText += `<span class="highlight">${streamText[j]}</span>`;
      } else {
        formattedText += streamText[j];
      }
    }
    
    stream.innerHTML = formattedText;
    stream.style.opacity = (Math.random() * 0.3 + 0.6).toString();
    
    // No font size variation
    stream.style.fontSize = `1em`;
    
    container.appendChild(stream);
  };
  
  // Simplified special stream
  const createSpecialStream = (container: HTMLDivElement, specialText: string, xPosition: number) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text special-stream';
    
    stream.style.left = `${xPosition}px`;
    const speed = 8; // Consistent speed
    stream.style.animationDuration = `${speed}s`;
    
    let formattedText = '';
    for (let j = 0; j < specialText.length; j++) {
      formattedText += `<span class="special-highlight">${specialText[j]}</span>`;
    }
    
    stream.innerHTML = formattedText;
    stream.style.opacity = '0.9';
    
    container.appendChild(stream);
  };
  
  return (
    <div 
      ref={containerRef} 
      className="matrix-text-container fixed inset-0 w-full h-full overflow-hidden -z-10"
      style={{ 
        zIndex: -1, 
        opacity: isReducedMotion ? 0.3 : 0.7, // Lower opacity
        background: 'rgba(0, 0, 0, 0.92)' 
      }}
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;
