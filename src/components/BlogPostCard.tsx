
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  tags: string[];
  readTime: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <article className="cyber-card group overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
      <Link to={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded-md bg-neon-blue/10 text-neon-blue"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold mb-3 group-hover:text-neon-blue transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard;
