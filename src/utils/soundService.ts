
/**
 * Sound Service for handling UI sound effects
 */

// Create an audio context for better handling of audio
let audioContext: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;
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

// Preload the sound file
const preloadSound = async (soundUrl: string): Promise<boolean> => {
  if (isLoaded || isLoading) return isLoaded;
  
  try {
    isLoading = true;
    const context = initAudioContext();
    
    const response = await fetch(soundUrl);
    const arrayBuffer = await response.arrayBuffer();
    
    // Fix: Use decodeAudioData instead of decodeAudioBuffer
    audioBuffer = await new Promise<AudioBuffer>((resolve, reject) => {
      context.decodeAudioData(
        arrayBuffer,
        (buffer) => resolve(buffer),
        (err) => reject(err)
      );
    });
    
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
  if (isMuted || !audioBuffer || !audioContext) return;
  
  try {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    
    // Create a gain node to control volume
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.2; // Set volume to 20%
    
    // Connect the nodes
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Play the sound
    source.start(0);
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
