import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AudioNarrationProps {
  text: string;
}

export function AudioNarration({ text }: AudioNarrationProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

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
            try {
              await audioRef.current.play();
            } catch (playError) {
              console.error('Playback error:', playError);
              toast({
                title: "Audio Playback Failed",
                description: "Please click the audio icon to try again.",
                variant: "destructive",
              });
            }
          }
        }
      } catch (error) {
        console.error('Failed to generate audio:', error);
        const errorMessage = error instanceof Error ? error.message : 'Audio narration unavailable';
        setError(errorMessage);
        toast({
          title: "Audio Narration Issue",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (text && !isMuted) {
      getAudioUrl();
    }
  }, [text, isMuted, toast]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted && !audioRef.current.src) {
        // If unmuting and no audio loaded, try to load it
        setIsMuted(false);
      } else {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      {error && (
        <span className="text-sm text-red-400 bg-black/50 px-2 py-1 rounded">
          {error}
        </span>
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
        className="w-8 h-8 text-gray-200 hover:text-white bg-black/50"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}