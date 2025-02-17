import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <Card className="w-full max-w-2xl mx-auto bg-black/80 border-gray-800">
        <CardContent className="p-6">
          <ScrollArea className="h-[200px] mb-4">
            <p className="text-gray-200 leading-relaxed text-lg">
              {text}
            </p>
          </ScrollArea>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
