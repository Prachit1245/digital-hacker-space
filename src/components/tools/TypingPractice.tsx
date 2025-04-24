
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Timer } from "lucide-react";

const TypingPractice = () => {
  const [text, setText] = useState('');
  const [target, setTarget] = useState('The quick brown fox jumps over the lazy dog.');
  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, errors: 0 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      calculateStats();
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const calculateStats = () => {
    const words = text.trim().split(' ').length;
    const minutes = (60 - timer) / 60;
    const wpm = Math.round(words / minutes);
    
    // Simple accuracy calculation
    const errors = [...text].filter((char, i) => char !== target[i]).length;
    const accuracy = Math.round(((text.length - errors) / text.length) * 100);
    
    setStats({ wpm, accuracy, errors });
  };

  const startTest = () => {
    setText('');
    setTimer(60);
    setIsActive(true);
    setStats({ wpm: 0, accuracy: 100, errors: 0 });
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
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="font-mono text-gray-600">{target}</p>
        </div>

        <Textarea
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

          <div className="flex gap-4">
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
