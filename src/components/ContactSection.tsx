
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Send, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import TypewriterText from './TypewriterText';

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className }: ContactSectionProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      
      // Reset success message after a delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className={cn("space-y-8", className)}>
      <h2 className="text-3xl font-bold text-gradient mb-8">Get In Touch</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="glass-panel p-6 rounded-md">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-neon-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neon-green mb-2">Message Sent!</h3>
              <p className="text-gray-300">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-2 bg-cyber-light/50 border border-neon-blue/30 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 bg-cyber-light/50 border border-neon-blue/30 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 bg-cyber-light/50 border border-neon-blue/30 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
        
        {/* Contact Info */}
        <div className="glass-panel p-6 rounded-md flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-neon-blue mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-neon-blue" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Email</h4>
                  <p className="text-neon-blue">prachit.regmi@example.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center flex-shrink-0">
                  <Github className="w-5 h-5 text-neon-purple" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">GitHub</h4>
                  <a href="https://github.com/prachitregmi" target="_blank" rel="noopener noreferrer" className="text-neon-purple hover:underline">
                    github.com/prachitregmi
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center flex-shrink-0">
                  <Linkedin className="w-5 h-5 text-neon-green" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">LinkedIn</h4>
                  <a href="https://linkedin.com/in/prachitregmi" target="_blank" rel="noopener noreferrer" className="text-neon-green hover:underline">
                    linkedin.com/in/prachitregmi
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-neon-pink/20 flex items-center justify-center flex-shrink-0">
                  <Twitter className="w-5 h-5 text-neon-pink" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Twitter</h4>
                  <a href="https://twitter.com/prachit_regmi" target="_blank" rel="noopener noreferrer" className="text-neon-pink hover:underline">
                    @prachit_regmi
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 border border-neon-blue/30 rounded-md bg-neon-blue/5">
            <TypewriterText
              text="Want to collaborate on a project? Let's talk!"
              className="text-neon-blue"
              speed={50}
              loop={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
