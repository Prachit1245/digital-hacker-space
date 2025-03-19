
import { useEffect, useRef, useState } from 'react';

const MatrixBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [density, setDensity] = useState<number>(20); // Higher density (smaller value) for more streams
  
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
    
    // Create initial streams with varied positions
    for (let i = 0; i < numStreams; i++) {
      createStream(container, containerHeight, codeChars, Math.random() * containerWidth);
    }
    
    // Create new streams periodically at random positions
    const interval = setInterval(() => {
      if (document.body.contains(container)) {
        createStream(container, containerHeight, codeChars, Math.random() * containerWidth);
        
        // Remove old streams to prevent too many elements (improved performance)
        if (container.children.length > 150) {
          container.removeChild(container.children[0]);
        }
      } else {
        clearInterval(interval);
      }
    }, 200); // Faster interval for more dynamic feel
    
    // Create "rain" effect - periodic bursts of streams
    const rainInterval = setInterval(() => {
      if (document.body.contains(container)) {
        // Create a burst of 5-10 streams at once
        const burstCount = Math.floor(Math.random() * 8) + 5;
        for (let i = 0; i < burstCount; i++) {
          createStream(container, containerHeight, codeChars, Math.random() * containerWidth);
        }
      } else {
        clearInterval(rainInterval);
      }
    }, 2000); // Every 2 seconds
    
    // Handle window resize
    const handleResize = () => {
      if (container) {
        // Adjust density based on window width for responsive behavior
        const newDensity = window.innerWidth < 768 ? 35 : 20;
        setDensity(newDensity);
        
        // Clear and recreate streams
        container.innerHTML = '';
        const newNumStreams = Math.floor(window.innerWidth / newDensity);
        for (let i = 0; i < newNumStreams; i++) {
          createStream(container, containerHeight, codeChars, Math.random() * containerWidth);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      clearInterval(rainInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [density]);
  
  // Enhanced stream creation with more randomness and visual effects
  const createStream = (container: HTMLDivElement, containerHeight: number, chars: string, xPosition: number) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text';
    
    // Position - use provided x position for more control
    stream.style.left = `${xPosition}px`;
    
    // Vary animation speed for more natural look
    const speed = Math.random() * 10 + 3; // between 3-13s
    stream.style.animationDuration = `${speed}s`;
    
    // Randomize delay
    stream.style.animationDelay = `${Math.random() * 2}s`;
    
    // More varied stream length based on screen height
    const length = Math.floor(Math.random() * 30 + Math.min(40, containerHeight / 20));
    
    // Generate characters
    let streamText = '';
    for (let j = 0; j < length; j++) {
      streamText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Create multiple highlight points for more dramatic effect
    const highlightIndices = [];
    const numHighlights = Math.floor(Math.random() * 3) + 1; // 1-3 highlights per stream
    
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
    
    // Random opacity for varied appearance
    stream.style.opacity = (Math.random() * 0.6 + 0.2).toString();
    
    // Random font size variation for depth effect
    const sizeVariation = Math.random() * 0.5 + 0.8; // 0.8-1.3x size
    stream.style.fontSize = `calc(${sizeVariation}em)`;
    
    container.appendChild(stream);
    
    // Change characters periodically for some streams to create a "typing" effect
    if (Math.random() > 0.7) { // 30% of streams will have changing characters
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
      }, 100 + Math.random() * 400); // Random interval between changes
      
      // Clear interval after the animation is likely to be done
      setTimeout(() => {
        clearInterval(changeInterval);
      }, speed * 1000 + 2000);
    }
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
