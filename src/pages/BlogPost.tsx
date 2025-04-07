
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { toast } from 'sonner';

// This is a placeholder for blog post data
// In a real implementation, you would fetch this from your backend or CMS
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React in 2025",
    slug: "getting-started-with-react",
    excerpt: "Learn how to set up your first React project with the latest best practices and tools in 2025.",
    coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "April 5, 2025",
    tags: ["React", "JavaScript", "Web Development"],
    readTime: "5 min read",
    content: `
      <h2>Introduction to React in 2025</h2>
      <p>React has evolved significantly since its initial release. In 2025, setting up a React project involves several modern tools and practices that help developers build efficient and maintainable applications.</p>
      
      <h3>Prerequisites</h3>
      <p>Before we start, make sure you have the following installed:</p>
      <ul>
        <li>Node.js (latest LTS version)</li>
        <li>npm or yarn package manager</li>
        <li>A code editor (VS Code recommended)</li>
      </ul>
      
      <h3>Setting Up Your Project</h3>
      <p>We'll use Vite as our build tool because it offers faster development experience with instant server start and hot module replacement (HMR).</p>
      
      <pre><code>npm create vite@latest my-react-app -- --template react-ts</code></pre>
      
      <p>This command creates a new React project with TypeScript support. Navigate to the project directory and install dependencies:</p>
      
      <pre><code>cd my-react-app
npm install</code></pre>

      <h3>Modern React Patterns</h3>
      <p>In 2025, several patterns have become standard in React development:</p>
      
      <h4>1. React Hooks</h4>
      <p>Hooks are now the primary way to handle state and side effects in React components.</p>
      
      <h4>2. Component Composition</h4>
      <p>Building UI from smaller, reusable components has become even more important.</p>
      
      <h4>3. State Management</h4>
      <p>Context API and libraries like Redux Toolkit or React Query are commonly used for state management.</p>
      
      <h2>Conclusion</h2>
      <p>Getting started with React in 2025 is easier than ever, thanks to modern tools and frameworks that solve many common development challenges. By following these best practices, you'll be well on your way to building robust and maintainable React applications.</p>
    `
  },
  {
    id: 2,
    title: "Cybersecurity Essentials Every Developer Should Know",
    slug: "cybersecurity-essentials",
    excerpt: "Protect your applications with these essential cybersecurity practices that every developer should implement.",
    coverImage: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "April 2, 2025",
    tags: ["Cybersecurity", "Best Practices", "Development"],
    readTime: "8 min read",
    content: `
      <h2>Understanding Security Fundamentals</h2>
      <p>Cybersecurity has become a critical aspect of software development. As threats evolve, developers must stay informed about best practices to protect their applications and user data.</p>
      
      <h3>Common Security Vulnerabilities</h3>
      <p>Let's explore some common security vulnerabilities that developers should be aware of:</p>
      
      <h4>1. Injection Attacks</h4>
      <p>SQL injection and cross-site scripting (XSS) remain among the most common vulnerabilities. Always validate user input and use parameterized queries.</p>
      
      <h4>2. Authentication Weaknesses</h4>
      <p>Implement strong authentication methods with multi-factor authentication where possible.</p>
      
      <h4>3. Insecure Dependencies</h4>
      <p>Regularly update your dependencies and use tools to scan for known vulnerabilities.</p>
      
      <h3>Security Best Practices</h3>
      <p>Here are some essential practices every developer should follow:</p>
      
      <ul>
        <li>Implement proper authentication and authorization</li>
        <li>Use HTTPS everywhere</li>
        <li>Validate all inputs</li>
        <li>Follow the principle of least privilege</li>
        <li>Keep your dependencies updated</li>
        <li>Use security headers</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Security is not a feature but a necessity. By integrating these cybersecurity practices into your development workflow, you can significantly reduce the risk of vulnerabilities in your applications.</p>
    `
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the post from an API
    // This is a simulation of that process
    setIsLoading(true);
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    // Simulate API delay
    setTimeout(() => {
      setPost(foundPost);
      setIsLoading(false);
    }, 300);
    
    if (foundPost) {
      document.title = `${foundPost.title} | Prachit Regmi`;
    }
    
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-800 relative">
        <div className="absolute inset-0 circuit-bg opacity-5 z-[-1]"></div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse text-neon-blue">Loading...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-gray-800 relative">
        <div className="absolute inset-0 circuit-bg opacity-5 z-[-1]"></div>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 mt-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="inline-flex items-center text-neon-blue hover:text-neon-blue/80 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 relative">
      <div className="absolute inset-0 circuit-bg opacity-5 z-[-1]"></div>
      
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-4 py-20 mt-16">
        <div className="flex items-center justify-between mb-8">
          <Link to="/blog" className="inline-flex items-center text-neon-blue hover:text-neon-blue/80 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>
          
          <button 
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-neon-blue transition-colors"
          >
            <Share2 size={18} />
            Share
          </button>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">{post.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden mb-8 h-64 sm:h-80 md:h-96">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag: string, index: number) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-md bg-neon-blue/10 text-neon-blue"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-a:text-neon-blue"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      
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

export default BlogPost;
