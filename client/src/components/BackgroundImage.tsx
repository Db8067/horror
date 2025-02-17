import { motion, AnimatePresence } from "framer-motion";

interface BackgroundImageProps {
  src: string;
  alt: string;
  isVideo?: boolean;
}

export function BackgroundImage({ src, alt, isVideo = false }: BackgroundImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 -z-10"
    >
      <div className="absolute inset-0 bg-black/60" />
      <AnimatePresence mode="wait">
        {isVideo ? (
          <motion.video
            key="video"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <source src={src} type="video/mp4" />
          </motion.video>
        ) : (
          <motion.img
            key="image"
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}