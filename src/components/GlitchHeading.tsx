
import { useEffect, useState } from 'react';

interface GlitchHeadingProps {
  text: string;
  className?: string;
}

const GlitchHeading = ({ text, className = '' }: GlitchHeadingProps) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    // Create random glitch effect
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      
      // Reset glitch effect after a short time
      setTimeout(() => {
        setIsGlitching(false);
      }, 200);
    }, Math.random() * 5000 + 3000); // Random interval between 3-8 seconds
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  return (
    <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 relative ${className}`}>
      <span className="text-gradient relative">
        {text}
        
        {/* Glitch overlay elements */}
        {isGlitching && (
          <>
            <span 
              className="absolute inset-0 text-neon-blue"
              style={{ 
                clipPath: 'polygon(0 30%, 100% 30%, 100% 50%, 0 50%)',
                transform: 'translate(-5px, 0)',
                opacity: 0.8
              }}
            >
              {text}
            </span>
            <span 
              className="absolute inset-0 text-neon-pink"
              style={{ 
                clipPath: 'polygon(0 60%, 100% 60%, 100% 75%, 0 75%)',
                transform: 'translate(5px, 0)',
                opacity: 0.8
              }}
            >
              {text}
            </span>
          </>
        )}
      </span>
    </h1>
  );
};

export default GlitchHeading;
