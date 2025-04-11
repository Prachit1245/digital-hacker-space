
import { useEffect, useState } from 'react';
import { soundService } from '@/utils/soundService';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SOUND_PATH = '/assets/sounds/click.mp3'; 

const SoundController = () => {
  const [isMuted, setIsMuted] = useState(soundService.isSoundMuted());
  const [showControls, setShowControls] = useState(false);

  // Initialize audio and add listeners when component mounts
  useEffect(() => {
    // Preload the sound file
    soundService.preloadSound(SOUND_PATH).catch(error => {
      console.warn('Sound preloading failed:', error);
    });

    // Function to handle button clicks
    const handleButtonClick = () => {
      soundService.playSound();
    };

    // Initialize audio context on first user interaction
    const initializeAudio = () => {
      soundService.initAudioContext();
      document.removeEventListener('click', initializeAudio);
    };

    // Add event listener to initialize audio context
    document.addEventListener('click', initializeAudio, { once: true });

    // Add event listeners to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', handleButtonClick);
    });

    // Cleanup function
    return () => {
      document.removeEventListener('click', initializeAudio);
      buttons.forEach(button => {
        button.removeEventListener('click', handleButtonClick);
      });
    };
  }, []);

  // Toggle mute state
  const toggleMute = () => {
    const newMutedState = soundService.toggleMute();
    setIsMuted(newMutedState);
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
