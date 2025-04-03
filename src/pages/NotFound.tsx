
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import TypewriterText from "@/components/TypewriterText";

const NotFound = () => {
  const location = useLocation();
  const [konami, setKonami] = useState<string[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    const handleKeyDown = (event: KeyboardEvent) => {
      const newKonami = [...konami, event.key];
      
      if (newKonami.length > konamiCode.length) {
        newKonami.shift();
      }
      
      setKonami(newKonami);
      
      if (newKonami.length === konamiCode.length && 
          newKonami.every((key, index) => key === konamiCode[index])) {
        setShowEasterEgg(true);
        
        // Reset after a while
        setTimeout(() => {
          setShowEasterEgg(false);
        }, 10000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [location.pathname, konami]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-5 z-[-1]"></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-2xl mx-auto">
        {showEasterEgg ? (
          <div className="animate-float">
            <h1 className="text-6xl font-bold text-neon-purple mb-4 animate-pulse">
              EASTER EGG FOUND!
            </h1>
            <div className="glass-panel p-6 mb-8">
              <p className="text-xl mb-4">
                You've discovered the secret! 
              </p>
              <p className="text-neon-green">
                "The best error message is the one that never shows up."
                <span className="block text-sm mt-2">— Thomas Fuchs</span>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-panel p-4 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="w-full h-24 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-50 rounded-md"></div>
                </div>
              ))}
            </div>
            <Link to="/" className="text-neon-blue underline">
              Return to safety
            </Link>
          </div>
        ) : (
          <>
            <div className="glass-panel p-6 mb-8 border-neon-blue border">
              <h1 className="text-6xl font-bold text-neon-red mb-6">404</h1>
              <TypewriterText 
                text="ALERT! You've entered an unknown sector of Prachit's digital world! 🚀"
                className="text-xl text-neon-orange mb-4 block"
                speed={40}
              />
              <p className="text-gray-700 mb-6">
                The page you're looking for doesn't exist or has been moved to another dimension.
              </p>
              <Link 
                to="/" 
                className="px-6 py-3 rounded-md bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue transition-colors inline-block"
              >
                Return to Home Base
              </Link>
            </div>
            
            <p className="text-gray-500 text-sm">
              <span className="text-neon-green">HINT:</span> There might be a secret easter egg on this page...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default NotFound;
