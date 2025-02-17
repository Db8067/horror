import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface AudioNarrationProps {
  text: string;
}

export function AudioNarration({ text }: AudioNarrationProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = text.split(" ");
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!window.speechSynthesis) return;

    // Reset when text changes
    window.speechSynthesis.cancel();
    setCurrentWordIndex(0);
    setIsPlaying(false);

    const speakNextWord = () => {
      if (currentWordIndex >= words.length || isMuted) return;

      speechRef.current = new SpeechSynthesisUtterance(words[currentWordIndex]);

      // Get available voices and select a female voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('samantha') || // MacOS female voice
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('google us english female')
      );

      if (femaleVoice) {
        speechRef.current.voice = femaleVoice;
      }

      // Adjust for horror atmosphere
      speechRef.current.rate = 0.9; // Slightly slower
      speechRef.current.pitch = 1.0; // Normal pitch for female voice
      speechRef.current.volume = 0.8;

      speechRef.current.onend = () => {
        // Small pause between words
        setTimeout(() => {
          setCurrentWordIndex(prev => prev + 1);
        }, 200); // Adjust pause duration between words here
      };

      window.speechSynthesis.speak(speechRef.current);
      setIsPlaying(true);
    };

    if (!isMuted) {
      speakNextWord();
    }

  }, [text, currentWordIndex, isMuted, words]);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      // Resume from current word
      setCurrentWordIndex(prev => prev);
    } else {
      setIsMuted(true);
      window.speechSynthesis.cancel();
      setIsPlaying(false);
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