
import { useEffect, useState, useRef } from 'react';

interface TypewriterTextProps {
  text: string | string[];
  className?: string;
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
  loop?: boolean;
  onComplete?: () => void;
}

const TypewriterText = ({
  text,
  className = '',
  speed = 50,
  startDelay = 0,
  cursor = true,
  loop = false,
  onComplete
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const textArray = Array.isArray(text) ? text : [text];
  
  useEffect(() => {
    // Initial delay before starting
    const initialTimeout = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);
    
    return () => {
      clearTimeout(initialTimeout);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startDelay]);
  
  useEffect(() => {
    if (!isTyping) return;
    
    const currentText = textArray[currentTextIndex];
    
    if (currentIndex < currentText.length) {
      // Still typing current text
      timeoutRef.current = setTimeout(() => {
        setDisplayText(current => current + currentText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, speed);
    } else {
      // Finished typing current text
      const nextTextIndex = (currentTextIndex + 1) % textArray.length;
      
      if (loop && nextTextIndex === 0) {
        // If looping and we've reached the end of the array
        timeoutRef.current = setTimeout(() => {
          setDisplayText('');
          setCurrentIndex(0);
          setCurrentTextIndex(nextTextIndex);
        }, 1500);
      } else if (nextTextIndex !== 0) {
        // Move to next text in array
        timeoutRef.current = setTimeout(() => {
          setDisplayText('');
          setCurrentIndex(0);
          setCurrentTextIndex(nextTextIndex);
        }, 1500);
      } else if (onComplete) {
        // End of typing
        onComplete();
      }
    }
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isTyping, currentIndex, currentTextIndex, textArray, speed, loop, onComplete]);
  
  return (
    <span className={className}>
      {displayText}
      {cursor && isTyping && <span className="animate-caret border-r-2 ml-0.5 h-5"></span>}
    </span>
  );
};

export default TypewriterText;
