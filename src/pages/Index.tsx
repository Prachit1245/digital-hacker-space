
import { useEffect, useState, useRef } from 'react';
import MatrixBackground from '@/components/MatrixBackground';
import TypewriterText from '@/components/TypewriterText';
import TerminalWindow from '@/components/TerminalWindow';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import { ArrowDown, Github, ExternalLink } from 'lucide-react';

const Index = () => {
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [bootPercentage, setBootPercentage] = useState(0);
  const welcomeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate boot sequence
    const interval = setInterval(() => {
      setBootPercentage(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setBootSequenceComplete(true);
            setTimeout(() => setShowContent(true), 500);
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const projectData = [
    {
      title: 'CyberGuard',
      description: 'A cybersecurity tool that scans websites for common vulnerabilities and provides detailed reports.',
      tags: ['Python', 'Security', 'API'],
      image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      github: 'https://github.com',
      link: 'https://example.com'
    },
    {
      title: 'DataVista',
      description: 'Interactive data visualization dashboard for big data analytics with real-time updates.',
      tags: ['React', 'D3.js', 'Firebase'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      github: 'https://github.com',
      link: 'https://example.com'
    },
    {
      title: 'NepaliNLP',
      description: 'Natural language processing library for Nepali language with sentiment analysis capabilities.',
      tags: ['Python', 'NLP', 'Machine Learning'],
      image: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      github: 'https://github.com',
    },
    {
      title: 'SmartTask',
      description: 'Productivity application with AI-powered task management and scheduling features.',
      tags: ['React Native', 'Node.js', 'AI'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      github: 'https://github.com',
      link: 'https://example.com'
    },
  ];
  
  return (
    <div className="min-h-screen bg-cyber-darker text-white overflow-x-hidden">
      {!bootSequenceComplete ? (
        // Boot Sequence Screen
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-cyber">
          <div className="w-full max-w-md">
            <div className="mb-6 text-neon-green">
              <p>$ initiating_system_boot</p>
              <p>$ loading_core_modules</p>
              <p>$ verifying_integrity</p>
              <p>$ establishing_connection</p>
              <p className="animate-pulse">$ booting_security_protocols</p>
            </div>
            
            <div className="w-full h-2 bg-cyber-light rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink transition-all duration-300"
                style={{ width: `${bootPercentage}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm text-neon-blue">
              <span>PR_OS v3.5</span>
              <span>{bootPercentage}%</span>
            </div>
          </div>
        </div>
      ) : (
        // Main Content
        <>
          <MatrixBackground />
          <Navbar />
          
          {showContent && (
            <>
              {/* Welcome Section */}
              <section id="welcome" ref={welcomeRef} className="min-h-screen relative flex flex-col items-center justify-center px-4 sm:px-6 py-20">
                <div className="relative z-10 text-center max-w-3xl mx-auto">
                  <div className="mb-8 profile-image-container inline-block">
                    <img 
                      src="/lovable-uploads/849fd63f-1814-4e72-a447-0d5359e05bdf.png" 
                      alt="Prachit Regmi" 
                      className="profile-image w-32 h-32 object-cover rounded-full border-2 border-neon-blue"
                    />
                  </div>
                
                  <div className="terminal-window mb-6 text-left">
                    <TypewriterText
                      text={[
                        "Initializing Prachit Regmi's Digital Space...",
                        "Loading skills... ✅",
                        "Activating portfolio... ✅",
                        "Welcome to my world! 🚀"
                      ]}
                      speed={50}
                      startDelay={300}
                      className="text-neon-green"
                    />
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                    <span className="text-gradient">Prachit Regmi</span>
                  </h1>
                  
                  <p className="text-xl sm:text-2xl text-gray-300 mb-8">
                    <TypewriterText
                      text="CSIT Student & Tech Enthusiast"
                      speed={80}
                      startDelay={2500}
                    />
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <a 
                      href="https://github.com/prachitregmi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-md bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue transition-colors flex items-center gap-2"
                    >
                      <Github size={20} />
                      GitHub
                    </a>
                    
                    <a 
                      href="#projects" 
                      className="px-6 py-3 rounded-md bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple transition-colors flex items-center gap-2"
                      onClick={scrollToProjects}
                    >
                      <ExternalLink size={20} />
                      Projects
                    </a>
                  </div>
                  
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ArrowDown className="text-neon-blue" size={32} />
                  </div>
                </div>
              </section>
              
              {/* About Section with Terminal */}
              <section id="about" className="py-20 px-4 sm:px-6 relative">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-gradient mb-12 text-center">About Me</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="glass-panel p-6 rounded-md">
                      <h3 className="text-xl font-semibold text-neon-blue mb-4">Who Am I?</h3>
                      <p className="text-gray-300 mb-4">
                        I'm Prachit Regmi, a passionate CSIT student & tech enthusiast from Kathmandu, Nepal. I love exploring new technologies, building innovative solutions, and contributing to open-source projects.
                      </p>
                      <p className="text-gray-300 mb-4">
                        My journey in computer science began when I was fascinated by how technology can transform lives and solve complex problems. Since then, I've been on a mission to expand my knowledge and skills across various domains of computer science.
                      </p>
                      <p className="text-gray-300">
                        When I'm not coding, you can find me exploring cybersecurity challenges, participating in hackathons, or learning about the latest advancements in AI and machine learning.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-neon-green mb-4">Interactive Terminal</h3>
                      <p className="text-gray-300 mb-4">Try running some commands to learn more about me:</p>
                      
                      <TerminalWindow 
                        welcomeMessage="Welcome to Prachit's terminal! Type 'help' to see available commands."
                      />
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Projects Section */}
              <section id="projects" className="py-20 px-4 sm:px-6 relative bg-cyber-dark">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-gradient mb-12 text-center">Featured Projects</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {projectData.map((project, index) => (
                      <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        tags={project.tags}
                        image={project.image}
                        github={project.github}
                        link={project.link}
                      />
                    ))}
                  </div>
                  
                  <div className="mt-12 text-center">
                    <a 
                      href="https://github.com/prachitregmi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 rounded-md bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue transition-colors gap-2"
                    >
                      View All Projects on GitHub
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </section>
              
              {/* Skills Section */}
              <section id="skills" className="py-20 px-4 sm:px-6 relative">
                <div className="max-w-6xl mx-auto">
                  <SkillsSection />
                </div>
              </section>
              
              {/* Contact Section */}
              <section id="contact" className="py-20 px-4 sm:px-6 relative bg-cyber-dark">
                <div className="max-w-6xl mx-auto">
                  <ContactSection />
                </div>
              </section>
              
              {/* Footer */}
              <footer className="py-8 px-4 sm:px-6 border-t border-neon-blue/30">
                <div className="max-w-6xl mx-auto text-center">
                  <p className="text-gray-400 mb-4">
                    © {new Date().getFullYear()} Prachit Regmi. All rights reserved.
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="text-neon-green">Status:</span> Online & Ready for Opportunities
                  </p>
                </div>
              </footer>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Index;
