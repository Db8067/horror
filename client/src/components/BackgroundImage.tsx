import { motion } from "framer-motion";

interface BackgroundImageProps {
  src: string;
  alt: string;
}

export function BackgroundImage({ src, alt }: BackgroundImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 -z-10"
    >
      <div className="absolute inset-0 bg-black/60" />
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
