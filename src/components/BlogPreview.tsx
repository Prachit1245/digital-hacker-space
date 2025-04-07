
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlogPostCard from './BlogPostCard';

// Sample blog posts for the preview
const recentBlogPosts = [
  {
    id: 1,
    title: "Getting Started with React in 2025",
    slug: "getting-started-with-react",
    excerpt: "Learn how to set up your first React project with the latest best practices and tools in 2025.",
    coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "April 5, 2025",
    tags: ["React", "JavaScript", "Web Development"],
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Cybersecurity Essentials Every Developer Should Know",
    slug: "cybersecurity-essentials",
    excerpt: "Protect your applications with these essential cybersecurity practices that every developer should implement.",
    coverImage: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "April 2, 2025",
    tags: ["Cybersecurity", "Best Practices", "Development"],
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Advanced TypeScript Patterns for Better Code",
    slug: "advanced-typescript-patterns",
    excerpt: "Discover advanced TypeScript patterns and techniques to write more maintainable and robust code.",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80",
    date: "March 29, 2025",
    tags: ["TypeScript", "JavaScript", "Programming"],
    readTime: "6 min read"
  }
];

const BlogPreview: React.FC = () => {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Latest Blog Posts</h2>
            <p className="text-gray-600 max-w-2xl">
              Thoughts, tutorials, and insights on technology and programming
            </p>
          </div>
          
          <Link 
            to="/blog"
            className="text-neon-blue hover:text-neon-blue/80 flex items-center transition-colors"
          >
            View All Posts
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentBlogPosts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
