
import { useEffect, useRef, useState } from 'react';

const MatrixBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [density, setDensity] = useState<number>(8); // Higher density (smaller value) for more streams
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Clear any existing matrix streams
    container.innerHTML = '';
    
    // Create matrix streams
    const numStreams = Math.floor(containerWidth / density);
    
    // Extended characters for visual variety - mix of code symbols, katakana, latin, etc.
    const codeChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/~`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/*-+\\|(){}<>=;:,.?![]";
    
    // Create initial streams with varied positions - more streams initially
    for (let i = 0; i < numStreams * 3; i++) {
      createStream(container, containerHeight, codeChars, Math.random() * containerWidth);
    }
    
    // Create new streams more frequently at random positions
    const interval = setInterval(() => {
      if (document.body.contains(container)) {
        createStream(container, containerHeight, codeChars, Math.random() * containerWidth);
        
        // Remove old streams to prevent too many elements (improved performance)
        if (container.children.length > 600) { // Allow more streams
          container.removeChild(container.children[0]);
        }
      } else {
        clearInterval(interval);
      }
    }, 50); // Much faster interval for more dynamic feel
    
    // Create "rain" effect - periodic bursts of streams
    const rainInterval = setInterval(() => {
      if (document.body.contains(container)) {
        // Create a burst of streams at once
        const burstCount = Math.floor(Math.random() * 30) + 20; // More streams in bursts
        for (let i = 0; i < burstCount; i++) {
          createStream(container, containerHeight, codeChars, Math.random() * containerWidth);
        }
      } else {
        clearInterval(rainInterval);
      }
    }, 600); // More frequent bursts
    
    // Create special highlighted "Prachit Regmi" streams periodically
    const specialStreamInterval = setInterval(() => {
      if (document.body.contains(container)) {
        const xPos = Math.random() * containerWidth;
        const specialContent = "PRACHIT REGMI CSIT DEVELOPER TECH";
        createSpecialStream(container, containerHeight, specialContent, xPos);
      } else {
        clearInterval(specialStreamInterval);
      }
    }, 1000); // More frequent special streams
    
    // Handle window resize
    const handleResize = () => {
      if (container) {
        // Adjust density based on window width for responsive behavior
        const newDensity = window.innerWidth < 768 ? 12 : 8;
        setDensity(newDensity);
        
        // Clear and recreate streams
        container.innerHTML = '';
        const newNumStreams = Math.floor(window.innerWidth / newDensity);
        for (let i = 0; i < newNumStreams * 3; i++) {
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
  }, [density]);
  
  // Enhanced stream creation with more randomness and visual effects
  const createStream = (container: HTMLDivElement, containerHeight: number, chars: string, xPosition: number) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text';
    
    // Position - use provided x position for more control
    stream.style.left = `${xPosition}px`;
    
    // Vary animation speed for more natural look - faster overall
    const speed = Math.random() * 6 + 2; // between 2-8s (faster)
    stream.style.animationDuration = `${speed}s`;
    
    // Minimal delay for immediate visibility
    stream.style.animationDelay = `${Math.random() * 0.3}s`;
    
    // More varied stream length based on screen height
    const length = Math.floor(Math.random() * 40 + Math.min(70, containerHeight / 10));
    
    // Generate characters
    let streamText = '';
    for (let j = 0; j < length; j++) {
      streamText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Create multiple highlight points for more dramatic effect
    const highlightIndices = [];
    const numHighlights = Math.floor(Math.random() * 8) + 5; // 5-12 highlights per stream
    
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
    
    // Higher base opacity for more visibility
    stream.style.opacity = (Math.random() * 0.3 + 0.7).toString(); // Much higher opacity (0.7-1.0)
    
    // Random font size variation for depth effect - larger overall
    const sizeVariation = Math.random() * 0.9 + 1.0; // 1.0-1.9x size (larger)
    stream.style.fontSize = `calc(${sizeVariation}em)`;
    
    container.appendChild(stream);
    
    // Change characters periodically for some streams to create a "typing" effect
    if (Math.random() > 0.3) { // 70% of streams will have changing characters
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
      }, 50 + Math.random() * 100); // Faster random interval between changes
      
      // Clear interval after the animation is likely to be done
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
    const speed = Math.random() * 4 + 3; // slightly slower to be more noticeable
    stream.style.animationDuration = `${speed}s`;
    stream.style.animationDelay = `${Math.random() * 0.3}s`;
    
    // Random letter spacing for a more dramatic effect
    stream.style.letterSpacing = `${Math.random() * 0.2 + 0.1}em`;
    
    // Generate the special text stream with all characters highlighted
    let formattedText = '';
    for (let j = 0; j < specialText.length; j++) {
      formattedText += `<span class="special-highlight">${specialText[j]}</span>`;
    }
    
    stream.innerHTML = formattedText;
    stream.style.opacity = (Math.random() * 0.2 + 0.8).toString(); // More visible (0.8-1.0)
    stream.style.fontSize = `calc(${Math.random() * 0.7 + 1.4}em)`; // Larger (1.4-2.1em)
    
    container.appendChild(stream);
  };
  
  return (
    <div 
      ref={containerRef} 
      className="matrix-text-container fixed inset-0 w-full h-full overflow-hidden -z-10"
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;
