import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface StoryChoiceProps {
  text: string;
  onClick: () => void;
  index: number;
}

export function StoryChoice({ text, onClick, index }: StoryChoiceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Button
        variant="outline"
        className="w-full mb-2 text-left h-auto py-4 text-gray-200 bg-gray-900/50 hover:bg-gray-800/50 border-gray-700"
        onClick={onClick}
      >
        {text}
      </Button>
    </motion.div>
  );
}
