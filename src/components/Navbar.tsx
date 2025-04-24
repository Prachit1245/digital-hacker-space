
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useMediaQuery } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleContactClick = () => {
    toast({
      title: 'Contact Information',
      description: (
        <>
          Feel free to reach out via email at prachitregmi456@gmail.com.
          <br />
          You can also find me on{' '}
          <a
            href="https://linkedin.com/in/prachitregmi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            LinkedIn
          </a>{' '}
          or{' '}
          <a
            href="https://twitter.com/prachit_regmi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Twitter
          </a>.
        </>
      ),
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-neon-blue">Prachit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-neon-blue transition-colors">
              Home
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-neon-blue transition-colors">
              Blog
            </Link>
            <Link to="/tools" className="text-gray-700 hover:text-neon-blue transition-colors">
              Tools
            </Link>
            <Button onClick={handleContactClick} variant="ghost" className="hover:text-neon-blue">
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
              aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link to="/" className="block py-2 text-gray-700 hover:text-neon-blue" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/blog" className="block py-2 text-gray-700 hover:text-neon-blue" onClick={closeMenu}>
              Blog
            </Link>
            <Link to="/tools" className="block py-2 text-gray-700 hover:text-neon-blue" onClick={closeMenu}>
              Tools
            </Link>
            <Button onClick={() => { handleContactClick(); closeMenu(); }} variant="ghost" className="w-full justify-start hover:text-neon-blue">
              Contact
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
