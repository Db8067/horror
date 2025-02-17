import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2 } from "lucide-react";

interface AudioNarrationProps {
  text: string;
}

export function AudioNarration({ text }: AudioNarrationProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const getAudioUrl = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/synthesize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate audio');
        }

        const blob = await response.blob();
        if (audioRef.current) {
          audioRef.current.src = URL.createObjectURL(blob);
          if (!isMuted) {
            await audioRef.current.play();
          }
        }
      } catch (error) {
        console.error('Failed to generate audio:', error);
        setError('Audio narration unavailable');
      } finally {
        setIsLoading(false);
      }
    };

    getAudioUrl();
  }, [text, isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      {error && (
        <span className="text-sm text-red-400">{error}</span>
      )}
      <audio 
        ref={audioRef} 
        autoPlay={!isMuted} 
        onError={() => setError('Audio playback failed')}
        hidden 
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="w-8 h-8 text-gray-200 hover:text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isMuted ? (
          <VolumeX />
        ) : (
          <Volume2 />
        )}
      </Button>
    </div>
  );
}