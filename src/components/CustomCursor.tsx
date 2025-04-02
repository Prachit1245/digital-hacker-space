
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const updateCursorType = () => {
      const hoveredElement = document.querySelectorAll('a, button, [role="button"]');
      const isHoveringClickable = Array.from(hoveredElement).some(el => {
        const rect = el.getBoundingClientRect();
        return (
          position.x >= rect.left &&
          position.x <= rect.right &&
          position.y >= rect.top &&
          position.y <= rect.bottom
        );
      });
      
      setIsPointer(isHoveringClickable);
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    
    const interval = setInterval(updateCursorType, 100);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      clearInterval(interval);
    };
  }, [position]);
  
  return (
    <>
      <div 
        className="fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-300 gpu"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
          width: '12px',
          height: '12px',
          background: 'rgba(14, 165, 233, 0.8)',
          boxShadow: '0 0 10px rgba(14, 165, 233, 0.5)',
        }}
      />
      <div 
        className="fixed pointer-events-none z-50 rounded-full border-2 border-neon-blue transition-all duration-300 ease-out gpu"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.2 : 1})`,
          width: isPointer ? '36px' : '30px',
          height: isPointer ? '36px' : '30px',
          opacity: 0.6,
        }}
      />
    </>
  );
};

export default CustomCursor;
