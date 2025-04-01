
import { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Clear any existing matrix streams
    container.innerHTML = '';
    
    // Create matrix streams - more dense
    const density = 4; // Lower number means more streams
    const numStreams = Math.floor(containerWidth / density);
    
    // Extended characters for visual variety
    const codeChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/~`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/*-+\\|(){}<>=;:,.?![]";
    
    // Create initial streams with varied positions - more streams initially
    for (let i = 0; i < numStreams * 5; i++) {
      createStream(container, containerHeight, codeChars, Math.random() * containerWidth);
    }
    
    // Create new streams more frequently
    const interval = setInterval(() => {
      if (document.body.contains(container)) {
        createStream(container, containerHeight, codeChars, Math.random() * containerWidth);
        
        // Remove old streams to prevent too many elements
        if (container.children.length > 800) {
          container.removeChild(container.children[0]);
        }
      } else {
        clearInterval(interval);
      }
    }, 30); // Much faster interval
    
    // Create "rain" effect - periodic bursts of streams
    const rainInterval = setInterval(() => {
      if (document.body.contains(container)) {
        // Create a burst of streams at once
        const burstCount = Math.floor(Math.random() * 40) + 30;
        for (let i = 0; i < burstCount; i++) {
          createStream(container, containerHeight, codeChars, Math.random() * containerWidth);
        }
      } else {
        clearInterval(rainInterval);
      }
    }, 400); // More frequent bursts
    
    // Create special highlighted "Prachit Regmi" streams periodically
    const specialStreamInterval = setInterval(() => {
      if (document.body.contains(container)) {
        const xPos = Math.random() * containerWidth;
        const specialContent = "PRACHIT REGMI CSIT DEVELOPER TECH";
        createSpecialStream(container, containerHeight, specialContent, xPos);
      } else {
        clearInterval(specialStreamInterval);
      }
    }, 800);
    
    // Handle window resize
    const handleResize = () => {
      if (container) {
        // Clear and recreate streams
        container.innerHTML = '';
        const newDensity = window.innerWidth < 768 ? 6 : 4;
        const newNumStreams = Math.floor(window.innerWidth / newDensity);
        for (let i = 0; i < newNumStreams * 5; i++) {
          createStream(container, containerHeight, codeChars, Math.random() * containerWidth);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      clearInterval(rainInterval);
      clearInterval(specialStreamInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Enhanced stream creation with more randomness and visual effects
  const createStream = (container: HTMLDivElement, containerHeight: number, chars: string, xPosition: number) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text';
    
    // Position
    stream.style.left = `${xPosition}px`;
    
    // Vary animation speed - faster overall
    const speed = Math.random() * 5 + 2; // between 2-7s (faster)
    stream.style.animationDuration = `${speed}s`;
    
    // Minimal delay for immediate visibility
    stream.style.animationDelay = `${Math.random() * 0.2}s`;
    
    // More varied stream length
    const length = Math.floor(Math.random() * 50 + Math.min(80, containerHeight / 8));
    
    // Generate characters
    let streamText = '';
    for (let j = 0; j < length; j++) {
      streamText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Create multiple highlight points for more dramatic effect
    const highlightIndices = [];
    const numHighlights = Math.floor(Math.random() * 10) + 6; // 6-15 highlights per stream
    
    for (let i = 0; i < numHighlights; i++) {
      highlightIndices.push(Math.floor(Math.random() * length));
    }
    
    // Format text with highlights and brightness variations
    let formattedText = '';
    for (let j = 0; j < length; j++) {
      if (highlightIndices.includes(j)) {
        // Primary highlight - brightest
        formattedText += `<span class="highlight">${streamText[j]}</span>`;
      } else if (highlightIndices.some(index => Math.abs(index - j) === 1)) {
        // Secondary highlight - medium brightness
        formattedText += `<span class="highlight-medium">${streamText[j]}</span>`;
      } else if (highlightIndices.some(index => Math.abs(index - j) === 2)) {
        // Tertiary highlight - subtle glow
        formattedText += `<span class="highlight-subtle">${streamText[j]}</span>`;
      } else {
        // Regular character
        formattedText += streamText[j];
      }
    }
    
    stream.innerHTML = formattedText;
    
    // Higher base opacity
    stream.style.opacity = (Math.random() * 0.2 + 0.8).toString(); // Much higher opacity (0.8-1.0)
    
    // Random font size variation - larger overall
    const sizeVariation = Math.random() * 1.0 + 1.1; // 1.1-2.1x size (larger)
    stream.style.fontSize = `calc(${sizeVariation}em)`;
    
    container.appendChild(stream);
    
    // Change characters periodically for some streams
    if (Math.random() > 0.2) { // 80% of streams will have changing characters
      const changeInterval = setInterval(() => {
        if (document.body.contains(stream)) {
          const charIndex = Math.floor(Math.random() * length);
          const spans = stream.querySelectorAll('span');
          
          if (spans.length > charIndex) {
            spans[charIndex].textContent = chars.charAt(Math.floor(Math.random() * chars.length));
          }
        } else {
          clearInterval(changeInterval);
        }
      }, 40 + Math.random() * 80); // Faster changes
      
      // Clear interval after animation is done
      setTimeout(() => {
        clearInterval(changeInterval);
      }, speed * 1000 + 1000);
    }
  };
  
  // Special stream for "Prachit Regmi" with enhanced visual effects
  const createSpecialStream = (container: HTMLDivElement, containerHeight: number, specialText: string, xPosition: number) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text special-stream';
    
    // Position
    stream.style.left = `${xPosition}px`;
    
    // Animation properties
    const speed = Math.random() * 3 + 3; // slightly slower to be more noticeable
    stream.style.animationDuration = `${speed}s`;
    stream.style.animationDelay = `${Math.random() * 0.2}s`;
    
    // Random letter spacing
    stream.style.letterSpacing = `${Math.random() * 0.3 + 0.1}em`;
    
    // Generate the special text stream with all characters highlighted
    let formattedText = '';
    for (let j = 0; j < specialText.length; j++) {
      formattedText += `<span class="special-highlight">${specialText[j]}</span>`;
    }
    
    stream.innerHTML = formattedText;
    stream.style.opacity = (Math.random() * 0.1 + 0.9).toString(); // More visible (0.9-1.0)
    stream.style.fontSize = `calc(${Math.random() * 0.8 + 1.6}em)`; // Larger (1.6-2.4em)
    
    container.appendChild(stream);
  };
  
  return (
    <div 
      ref={containerRef} 
      className="matrix-text-container fixed inset-0 w-full h-full overflow-hidden -z-10"
      style={{ 
        zIndex: -1, 
        opacity: 1,
        background: 'rgba(0, 0, 0, 0.92)' 
      }}
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;
