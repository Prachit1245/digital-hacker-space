
import { useState } from 'react';
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
  
  return (
    <div 
      className={cn("cyber-card group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="cyber-card-inner">
        <div className="cyber-card-front flex flex-col h-full">
          <div className="h-40 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-lg font-medium text-neon-blue mb-2">{title}</h3>
            <p className="text-sm text-gray-300 mb-3 flex-1">{description}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-cyber-light text-neon-purple"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="cyber-card-back p-6 flex flex-col justify-center items-center">
          <h3 className="text-xl font-bold text-neon-green mb-4">{title}</h3>
          <p className="text-center mb-6">{description}</p>
          <div className="flex gap-4">
            {link && (
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded border border-neon-blue text-neon-blue hover:bg-neon-blue/20 transition-colors"
              >
                Live Demo
              </a>
            )}
            
            {github && (
              <a 
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded border border-neon-purple text-neon-purple hover:bg-neon-purple/20 transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
