import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { ArrowLeft, Calendar, Clock, Share2, WifiOff, Smartphone, Network } from 'lucide-react';
import { toast } from 'sonner';

// This is a placeholder for blog post data
// In a real implementation, you would fetch this from your backend or CMS
const blogPosts = [
  {
    id: 4,
    title: "When Servers Go Silent: What the Ncell Data Outage Taught Us About Nepal's Digital Fragility",
    slug: "ncell-data-outage-nepal",
    excerpt: "On April 5, 2025, millions of Nepalis woke up to a chilling realization: no mobile data, no calls, no internet. The country's largest telecom service provider, Ncell, experienced a massive nationwide network and data outage.",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "April 9, 2025",
    tags: ["Technology", "Nepal", "Infrastructure", "Telecom"],
    readTime: "7 min read",
    content: `
      <div class="flex justify-center mb-6">
        <div class="inline-flex items-center gap-4 bg-red-100 text-red-800 px-6 py-3 rounded-lg">
          <WifiOff size={24} />
          <span class="font-semibold">Digital Crisis Alert</span>
        </div>
      </div>
      
      <p>On April 5, 2025, millions of Nepalis woke up to a chilling realization: no mobile data, no calls, no internet. The country's largest telecom service provider, Ncell, experienced a massive nationwide network and data outage that left a significant portion of the population disconnected from the digital world.</p>
      
      <p>Students, remote workers, businesses, and emergency services — all were plunged into a digital blackout, unable to access services they depend on daily. For some, it was a mere inconvenience. For others, it was a crisis. But one thing was certain: Nepal's digital infrastructure is far more fragile than we ever realized.</p>
      
      <h2>The Immediate Impact: More Than Just an Inconvenience</h2>
      <p>At first, many thought it was just a temporary glitch. "Ncell must be fixing something," said some, while others blamed their phones or networks. But as the hours stretched into a full day of disconnection, it became clear: this wasn't a routine issue.</p>
      
      <p>For students who were attending online classes, the outage meant missing assignments, lectures, and crucial learning opportunities. For remote workers, the loss of internet was a massive blow to productivity. And for businesses relying on digital tools to stay afloat in the ever-growing tech-driven market, the outage disrupted everything from communications to transactions.</p>
      
      <p>The absence of access to online banking and payment systems crippled financial services for a large number of users. For many, a simple mobile recharge became an impossible task. Online businesses saw their websites go dark, while restaurants and service providers relying on food delivery apps lost contact with their customers.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="bg-gray-50 p-6 rounded-lg">
          <div class="flex items-center gap-3 mb-4 text-neon-blue">
            <Smartphone size={28} />
            <h3 class="font-semibold text-lg">User Impact</h3>
          </div>
          <ul class="list-disc pl-5 space-y-2 text-gray-700">
            <li>Students missed online classes and deadlines</li>
            <li>Remote workers lost productivity and missed meetings</li>
            <li>Businesses couldn't process digital payments</li>
            <li>Emergency services faced communication challenges</li>
          </ul>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <div class="flex items-center gap-3 mb-4 text-neon-purple">
            <Network size={28} />
            <h3 class="font-semibold text-lg">Infrastructure Issues</h3>
          </div>
          <ul class="list-disc pl-5 space-y-2 text-gray-700">
            <li>Lack of redundant systems and failovers</li>
            <li>Over-reliance on physical hardware</li>
            <li>Limited geographic distribution of servers</li>
            <li>Insufficient disaster recovery protocols</li>
          </ul>
        </div>
      </div>
      
      <h2>Behind the Outage: A Wake-Up Call for Nepal's Tech Infrastructure</h2>
      <p>While Ncell's technical team scrambled to resolve the issue, the outage exposed a glaring vulnerability in Nepal's digital infrastructure. While the country has made significant strides in mobile and internet penetration over the past decade, the incident highlights several key issues:</p>
      
      <h3>1. Dependency on a Single Provider</h3>
      <p>Ncell serves millions of Nepalis, with little competition in terms of data coverage and pricing. This creates a critical vulnerability: if one telecom provider experiences issues, it leaves the country's entire communication network at risk.</p>
      
      <p>In a world where digital services have become as essential as electricity, relying heavily on a single provider is a dangerous proposition. If Ncell goes down, the whole country suffers.</p>
      
      <h3>2. Lack of Robust Backup Systems</h3>
      <p>One of the most alarming aspects of the outage was the lack of redundant systems. While the telecommunications industry worldwide has embraced cutting-edge technologies to ensure service continuity (like cloud-based systems and multiple network failovers), Nepal's telecom infrastructure is still largely dependent on physical hardware and localized systems, which makes it more prone to widespread outages.</p>
      
      <h2>What This Means for Nepal's Digital Future</h2>
      <p>The Ncell outage serves as a sobering reminder of how much we depend on the digital world. As the world increasingly moves towards a cashless economy, remote education, and online business models, Nepal cannot afford to overlook its digital infrastructure.</p>
      
      <p>Here's how this incident could reshape Nepal's digital future:</p>
      
      <h3>1. A Push for More Competition in Telecom Services</h3>
      <p>This outage might be the wake-up call the industry needs. There has never been a better time for competition in Nepal's telecom sector. If more telecom companies like NTC (Nepal Telecom), Smart Telecom, and others invest in infrastructure, it could create a more resilient, multi-layered digital network that doesn't rely on one service provider. More choices for consumers could also drive innovation, better service quality, and cost reductions.</p>
      
      <h3>2. Time for Redundancy and Cloud Solutions</h3>
      <p>If there's one takeaway from the Ncell outage, it's that redundancy matters. Telecom companies need to invest in cloud-based technologies, backup servers, and data centers spread across multiple geographic locations to mitigate the risk of complete system failure. Nepal's reliance on physical infrastructure for telecom needs to evolve quickly to embrace modern solutions that ensure business continuity in times of crisis.</p>
      
      <h3>3. National Digital Literacy Campaign</h3>
      <p>As remote learning, e-commerce, and online banking become more essential, we must also realize that not everyone in Nepal is digitally literate. This outage disproportionately affected those who have limited access to technology, and those who don't understand how to work around such issues. A national push for digital literacy could prepare more citizens to better navigate such technological crises in the future.</p>
      
      <h2>Lessons Learned: Moving Towards a More Resilient Digital Nepal</h2>
      <p>While the Ncell data outage was inconvenient for many, it also offers valuable lessons for Nepal's tech ecosystem. We now have an opportunity to rethink how we approach digital infrastructure and prioritize the reliability, competition, and accessibility of our telecom and internet services.</p>
      
      <p>Nepal's digital future is bright, but it requires investment in robust systems, competition-driven innovation, and a culture of preparedness for potential outages. Only then can we ensure that we don't find ourselves in a digital blackout again.</p>
      
      <h2>A Call for Action: What Should Be Done Next?</h2>
      <ul>
        <li><strong>Government Regulation:</strong> The Nepal government must set clear regulations to ensure that telecom providers invest in infrastructure and redundancy. These regulations should encourage competition and drive service quality, ensuring that outages like this become a rare occurrence.</li>
        <li><strong>Public-Private Collaboration:</strong> It's time for collaboration between private companies, the government, and the tech community to foster resilience. We must build systems with multiple failovers, cloud solutions, and better disaster recovery mechanisms in place.</li>
        <li><strong>Tech Education:</strong> For the future of Nepal, tech literacy is key. Providing accessible education and resources about technology will ensure that people understand not only how to use digital tools but also how to protect themselves from digital disruptions.</li>
      </ul>
      
      <h2>The Future of Nepal's Digital Landscape: Let's Build it Together</h2>
      <p>The digital revolution in Nepal is just beginning. The Ncell outage, while disruptive, serves as a catalyst for change — an opportunity to rethink how we build and maintain the systems we rely on. Let's use this setback to build a stronger, more resilient digital Nepal that can weather any storm — from outages to technological advancements.</p>
      
      <p>Let's not wait for the next outage to wake us up. It's time for Nepal to embrace the future and build a digital landscape that's innovative, secure, and reliable for everyone.</p>
      
      <div class="bg-gray-50 p-6 rounded-lg my-8">
        <h3 class="text-xl font-semibold mb-4">💬 What do you think?</h3>
        <p>Have you been impacted by the Ncell outage? Let's talk about it in the comments below. Share this post if you think it's time for Nepal's digital infrastructure to get the attention it deserves!</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span class="text-xs px-3 py-1 bg-gray-200 rounded-full text-gray-700">#NcellOutage</span>
          <span class="text-xs px-3 py-1 bg-gray-200 rounded-full text-gray-700">#DigitalNepal</span>
          <span class="text-xs px-3 py-1 bg-gray-200 rounded-full text-gray-700">#TechInfrastructure</span>
          <span class="text-xs px-3 py-1 bg-gray-200 rounded-full text-gray-700">#NepalTech</span>
          <span class="text-xs px-3 py-1 bg-gray-200 rounded-full text-gray-700">#TelecomCrisis</span>
          <span class="text-xs px-3 py-1 bg-gray-200 rounded-full text-gray-700">#NepalInnovation</span>
          <span class="text-xs px-3 py-1 bg-gray-200 rounded-full text-gray-700">#FutureOfNepal</span>
        </div>
      </div>
    `
  },
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
    setIsLoading(true);
    const foundPost = blogPosts.find(p => p.slug === slug);
    
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
