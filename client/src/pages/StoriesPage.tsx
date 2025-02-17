import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

const stories = [
  {
    id: "haunted-mansion",
    title: "The Haunted Mansion",
    description: "Explore the dark secrets within these haunted walls...",
    image: "https://images.unsplash.com/photo-1503925802536-c9451dcd87b5"
  },
  {
    id: "asylum",
    title: "Abandoned Asylum",
    description: "The screams still echo through these halls...",
    image: "https://images.unsplash.com/photo-1635774855317-edf3ee4463db"
  },
  {
    id: "forest",
    title: "The Dark Forest",
    description: "Some who enter never return...",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
  }
];

export default function StoriesPage() {
  const [_, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-black/95 py-12 px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-100 mb-8 text-center">
          Choose Your Nightmare
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="group cursor-pointer bg-gray-900/50 border-gray-800 overflow-hidden"
                onClick={() => navigate("/story")}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <motion.img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                </div>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold text-gray-100 mb-2">
                    {story.title}
                  </h2>
                  <p className="text-gray-400">
                    {story.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
