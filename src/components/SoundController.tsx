
import { useEffect, useState } from 'react';
import { soundService } from '@/utils/soundService';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

// Using a default click sound from a CDN so it works immediately
const SOUND_PATH = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';

const SoundController = () => {
  const [isMuted, setIsMuted] = useState(soundService.isSoundMuted());
  const [showControls, setShowControls] = useState(false);
  const [soundInitialized, setSoundInitialized] = useState(false);

  // Initialize audio and add listeners when component mounts
  useEffect(() => {
    // Try to preload the sound file
    const initializeSound = async () => {
      try {
        // Initialize audio context early to handle user gesture requirements
        soundService.initAudioContext();
        
        // Preload the sound file
        const loaded = await soundService.preloadSound(SOUND_PATH);
        setSoundInitialized(loaded);
        
        if (loaded) {
          // Only show toast if sound loads successfully
          toast({
            title: "Sound enabled",
            description: "Click buttons to hear feedback. Use the sound toggle in the corner to mute.",
            duration: 3000,
          });
        }
      } catch (error) {
        console.warn('Sound initialization failed:', error);
      }
    };

    initializeSound();

    // Function to handle button clicks
    const handleButtonClick = () => {
      soundService.playSound();
    };

    // Add event listeners to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', handleButtonClick);
    });

    // Cleanup function
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', handleButtonClick);
      });
    };
  }, []);

  // Toggle mute state
  const toggleMute = () => {
    const newMutedState = soundService.toggleMute();
    setIsMuted(newMutedState);
    
    toast({
      title: newMutedState ? "Sound muted" : "Sound unmuted",
      duration: 2000,
    });
  };

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 opacity-60 hover:opacity-100 transition-opacity" 
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Button 
        variant="outline" 
        size="icon"
        onClick={toggleMute}
        className="bg-background/80 backdrop-blur-sm"
        title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </Button>
    </div>
  );
};

export default SoundController;
