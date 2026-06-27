import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface HeroVideoProps {
  src: string;
  className?: string;
  overlayClassName?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export function HeroVideo({
  src,
  className,
  overlayClassName,
  autoPlay = true,
  muted = true,
  loop = true,
}: HeroVideoProps) {
  return (
    <motion.div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <video
        src={src}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        className="h-full w-full object-cover"
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent",
          overlayClassName,
        )}
      />
    </motion.div>
  );
}
