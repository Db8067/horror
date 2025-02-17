import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { BackgroundImage } from "@/components/BackgroundImage";

export default function HomePage() {
  const [_, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <BackgroundImage 
        src="https://images.unsplash.com/photo-1503925802536-c9451dcd87b5"
        alt="Spooky mansion at night"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-100 mb-6">
          The Haunted Mansion
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
          Dare to explore the dark secrets within these walls?
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/story")}
          className="bg-red-900 hover:bg-red-800 text-white"
        >
          Begin Your Journey
        </Button>
      </motion.div>
    </div>
  );
}