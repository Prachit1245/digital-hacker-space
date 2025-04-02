import { useEffect, useRef } from 'react';
import MatrixBackground from '@/components/MatrixBackground';
import TypewriterText from '@/components/TypewriterText';
import TerminalWindow from '@/components/TerminalWindow';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import CyberCube from '@/components/CyberCube';
import GlitchHeading from '@/components/GlitchHeading';
import { ArrowDown, Github, ExternalLink, Terminal, Code } from 'lucide-react';

const Index = () => {
  const welcomeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Ensure page starts at the top
    window.scrollTo(0, 0);
    
    // Handle hash navigation if present
    const { hash } = window.location;
    if (hash && document.querySelector(hash)) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (welcomeRef.current) {
      // Otherwise ensure we start at the top
      welcomeRef.current.scrollIntoView({ block: 'start', behavior: 'auto' });
    }

    // Add event listener to handle browser back/forward navigation
    const handleNavigation = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
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
    <div className="min-h-screen bg-cyber-dark text-gray-200 overflow-x-hidden relative" id="top">
      <MatrixBackground />
      
      <div className="absolute inset-0 circuit-bg opacity-5 z-[-1]"></div>
      
      <Navbar />
      
      <section id="welcome" ref={welcomeRef} className="min-h-screen relative flex flex-col items-center justify-center px-4 sm:px-6 py-20">
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 to-transparent opacity-20 z-[-1]"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-8 profile-image-container inline-block">
            <img 
              src="/lovable-uploads/849fd63f-1814-4e72-a447-0d5359e05bdf.png" 
              alt="Prachit Regmi" 
              className="profile-image w-32 h-32 object-cover rounded-full border-2 border-neon-blue gpu"
              loading="eager"
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
          
          <GlitchHeading text="Prachit Regmi" />
          
          <p className="text-xl sm:text-2xl text-gray-700 mb-8">
            <TypewriterText
              text="CSIT Student & Tech Enthusiast"
              speed={80}
              startDelay={1500}
            />
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a 
              href="https://github.com/Prachit1245" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-md bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue transition-all duration-300 flex items-center gap-2 group hover:translate-y-[-3px] hover:shadow-lg"
            >
              <Github size={20} className="group-hover:animate-spin" />
              GitHub
            </a>
            
            <a 
              href="#projects" 
              className="px-6 py-3 rounded-md bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple transition-all duration-300 flex items-center gap-2 group hover:translate-y-[-3px] hover:shadow-lg"
              onClick={scrollToProjects}
            >
              <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
              Projects
            </a>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="text-neon-blue" size={32} />
          </div>
        </div>
        
        <CyberCube />
      </section>
      
      <div className="absolute inset-0 cyber-grid opacity-5 z-[-1]"></div>
      
      <section id="about" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">About Me</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="p-6 rounded-md relative overflow-hidden group bg-white shadow-md border border-gray-200">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <h3 className="text-xl font-semibold text-neon-blue mb-4 flex items-center gap-2">
                <Terminal size={18} className="text-neon-green" />
                Who Am I?
              </h3>
              <p className="text-gray-700 mb-4">
                I'm Prachit Regmi, a passionate CSIT student & tech enthusiast from Kathmandu, Nepal. I love exploring new technologies, building innovative solutions, and contributing to open-source projects.
              </p>
              <p className="text-gray-700 mb-4">
                My journey in computer science began when I was fascinated by how technology can transform lives and solve complex problems. Since then, I've been on a mission to expand my knowledge and skills across various domains of computer science.
              </p>
              <p className="text-gray-700">
                When I'm not coding, you can find me exploring cybersecurity challenges, participating in hackathons, or learning about the latest advancements in AI and machine learning.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-neon-green mb-4 flex items-center gap-2">
                <Code size={18} className="text-neon-blue" />
                Interactive Terminal
              </h3>
              <p className="text-gray-700 mb-4">Try running some commands to learn more about me:</p>
              
              <TerminalWindow 
                welcomeMessage="Welcome to Prachit's terminal! Type 'help' to see available commands."
              />
            </div>
          </div>
        </div>
      </section>
      
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-[-1]"></div>
      <div className="absolute inset-0 circuit-bg opacity-5 z-[-1]"></div>
      
      <section id="projects" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Featured Projects</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Explore some of my recent work and coding experiments</p>
          
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
              className="inline-flex items-center px-6 py-3 rounded-md bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue transition-all duration-300 gap-2 group hover:translate-y-[-3px] hover:shadow-lg"
            >
              View All Projects on GitHub
              <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
      
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-[-1]"></div>
      
      <section id="skills" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Technical Arsenal</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Tools and technologies I've mastered on my journey</p>
          </div>
          <SkillsSection />
        </div>
      </section>
      
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-[-1]"></div>
      
      <section id="contact" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Connect With Me</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Let's collaborate on something amazing</p>
          </div>
          <ContactSection />
        </div>
      </section>
      
      <div className="absolute inset-0 circuit-bg opacity-5 z-[-1]"></div>
      
      <footer className="py-8 px-4 sm:px-6 border-t border-gray-200 relative bg-white">
        <div className="absolute inset-0 circuit-bg opacity-5 z-[-1]"></div>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            © {new Date().getFullYear()} Prachit Regmi. All rights reserved.
          </p>
          <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-neon-green animate-pulse"></span>
            <span>Status: Online & Ready for Opportunities</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
