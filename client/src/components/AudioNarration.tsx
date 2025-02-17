import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface AudioNarrationProps {
  text: string;
}

export function AudioNarration({ text }: AudioNarrationProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const getAudioUrl = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/synthesize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) throw new Error('Failed to generate audio');

        const blob = await response.blob();
        if (audioRef.current) {
          audioRef.current.src = URL.createObjectURL(blob);
        }
      } catch (error) {
        console.error('Failed to generate audio:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getAudioUrl();
  }, [text]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="absolute top-4 right-4">
      <audio ref={audioRef} autoPlay={!isMuted} hidden />
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="w-8 h-8 text-gray-200 hover:text-white"
        disabled={isLoading}
      >
        {isMuted ? <VolumeX /> : <Volume2 />}
      </Button>
    </div>
  );
}