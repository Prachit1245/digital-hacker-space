
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  level: number;
  color: string;
  icon: string;
}

interface SkillsSectionProps {
  className?: string;
}

const skills: Skill[] = [
  { 
    name: 'JavaScript/TypeScript', 
    level: 92, 
    color: 'bg-gradient-to-r from-neon-blue to-neon-purple',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  { 
    name: 'React/Next.js', 
    level: 85, 
    color: 'bg-gradient-to-r from-neon-blue to-neon-green',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },
  { 
    name: 'Node.js/Express', 
    level: 80, 
    color: 'bg-gradient-to-r from-neon-green to-neon-blue',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
  },
  { 
    name: 'Python', 
    level: 78, 
    color: 'bg-gradient-to-r from-neon-purple to-neon-blue',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  },
  { 
    name: 'Database (SQL/NoSQL)', 
    level: 70, 
    color: 'bg-gradient-to-r from-neon-pink to-neon-purple',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
  },
  { 
    name: 'Machine Learning', 
    level: 65, 
    color: 'bg-gradient-to-r from-neon-orange to-neon-pink',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg'
  },
  { 
    name: 'UI/UX Design', 
    level: 75, 
    color: 'bg-gradient-to-r from-neon-pink to-neon-orange',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
  },
  { 
    name: 'DevOps', 
    level: 60, 
    color: 'bg-gradient-to-r from-neon-purple to-neon-pink',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
  },
];

const SkillsSection = ({ className }: SkillsSectionProps) => {
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Stagger the animations for better performance
          skills.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSkills(prev => [...prev, index]);
            }, index * 100);
          });
          
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={sectionRef} className={cn("space-y-8 relative", className)}>
      {/* Background tech grid pattern */}
      <div className="absolute inset-0 cyber-grid opacity-10 -z-10"></div>
      
      <h2 className="text-3xl font-bold text-gradient mb-8">Technical Skills</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2 glass-panel p-4 relative overflow-hidden group">
            {/* Background skill icon */}
            <div className="absolute right-0 bottom-0 opacity-10 w-24 h-24 transition-opacity duration-300 group-hover:opacity-20">
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            
            <div className="flex justify-between">
              <span className="text-lg flex items-center gap-2">
                <img src={skill.icon} alt="" className="w-5 h-5" loading="lazy" />
                {skill.name}
              </span>
              <span className="text-neon-blue">{skill.level}%</span>
            </div>
            <div className="h-2 bg-cyber-light rounded-full overflow-hidden">
              <div 
                className={cn("h-full transition-all duration-1000 ease-out", skill.color)}
                style={{ 
                  width: visibleSkills.includes(index) ? `${skill.level}%` : '0%',
                  transform: 'translateZ(0)' // Force GPU acceleration
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="glass-panel p-6 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 z-[-1] opacity-20 bg-cyber-grid"></div>
        <h3 className="text-xl font-semibold text-neon-green mb-4">Currently Learning</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="glass-panel p-3 flex items-center gap-3 relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 opacity-5 w-16 h-16 transition-opacity duration-300 group-hover:opacity-10">
              <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitcoin/bitcoin-original.svg" 
                alt="Blockchain" 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="w-3 h-3 rounded-full bg-neon-blue animate-pulse"></div>
            <span>Blockchain Development</span>
          </div>
          <div className="glass-panel p-3 flex items-center gap-3 relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 opacity-5 w-16 h-16 transition-opacity duration-300 group-hover:opacity-10">
              <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" 
                alt="Cloud" 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="w-3 h-3 rounded-full bg-neon-purple animate-pulse"></div>
            <span>Cloud Architecture</span>
          </div>
          <div className="glass-panel p-3 flex items-center gap-3 relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 opacity-5 w-16 h-16 transition-opacity duration-300 group-hover:opacity-10">
              <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" 
                alt="AI/ML" 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="w-3 h-3 rounded-full bg-neon-pink animate-pulse"></div>
            <span>AI/ML Engineering</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
