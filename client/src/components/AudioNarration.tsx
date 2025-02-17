import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface AudioNarrationProps {
  text: string;
}

export function AudioNarration({ text }: AudioNarrationProps) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = `https://api.elevenlabs.io/v1/text-to-speech/${text}`;
    }
  }, [text]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="absolute top-4 right-4">
      <audio ref={audioRef} autoPlay loop hidden />
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="w-8 h-8 text-gray-200 hover:text-white"
      >
        {isMuted ? <VolumeX /> : <Volume2 />}
      </Button>
    </div>
  );
}
