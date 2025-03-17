
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        isScrolled ? "bg-cyber-darker/80 backdrop-blur-md shadow-md" : "bg-transparent",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-neon-blue glow-text">
          PR<span className="text-white">_</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a href="#welcome" className="text-gray-300 hover:text-neon-blue transition-colors">
            Home
          </a>
          <a href="#about" className="text-gray-300 hover:text-neon-blue transition-colors">
            About
          </a>
          <a href="#projects" className="text-gray-300 hover:text-neon-blue transition-colors">
            Projects
          </a>
          <a href="#skills" className="text-gray-300 hover:text-neon-blue transition-colors">
            Skills
          </a>
          <a href="#contact" className="text-gray-300 hover:text-neon-blue transition-colors">
            Contact
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cyber-darker/95 backdrop-blur-md py-4 px-6 flex flex-col space-y-4 border-t border-neon-blue/30">
          <a 
            href="#welcome" 
            className="text-gray-300 hover:text-neon-blue transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </a>
          <a 
            href="#about" 
            className="text-gray-300 hover:text-neon-blue transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a 
            href="#projects" 
            className="text-gray-300 hover:text-neon-blue transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </a>
          <a 
            href="#skills" 
            className="text-gray-300 hover:text-neon-blue transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Skills
          </a>
          <a 
            href="#contact" 
            className="text-gray-300 hover:text-neon-blue transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
