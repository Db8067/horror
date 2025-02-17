import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AudioNarration } from "./AudioNarration";

interface StoryCardProps {
  text: string;
  children: React.ReactNode;
}

export function StoryCard({ text, children }: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto bg-black/80 border-gray-800 relative">
        <AudioNarration text={text} />
        <CardContent className="p-6">
          <ScrollArea className="h-[200px] mb-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-200 leading-relaxed text-lg"
              >
                {text.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.03, delay: index * 0.03 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>
          </ScrollArea>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}