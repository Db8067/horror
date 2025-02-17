import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StoryCard } from "@/components/StoryCard";
import { StoryChoice } from "@/components/StoryChoice";
import { StoryProgress } from "@/components/StoryProgress";
import { BackgroundImage } from "@/components/BackgroundImage";
import { getStoryNode, isValidChoice } from "@/lib/story";
import { useLocation } from "wouter";
import type { StoryNode } from "@shared/schema";

export default function StoryPage() {
  const [currentNode, setCurrentNode] = useState<StoryNode>("start");
  const [choices, setChoices] = useState<string[]>([]);
  const [_, navigate] = useLocation();

  const node = getStoryNode(currentNode);

  // Handle navigation
  useEffect(() => {
    if (!node) {
      navigate("/");
      return;
    }

    if (node.choices.length === 1 && node.choices[0].id === "stories") {
      const timer = setTimeout(() => navigate("/stories"), 5000);
      return () => clearTimeout(timer);
    }

    if (node.choices.length === 1 && node.choices[0].id === "browse") {
      navigate("/stories");
    }
  }, [currentNode, navigate, node]);

  const handleChoice = (choice: string) => {
    if (isValidChoice(currentNode, choice)) {
      setCurrentNode(choice);
      setChoices(prev => [...prev, choice]);
    }
  };

  // Show loading or redirect if no valid node
  if (!node) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <BackgroundImage src={node.image} alt="Story scene" />

      <div className="w-full max-w-4xl mx-auto">
        <StoryProgress value={(choices.length / 10) * 100} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentNode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StoryCard text={node.text}>
              <div className="space-y-2">
                {node.choices.map((choice, index) => (
                  <StoryChoice
                    key={choice.id}
                    text={choice.text}
                    onClick={() => handleChoice(choice.id)}
                    index={index}
                  />
                ))}
              </div>
            </StoryCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}