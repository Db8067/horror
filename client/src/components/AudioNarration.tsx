import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface AudioNarrationProps {
  text: string;
}

export function AudioNarration({ text }: AudioNarrationProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const speechQueue = useRef<string[]>([]);
  const isProcessing = useRef(false);

  // Process the speech queue
  const processQueue = async () => {
    if (isProcessing.current || isMuted || !window.speechSynthesis) return;
    if (currentWordIndex >= words.length) return;

    isProcessing.current = true;
    const word = words[currentWordIndex];

    const utterance = new SpeechSynthesisUtterance(word);

    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('samantha') || 
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('google us english female')
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    // Adjust for horror atmosphere
    utterance.rate = 0.9;    // Slightly slower
    utterance.pitch = 1.0;   // Normal pitch for female voice
    utterance.volume = 0.8;  // Slightly quieter

    utterance.onend = () => {
      isProcessing.current = false;
      setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
      }, 300); // 300ms pause between words
    };

    utterance.onerror = () => {
      isProcessing.current = false;
      setCurrentWordIndex(prev => prev + 1);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Reset when text changes
  useEffect(() => {
    window.speechSynthesis?.cancel();
    setCurrentWordIndex(0);
    isProcessing.current = false;
    speechQueue.current = [];
  }, [text]);

  // Process next word when current one finishes
  useEffect(() => {
    if (!isMuted) {
      processQueue();
    }
  }, [currentWordIndex, isMuted]);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      // Resume from current word
      processQueue();
    } else {
      setIsMuted(true);
      window.speechSynthesis?.cancel();
      isProcessing.current = false;
    }
  };

  if (!window.speechSynthesis) return null;

  return (
    <div className="absolute top-4 right-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="w-8 h-8 text-gray-200 hover:text-white bg-black/50"
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}