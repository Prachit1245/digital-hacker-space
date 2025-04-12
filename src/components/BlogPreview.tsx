
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlogPostCard from './BlogPostCard';

// Sample blog posts for the preview
const recentBlogPosts = [
  {
    id: 5,
    title: "The Humane AI Pin is Here — Welcome to the Screenless Future",
    slug: "humane-ai-pin-screenless-future",
    excerpt: "Explore how the Humane AI Pin is changing the tech landscape by introducing screenless, AI-powered wearable technology. Is this the future beyond smartphones?",
    coverImage: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    date: "April 12, 2025",
    tags: ["AI", "Wearable Tech", "Future Tech"],
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "When Servers Go Silent: What the Ncell Data Outage Taught Us About Nepal's Digital Fragility",
    slug: "ncell-data-outage-nepal",
    excerpt: "On April 5, 2025, millions of Nepalis woke up to a chilling realization: no mobile data, no calls, no internet. The country's largest telecom service provider, Ncell, experienced a massive nationwide network and data outage.",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "April 9, 2025",
    tags: ["Technology", "Nepal", "Infrastructure", "Telecom"],
    readTime: "7 min read"
  },
  {
    id: 1,
    title: "Getting Started with React in 2025",
    slug: "getting-started-with-react",
    excerpt: "Learn how to set up your first React project with the latest best practices and tools in 2025.",
    coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "April 5, 2025",
    tags: ["React", "JavaScript", "Web Development"],
    readTime: "5 min read"
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
