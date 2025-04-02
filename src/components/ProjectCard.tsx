
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  className?: string;
}

const ProjectCard = ({
  title,
  description,
  tags,
  image,
  link,
  github,
  className
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "cyber-card group opacity-0 transition-all duration-700 transform translate-y-8",
        isVisible ? "opacity-100 translate-y-0" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="cyber-card-inner relative overflow-hidden">
        <div className="h-40 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col bg-white">
          <h3 className="text-lg font-medium text-neon-blue mb-2 group-hover:text-gradient-blue-to-purple transition-all duration-300">{title}</h3>
          <p className="text-sm text-gray-700 mb-3 flex-1">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-neon-blue/10 text-neon-blue group-hover:bg-neon-blue/20 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100">
            {github && (
              <a 
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-3 py-1.5 rounded-md border border-neon-purple text-neon-purple hover:bg-neon-purple/10 transition-colors flex items-center gap-1.5 group/btn hover:shadow-[0_0_10px_rgba(139,92,246,0.4)]"
              >
                <Github className="w-4 h-4 group-hover/btn:animate-spin" />
                GitHub
              </a>
            )}
            
            {link && (
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-3 py-1.5 rounded-md border border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition-colors flex items-center gap-1.5 group/btn hover:shadow-[0_0_10px_rgba(14,165,233,0.4)]"
              >
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                Demo
              </a>
            )}
          </div>
        </div>
        
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex h-2 w-2 rounded-full bg-neon-green animate-ping"></span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

// Need to add this to fix the TS error
import { Github, ExternalLink } from 'lucide-react';
