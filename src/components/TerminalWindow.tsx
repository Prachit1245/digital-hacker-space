
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import TypewriterText from './TypewriterText';

interface TerminalProps {
  className?: string;
  welcomeMessage?: string;
}

interface TerminalCommand {
  input: string;
  output: string | JSX.Element;
  timestamp: Date;
}

const TerminalWindow = ({ className, welcomeMessage }: TerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    'about-me': "I'm Prachit Regmi, a passionate CSIT student & tech enthusiast from Kathmandu, Nepal. I love exploring new technologies, building innovative solutions, and contributing to open-source projects. My journey in computer science began when I was fascinated by how technology can transform lives and solve complex problems.",
    
    'skills': (
      <div className="space-y-2 my-2">
        <p className="text-neon-green">Technical Skills:</p>
        <div>
          <div className="flex justify-between">
            <span>JavaScript/TypeScript</span>
            <span className="text-neon-blue">★★★★★</span>
          </div>
          <div className="progress-bar mt-1 mb-2">
            <div className="progress-value" style={{ width: '92%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between">
            <span>React/Next.js</span>
            <span className="text-neon-blue">★★★★☆</span>
          </div>
          <div className="progress-bar mt-1 mb-2">
            <div className="progress-value" style={{ width: '85%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between">
            <span>Node.js/Express</span>
            <span className="text-neon-blue">★★★★☆</span>
          </div>
          <div className="progress-bar mt-1 mb-2">
            <div className="progress-value" style={{ width: '80%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between">
            <span>Python</span>
            <span className="text-neon-blue">★★★★☆</span>
          </div>
          <div className="progress-bar mt-1 mb-2">
            <div className="progress-value" style={{ width: '78%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between">
            <span>Database (SQL/NoSQL)</span>
            <span className="text-neon-blue">★★★☆☆</span>
          </div>
          <div className="progress-bar mt-1 mb-2">
            <div className="progress-value" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    ),
    
    'projects': (
      <div className="space-y-3 my-2">
        <div>
          <h3 className="text-neon-blue font-semibold">CyberGuard</h3>
          <p>A cybersecurity tool that scans websites for common vulnerabilities</p>
          <div className="text-xs text-neon-purple mt-1">
            #Python #Security #API
          </div>
        </div>
        
        <div>
          <h3 className="text-neon-blue font-semibold">DataVista</h3>
          <p>Interactive data visualization dashboard for big data analytics</p>
          <div className="text-xs text-neon-purple mt-1">
            #React #D3.js #Firebase
          </div>
        </div>
        
        <div>
          <h3 className="text-neon-blue font-semibold">NepaliNLP</h3>
          <p>Natural language processing library for Nepali language</p>
          <div className="text-xs text-neon-purple mt-1">
            #Python #NLP #MachineLearning
          </div>
        </div>
      </div>
    ),
    
    'contact': (
      <div className="space-y-2 my-2">
        <p>
          <span className="text-neon-pink">Email:</span> prachit.regmi@example.com
        </p>
        <p>
          <span className="text-neon-pink">GitHub:</span> github.com/prachitregmi
        </p>
        <p>
          <span className="text-neon-pink">LinkedIn:</span> linkedin.com/in/prachitregmi
        </p>
        <p>
          <span className="text-neon-pink">Twitter:</span> @prachit_regmi
        </p>
      </div>
    ),
    
    'help': (
      <div className="space-y-2 my-2">
        <p className="text-neon-green">Available commands:</p>
        <ul className="space-y-1">
          <li><span className="text-neon-blue">about-me</span> - Learn about Prachit</li>
          <li><span className="text-neon-blue">skills</span> - View technical skills</li>
          <li><span className="text-neon-blue">projects</span> - See project portfolio</li>
          <li><span className="text-neon-blue">contact</span> - Get contact information</li>
          <li><span className="text-neon-blue">clear</span> - Clear terminal</li>
          <li><span className="text-neon-blue">help</span> - Show this help message</li>
        </ul>
      </div>
    ),
    
    'clear': 'CLEAR',
    
    '': ''
  };

  useEffect(() => {
    if (welcomeMessage) {
      setHistory([
        {
          input: 'system',
          output: welcomeMessage,
          timestamp: new Date()
        }
      ]);
    }
    
    // Focus input on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [welcomeMessage]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedInput = input.trim().toLowerCase();
    const command = trimmedInput;
    
    let output: string | JSX.Element = "Command not found. Type 'help' for available commands.";
    
    if (command in commands) {
      output = commands[command as keyof typeof commands];
      
      if (command === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }
    }
    
    const newCommand: TerminalCommand = {
      input: input,
      output,
      timestamp: new Date()
    };
    
    setHistory(prev => [...prev, newCommand]);
    setInput('');
    setHistoryIndex(-1);
    
    // Re-focus the input after submission
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex === -1 ? 0 : historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].input);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].input);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      className={cn(
        "terminal-window relative overflow-hidden h-[350px]", // Added fixed height
        className
      )}
      onClick={focusInput}
      ref={terminalRef}
    >
      {/* Terminal Header */}
      <div className="absolute top-0 left-0 right-0 bg-cyber-dark border-b border-neon-blue/30 p-2 flex items-center">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-xs text-neon-blue opacity-70">
          prachit@hacker-terminal ~ $
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="pt-8 pb-2 px-3 overflow-y-auto h-full">
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            {item.input !== 'system' ? (
              <>
                <div className="text-neon-green">
                  prachit@hacker-terminal ~ $ <span className="text-white">{item.input}</span>
                </div>
                <div className="text-gray-300 mt-1">{item.output}</div>
              </>
            ) : (
              <div className="text-neon-blue">{item.output}</div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-neon-green">prachit@hacker-terminal ~ $</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none focus:outline-none text-white px-2 py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default TerminalWindow;
