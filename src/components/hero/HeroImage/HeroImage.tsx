import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

export function HeroImage({ src, alt, className, delay = 0.2 }: HeroImageProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn("w-full rounded-2xl object-cover shadow-2xl", className)}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    />
  );
}
