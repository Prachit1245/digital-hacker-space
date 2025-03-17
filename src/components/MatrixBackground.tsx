
import { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    
    // Clear any existing matrix streams
    container.innerHTML = '';
    
    // Create matrix streams
    const numStreams = Math.floor(containerWidth / 40);
    const codeChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    
    for (let i = 0; i < numStreams; i++) {
      const stream = document.createElement('div');
      stream.className = 'matrix-text';
      
      // Random position and delay
      stream.style.left = `${Math.random() * 100}%`;
      stream.style.animationDelay = `${Math.random() * 5}s`;
      stream.style.animationDuration = `${Math.random() * 5 + 5}s`;
      
      // Generate random characters
      let streamText = '';
      const length = Math.floor(Math.random() * 20 + 10);
      
      for (let j = 0; j < length; j++) {
        streamText += codeChars.charAt(Math.floor(Math.random() * codeChars.length));
      }
      
      stream.textContent = streamText;
      container.appendChild(stream);
    }
    
    // Create new streams periodically
    const interval = setInterval(() => {
      if (document.body.contains(container)) {
        const stream = document.createElement('div');
        stream.className = 'matrix-text';
        stream.style.left = `${Math.random() * 100}%`;
        stream.style.animationDuration = `${Math.random() * 5 + 5}s`;
        
        let streamText = '';
        const length = Math.floor(Math.random() * 20 + 10);
        
        for (let j = 0; j < length; j++) {
          streamText += codeChars.charAt(Math.floor(Math.random() * codeChars.length));
        }
        
        stream.textContent = streamText;
        container.appendChild(stream);
        
        // Remove old streams to prevent too many elements
        if (container.children.length > 50) {
          container.removeChild(container.children[0]);
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="matrix-text-container absolute inset-0 w-full h-full overflow-hidden -z-10"
    />
  );
};

export default MatrixBackground;
