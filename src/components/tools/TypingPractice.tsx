import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Keyboard, RotateCcw, Clock, Check, X as XIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Define type for time options
type TimeOption = 60 | 180;

// Sample text for typing practice
const sampleTexts = {
  english: "The quick brown fox jumps over the lazy dog. Programming is the process of taking an algorithm and encoding it into a notation, a programming language, so that it can be executed by a computer. Although many programming languages and many different types of computers exist, the important first step is the need to have the solution.",
  nepali: "नेपाल एक सुन्दर देश हो। यहाँ हिमाल, पहाड र तराई गरी तीन भू-भाग छन्। नेपालमा विविध संस्कृति र परम्परा छन्। नेपालीहरू मिलनसार र मेहनती हुन्छन्।",
  preeti: "g]kfn Ps ;'Gb/ b]z xf] . oxfF lxdfn, kxf8 / t/fO{ u/L tLg e"–efu 5g\\ . g]kfndf ljljw ;+:s[lt / k/Dk/f 5g\\ . g]kfnLx? ldng;f/ / d]xgtL x'G5g\\ ."
};

const TypingPractice = () => {
  const [mode, setMode] = useState<string>("english");
  const [timeOption, setTimeOption] = useState<TimeOption>(60);
  const [timeLeft, setTimeLeft] = useState<number>(timeOption);
  const [currentText, setCurrentText] = useState<string>(sampleTexts.english);
  const [typedText, setTypedText] = useState<string>("");
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [errors, setErrors] = useState<number>(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Handle mode change
  const handleModeChange = (value: string) => {
    setMode(value);
    setCurrentText(sampleTexts[value as keyof typeof sampleTexts]);
    resetTest();
  };

  // Handle time option change
  const handleTimeOptionChange = (value: string) => {
    // Convert the string to a number and then to TimeOption
    const newTimeOption = Number(value) as TimeOption;
    setTimeOption(newTimeOption);
    setTimeLeft(newTimeOption);
  };

  // Start typing test
  const startTest = () => {
    setIsStarted(true);
    setIsFinished(false);
    setTypedText("");
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setTimeLeft(timeOption);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // End typing test
  const endTest = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setIsFinished(true);
    setIsStarted(false);
    
    // Calculate WPM: (typed characters / 5) / time in minutes
    const timeInMinutes = (timeOption - timeLeft) / 60;
    const words = typedText.length / 5;
    const calculatedWpm = timeInMinutes > 0 ? Math.round(words / timeInMinutes) : 0;
    setWpm(calculatedWpm);
    
    // Show completion toast
    toast({
      title: "Test Complete!",
      description: `You typed at ${calculatedWpm} WPM with ${accuracy}% accuracy.`,
    });
  }, [timeOption, timeLeft, typedText.length, accuracy, toast]);

  // Reset typing test
  const resetTest = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setIsStarted(false);
    setIsFinished(false);
    setTypedText("");
    setTimeLeft(timeOption);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
  };

  // Handle text input
  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTypedText = e.target.value;
    setTypedText(newTypedText);
    
    // Calculate accuracy and errors
    let errorCount = 0;
    for (let i = 0; i < newTypedText.length; i++) {
      if (newTypedText[i] !== currentText[i]) {
        errorCount++;
      }
    }
    
    setErrors(errorCount);
    const calculatedAccuracy = Math.max(0, Math.round(((newTypedText.length - errorCount) / Math.max(1, newTypedText.length)) * 100));
    setAccuracy(calculatedAccuracy);
    
    // Check if completed the test by typing the entire text
    if (newTypedText.length >= currentText.length) {
      endTest();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Render character with highlighting
  const renderText = () => {
    return currentText.split('').map((char, index) => {
      let className = "";
      if (index < typedText.length) {
        className = typedText[index] === char ? "text-green-500" : "text-red-500 bg-red-100";
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  // Format time to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              Typing Practice
            </CardTitle>
            <CardDescription>Improve your typing speed and accuracy</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetTest} 
              disabled={!isStarted && !isFinished}
            >
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="english" value={mode} onValueChange={handleModeChange} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="english">English</TabsTrigger>
            <TabsTrigger value="nepali">Nepali</TabsTrigger>
            <TabsTrigger value="preeti">Preeti</TabsTrigger>
          </TabsList>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Time:</span>
              <div className="flex rounded-md border border-input">
                <Button 
                  type="button" 
                  variant={timeOption === 60 ? "default" : "ghost"} 
                  size="sm" 
                  className="rounded-r-none border-r"
                  onClick={() => handleTimeOptionChange("60")}
                  disabled={isStarted}
                >
                  1:00
                </Button>
                <Button 
                  type="button" 
                  variant={timeOption === 180 ? "default" : "ghost"} 
                  size="sm" 
                  className="rounded-l-none"
                  onClick={() => handleTimeOptionChange("180")}
                  disabled={isStarted}
                >
                  3:00
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-lg font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <TabsContent value="english" className="mt-0">
            <div className="bg-gray-50 p-4 rounded-md text-lg mb-4 min-h-[120px] border">
              {renderText()}
            </div>
          </TabsContent>
          
          <TabsContent value="nepali" className="mt-0">
            <div className="bg-gray-50 p-4 rounded-md text-lg mb-4 min-h-[120px] border">
              {renderText()}
            </div>
          </TabsContent>
          
          <TabsContent value="preeti" className="mt-0">
            <div className="bg-gray-50 p-4 rounded-md text-lg mb-4 min-h-[120px] border">
              {renderText()}
            </div>
          </TabsContent>
          
          <div className="mt-4">
            <textarea
              ref={inputRef}
              value={typedText}
              onChange={handleTyping}
              disabled={!isStarted || isFinished}
              placeholder={isStarted ? "Start typing..." : "Click 'Start' to begin typing"}
              className="w-full p-2 border rounded-md h-24 focus:outline-neon-blue focus:ring-1 focus:ring-neon-blue"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </div>
        </Tabs>
        
        <div className="flex justify-center">
          {!isStarted && !isFinished && (
            <Button onClick={startTest}>Start Typing Test</Button>
          )}
        </div>
        
        {isStarted && (
          <div className="mt-4">
            <Progress value={(typedText.length / currentText.length) * 100} className="h-2" />
          </div>
        )}
        
        {isFinished && (
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{wpm}</div>
              <div className="text-xs text-gray-600">WPM</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
              <div className="text-xs text-gray-600">ACCURACY</div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{errors}</div>
              <div className="text-xs text-gray-600">ERRORS</div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center gap-2">
          {isStarted && (
            <>
              <Check className="h-4 w-4 text-green-500" /> 
              <span className="text-sm text-gray-500">Correct: {typedText.length - errors}</span>
              <XIcon className="h-4 w-4 text-red-500 ml-3" /> 
              <span className="text-sm text-gray-500">Errors: {errors}</span>
            </>
          )}
        </div>
        {isFinished && (
          <Button onClick={startTest}>Try Again</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TypingPractice;
