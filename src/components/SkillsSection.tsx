
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillsSectionProps {
  className?: string;
}

const skills: Skill[] = [
  { name: 'JavaScript/TypeScript', level: 92, color: 'bg-gradient-to-r from-neon-blue to-neon-purple' },
  { name: 'React/Next.js', level: 85, color: 'bg-gradient-to-r from-neon-blue to-neon-green' },
  { name: 'Node.js/Express', level: 80, color: 'bg-gradient-to-r from-neon-green to-neon-blue' },
  { name: 'Python', level: 78, color: 'bg-gradient-to-r from-neon-purple to-neon-blue' },
  { name: 'Database (SQL/NoSQL)', level: 70, color: 'bg-gradient-to-r from-neon-pink to-neon-purple' },
  { name: 'Machine Learning', level: 65, color: 'bg-gradient-to-r from-neon-orange to-neon-pink' },
  { name: 'UI/UX Design', level: 75, color: 'bg-gradient-to-r from-neon-pink to-neon-orange' },
  { name: 'DevOps', level: 60, color: 'bg-gradient-to-r from-neon-purple to-neon-pink' },
];

const SkillsSection = ({ className }: SkillsSectionProps) => {
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLDivElement;
            const index = parseInt(target.dataset.index || '0');
            const level = skills[index].level;
            
            target.style.width = `0%`;
            
            setTimeout(() => {
              target.style.transition = 'width 1.5s ease-in-out';
              target.style.width = `${level}%`;
            }, 100);
            
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    progressRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      progressRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <div className={cn("space-y-8", className)}>
      <h2 className="text-3xl font-bold text-gradient mb-8">Technical Skills</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-lg">{skill.name}</span>
              <span className="text-neon-blue">{skill.level}%</span>
            </div>
            <div className="h-2 bg-cyber-light rounded-full overflow-hidden">
              <div 
                ref={el => progressRefs.current[index] = el}
                data-index={index}
                className={cn("h-full", skill.color)}
                style={{ width: '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="glass-panel p-6 mt-12">
        <h3 className="text-xl font-semibold text-neon-green mb-4">Currently Learning</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="glass-panel p-3 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-neon-blue animate-pulse"></div>
            <span>Blockchain Development</span>
          </div>
          <div className="glass-panel p-3 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-neon-purple animate-pulse"></div>
            <span>Cloud Architecture</span>
          </div>
          <div className="glass-panel p-3 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-neon-pink animate-pulse"></div>
            <span>AI/ML Engineering</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
