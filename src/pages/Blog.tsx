
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import BlogPostCard from '@/components/BlogPostCard';
import { ArrowLeft } from 'lucide-react';

// Sample blog posts data - this can be moved to a separate file later
const blogPosts = [
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

const Blog = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    document.title = "Blog | Prachit Regmi";
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden relative">
      <div className="absolute inset-0 circuit-bg opacity-5 z-[-1]"></div>
      
      <Navbar />
      
      <section className="py-20 px-4 sm:px-6 relative mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="inline-flex items-center text-neon-blue hover:text-neon-blue/80 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">Blog</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl">
            Thoughts, tutorials, and insights on technology, programming, and more.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
      
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

export default Blog;
