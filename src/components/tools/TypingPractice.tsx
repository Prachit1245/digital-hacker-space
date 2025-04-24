
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Timer, Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Language = 'english' | 'nepali';
type TimeOption = 60 | 180;

const SAMPLE_TEXTS = {
  english: "The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow. How vexingly quick daft zebras jump! Bright vixens jump; dozy fowl quack. Pack my box with five dozen liquor jugs.",
  nepali: "नेपाल एक सुन्दर देश हो । यहाँ हिमाल, पहाड र तराई तीन भूभाग छन् । यस देशमा विविध जातजाति, भाषाभाषी र संस्कृति छन् । विविधतामा एकता नै नेपालको राष्ट्रिय विशेषता हो ।"
};

const TypingPractice = () => {
  const [text, setText] = useState('');
  const [target, setTarget] = useState(SAMPLE_TEXTS.english);
  const [timer, setTimer] = useState<TimeOption>(60);
  const [timeOption, setTimeOption] = useState<TimeOption>(60);
  const [isActive, setIsActive] = useState(false);
  const [language, setLanguage] = useState<Language>('english');
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, errors: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      calculateStats();
    }
    return () => interval && clearInterval(interval);
  }, [isActive, timer]);

  // Calculate typing stats
  const calculateStats = () => {
    const words = text.trim().split(' ').filter(word => word.length > 0).length;
    const minutes = (timeOption - timer) / 60;
    const wpm = Math.round(words / (minutes || 1)); // Avoid division by zero
    
    // Calculate accuracy
    let correctChars = 0;
    const minLength = Math.min(text.length, target.length);
    
    for (let i = 0; i < minLength; i++) {
      if (text[i] === target[i]) {
        correctChars++;
      }
    }
    
    const accuracy = text.length > 0 ? Math.round((correctChars / text.length) * 100) : 0;
    const errors = text.length - correctChars;
    
    setStats({ wpm, accuracy: Math.max(0, accuracy), errors });
    
    // Show toast with results
    toast({
      title: "Time's up!",
      description: `Your score: ${wpm} WPM with ${accuracy}% accuracy.`,
    });
  };

  // Start typing test
  const startTest = () => {
    setText('');
    setTimer(timeOption);
    setIsActive(true);
    setStats({ wpm: 0, accuracy: 100, errors: 0 });
    // Focus the textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };

  // Change language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setTarget(SAMPLE_TEXTS[lang]);
    if (isActive) {
      setIsActive(false);
      setTimer(timeOption);
      setText('');
    }
  };

  // Change time option
  const changeTimeOption = (time: TimeOption) => {
    setTimeOption(time);
    if (!isActive) {
      setTimer(time);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Typing Practice</h2>
        <div className="flex items-center space-x-2">
          <Timer className="h-5 w-5 text-neon-blue" />
          <span className="font-mono text-xl">{timer}s</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={language === 'english' ? 'default' : 'outline'}
            onClick={() => changeLanguage('english')}
            disabled={isActive}
          >
            English
          </Button>
          <Button
            variant={language === 'nepali' ? 'default' : 'outline'}
            onClick={() => changeLanguage('nepali')}
            disabled={isActive}
          >
            नेपाली
          </Button>
          <span className="flex-grow"></span>
          <Button
            variant={timeOption === 60 ? 'default' : 'outline'}
            onClick={() => changeTimeOption(60)}
            disabled={isActive}
            size="sm"
          >
            1 Min
          </Button>
          <Button
            variant={timeOption === 180 ? 'default' : 'outline'}
            onClick={() => changeTimeOption(180)}
            disabled={isActive}
            size="sm"
          >
            3 Min
          </Button>
        </div>

        <div className="p-4 bg-gray-50 rounded-md">
          <p className="font-mono text-gray-600">{target}</p>
        </div>

        <Textarea
          ref={textareaRef}
          placeholder="Start typing here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!isActive}
          className="font-mono h-32"
        />

        <div className="flex flex-wrap gap-4 justify-between items-center">
          <Button onClick={startTest} disabled={isActive}>
            Start Test
          </Button>

          <div className="flex flex-wrap gap-4">
            <div className="text-center">
              <Label>WPM</Label>
              <p className="text-xl font-semibold text-neon-blue">{stats.wpm}</p>
            </div>
            <div className="text-center">
              <Label>Accuracy</Label>
              <p className="text-xl font-semibold text-neon-blue">{stats.accuracy}%</p>
            </div>
            <div className="text-center">
              <Label>Errors</Label>
              <p className="text-xl font-semibold text-neon-blue">{stats.errors}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingPractice;
