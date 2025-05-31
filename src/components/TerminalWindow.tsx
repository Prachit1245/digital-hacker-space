
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

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
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    'about-me': "I'm Prachit Regmi, a passionate CSIT student & tech enthusiast from Parbat, Nepal. I love exploring new technologies, building innovative solutions, and contributing to open-source projects. My journey in computer science began when I was fascinated by how technology can transform lives and solve complex problems.",
    
    'skills': (
      <div className="space-y-2 my-2">
        <p className="text-neon-green">Technical Skills:</p>
        <div>
          <div className="flex justify-between">
            <span>JavaScript/TypeScript</span>
            <span className="text-neon-blue">★★★★★</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-1 mb-2">
            <div className="bg-neon-blue h-1 rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between">
            <span>React/Next.js</span>
            <span className="text-neon-blue">★★★★☆</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-1 mb-2">
            <div className="bg-neon-blue h-1 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between">
            <span>Node.js/Express</span>
            <span className="text-neon-blue">★★★★☆</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-1 mb-2">
            <div className="bg-neon-blue h-1 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between">
            <span>Python</span>
            <span className="text-neon-blue">★★★★☆</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-1 mb-2">
            <div className="bg-neon-blue h-1 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between">
            <span>Database (SQL/NoSQL)</span>
            <span className="text-neon-blue">★★★☆☆</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-1 mb-2">
            <div className="bg-neon-blue h-1 rounded-full" style={{ width: '70%' }}></div>
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

  // Initialize welcome message
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
  }, [welcomeMessage]);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Terminal command submitted:', input);
    
    if (!input.trim()) return;
    
    const trimmedInput = input.trim().toLowerCase();
    
    // Add to command history
    setCommandHistory(prev => [...prev, input]);
    
    let output: string | JSX.Element = "Command not found. Type 'help' for available commands.";
    
    if (trimmedInput === 'clear') {
      setHistory([]);
      setInput('');
      setHistoryIndex(-1);
      return;
    }
    
    if (trimmedInput in commands) {
      output = commands[trimmedInput as keyof typeof commands];
    }
    
    const newCommand: TerminalCommand = {
      input: input,
      output,
      timestamp: new Date()
    };
    
    setHistory(prev => [...prev, newCommand]);
    setInput('');
    setHistoryIndex(-1);
    
    // Re-focus input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      className={cn(
        "bg-gray-900 rounded-lg border border-gray-700 shadow-xl overflow-hidden h-[400px] font-mono text-sm cursor-text",
        className
      )}
      onClick={handleTerminalClick}
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-xs text-gray-400">
          prachit@terminal ~ $
        </div>
      </div>
      
      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-4 overflow-y-auto h-[calc(100%-52px)] bg-gray-900"
      >
        {history.map((item, index) => (
          <div key={index} className="mb-3">
            {item.input !== 'system' ? (
              <>
                <div className="text-green-400 flex items-center gap-2">
                  <span>prachit@terminal ~ $</span>
                  <span className="text-white">{item.input}</span>
                </div>
                <div className="text-gray-300 mt-1 ml-4">{item.output}</div>
              </>
            ) : (
              <div className="text-blue-400 mb-2">{item.output}</div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">prachit@terminal ~ $</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none focus:outline-none text-white caret-green-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' for available commands..."
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
};

export default TerminalWindow;
