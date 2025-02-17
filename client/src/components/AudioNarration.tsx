import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface AudioNarrationProps {
  text: string;
}

export function AudioNarration({ text }: AudioNarrationProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!window.speechSynthesis) return;

    // Cancel any ongoing speech when text changes
    window.speechSynthesis.cancel();
    speechRef.current = new SpeechSynthesisUtterance(text);

    // Set a spooky voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('daniel') || // Deep voice
      voice.name.toLowerCase().includes('google us english male')
    );

    if (preferredVoice) {
      speechRef.current.voice = preferredVoice;
    }

    // Adjust for horror atmosphere
    speechRef.current.rate = 0.9; // Slightly slower
    speechRef.current.pitch = 0.8; // Deeper voice
    speechRef.current.volume = 0.8;

    speechRef.current.onend = () => {
      setIsPlaying(false);
    };

    if (!isMuted) {
      window.speechSynthesis.speak(speechRef.current);
      setIsPlaying(true);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, isMuted]);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (speechRef.current) {
        window.speechSynthesis.speak(speechRef.current);
        setIsPlaying(true);
      }
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