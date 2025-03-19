
import { useEffect, useState } from 'react';

interface GlitchHeadingProps {
  text: string;
  className?: string;
}

const GlitchHeading = ({ text, className = '' }: GlitchHeadingProps) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [intensity, setIntensity] = useState(1);
  
  useEffect(() => {
    // Create random glitch effect with varying intensity
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setIntensity(Math.random() * 2 + 1); // Random intensity between 1-3
      
      // Reset glitch effect after a short time
      setTimeout(() => {
        setIsGlitching(false);
      }, 150 + Math.random() * 150); // Random duration between 150-300ms
    }, Math.random() * 4000 + 2000); // Random interval between 2-6 seconds
    
    // Add occasional intense glitch bursts
    const intenseBurstInterval = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance of intense burst
        // Series of rapid glitches
        let burstCount = 0;
        const maxBursts = Math.floor(Math.random() * 5) + 3; // 3-7 bursts
        
        const burstInterval = setInterval(() => {
          setIsGlitching(true);
          setIntensity(Math.random() * 3 + 2); // Higher intensity 2-5
          
          setTimeout(() => {
            setIsGlitching(false);
          }, 100);
          
          burstCount++;
          if (burstCount >= maxBursts) {
            clearInterval(burstInterval);
          }
        }, 200);
      }
    }, 8000); // Every 8 seconds
    
    return () => {
      clearInterval(glitchInterval);
      clearInterval(intenseBurstInterval);
    };
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
                transform: `translate(${-5 * intensity}px, ${intensity}px)`,
                opacity: 0.8
              }}
            >
              {text}
            </span>
            <span 
              className="absolute inset-0 text-neon-pink"
              style={{ 
                clipPath: 'polygon(0 60%, 100% 60%, 100% 75%, 0 75%)',
                transform: `translate(${5 * intensity}px, ${-intensity}px)`,
                opacity: 0.8
              }}
            >
              {text}
            </span>
            {intensity > 2 && (
              <span 
                className="absolute inset-0 text-neon-green"
                style={{ 
                  clipPath: 'polygon(0 10%, 100% 10%, 100% 25%, 0 25%)',
                  transform: `translate(${-3 * intensity}px, ${-2 * intensity}px)`,
                  opacity: 0.7
                }}
              >
                {text}
              </span>
            )}
          </>
        )}
      </span>
    </h1>
  );
};

export default GlitchHeading;
