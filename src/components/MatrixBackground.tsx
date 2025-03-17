
import { useEffect, useRef, useState } from 'react';

const MatrixBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [density, setDensity] = useState<number>(30); // Controls density of streams
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Clear any existing matrix streams
    container.innerHTML = '';
    
    // Create matrix streams
    const numStreams = Math.floor(containerWidth / density);
    // More characters for visual variety
    const codeChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/~`";
    
    // Create initial streams
    for (let i = 0; i < numStreams; i++) {
      createStream(container, containerHeight, codeChars);
    }
    
    // Create new streams periodically
    const interval = setInterval(() => {
      if (document.body.contains(container)) {
        createStream(container, containerHeight, codeChars);
        
        // Remove old streams to prevent too many elements
        if (container.children.length > 100) {
          container.removeChild(container.children[0]);
        }
      } else {
        clearInterval(interval);
      }
    }, 300); // Faster interval for more dynamic feel
    
    // Handle window resize
    const handleResize = () => {
      if (container) {
        // Adjust density based on window width for responsive behavior
        const newDensity = window.innerWidth < 768 ? 50 : 30;
        setDensity(newDensity);
        
        // Clear and recreate streams
        container.innerHTML = '';
        const newNumStreams = Math.floor(window.innerWidth / newDensity);
        for (let i = 0; i < newNumStreams; i++) {
          createStream(container, containerHeight, codeChars);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [density]);
  
  // Function to create a single matrix stream with more randomness
  const createStream = (container: HTMLDivElement, containerHeight: number, chars: string) => {
    const stream = document.createElement('div');
    stream.className = 'matrix-text';
    
    // Random position
    stream.style.left = `${Math.random() * 100}%`;
    
    // Vary animation speed for more natural look
    const speed = Math.random() * 8 + 3; // between 3-11s
    stream.style.animationDuration = `${speed}s`;
    
    // Randomize delay
    stream.style.animationDelay = `${Math.random() * 2}s`;
    
    // More varied stream length
    const length = Math.floor(Math.random() * 30 + 8);
    
    // Generate characters
    let streamText = '';
    for (let j = 0; j < length; j++) {
      streamText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Random brightness for some characters to create highlight effect
    const highlightIndex = Math.floor(Math.random() * length);
    let formattedText = '';
    for (let j = 0; j < length; j++) {
      if (j === highlightIndex || j === highlightIndex + 1) {
        formattedText += `<span class="highlight">${streamText[j]}</span>`;
      } else {
        formattedText += streamText[j];
      }
    }
    
    stream.innerHTML = formattedText;
    
    // Random opacity for varied appearance
    stream.style.opacity = (Math.random() * 0.5 + 0.2).toString();
    
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
