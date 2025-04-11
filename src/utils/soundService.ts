
/**
 * Sound Service for handling UI sound effects
 */

// Create an audio context for better handling of audio
let audioContext: AudioContext | null = null;
let clickSound: HTMLAudioElement | null = null;
let isMuted = false;
let isLoaded = false;
let isLoading = false;

// Initialize the audio context on first user interaction
const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Using a simpler approach with HTML5 Audio
const preloadSound = async (soundUrl: string): Promise<boolean> => {
  if (isLoaded || isLoading) return isLoaded;
  
  try {
    isLoading = true;
    // Initialize audio context (needed for future Web Audio API usage)
    initAudioContext();
    
    // Create and load the audio element
    clickSound = new Audio(soundUrl);
    
    // Return a promise that resolves when the audio is loaded
    await new Promise<void>((resolve, reject) => {
      if (!clickSound) return reject(new Error('Audio element not created'));
      
      clickSound.addEventListener('canplaythrough', () => resolve(), { once: true });
      clickSound.addEventListener('error', (e) => reject(e), { once: true });
      
      // Start loading the audio
      clickSound.load();
    });
    
    // Set volume to a subtle level
    if (clickSound) {
      clickSound.volume = 0.2;
    }
    
    isLoaded = true;
    isLoading = false;
    return true;
  } catch (error) {
    console.warn('Failed to load sound effect:', error);
    isLoading = false;
    return false;
  }
};

// Play the sound effect
const playSound = () => {
  if (isMuted || !clickSound) return;
  
  try {
    // Clone the audio to allow for rapid successive clicks
    const soundToPlay = clickSound.cloneNode() as HTMLAudioElement;
    soundToPlay.volume = 0.2; // Set volume to 20%
    soundToPlay.play().catch(err => console.warn('Error playing sound:', err));
  } catch (error) {
    console.warn('Error playing sound:', error);
  }
};

// Toggle mute state
const toggleMute = (): boolean => {
  isMuted = !isMuted;
  return isMuted;
};

// Get current mute state
const isSoundMuted = (): boolean => {
  return isMuted;
};

export const soundService = {
  preloadSound,
  playSound,
  toggleMute,
  isSoundMuted,
  initAudioContext
};
