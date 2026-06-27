import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface PulseLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const dotSizes = {
  sm: "size-2",
  md: "size-3",
  lg: "size-4",
} as const;

const containerSizes = {
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2",
} as const;

export function PulseLoader({ className, size = "md" }: PulseLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-flex items-center justify-center",
        containerSizes[size],
        className,
      )}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={cn("rounded-full bg-current", dotSizes[size])}
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
