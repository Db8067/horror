import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AudioNarration } from "./AudioNarration";
import { useState, useEffect } from "react";

interface StoryCardProps {
  text: string;
  children: React.ReactNode;
}

export function StoryCard({ text, children }: StoryCardProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(false);
    setDisplayedText("");

    let currentIndex = 0;
    const chars = text.split("");

    const interval = setInterval(() => {
      if (currentIndex < chars.length) {
        setDisplayedText(prev => prev + chars[currentIndex]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 50); // Adjust speed here (milliseconds per character)

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto bg-black/80 border-gray-800 relative">
        <AudioNarration text={displayedText} />
        <CardContent className="p-6">
          <ScrollArea className="h-[200px] mb-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={displayedText}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-gray-200 leading-relaxed text-lg"
              >
                {displayedText}
              </motion.p>
            </AnimatePresence>
          </ScrollArea>

          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}