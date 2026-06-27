import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface WaveLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const barSizes = {
  sm: "h-4 w-0.5",
  md: "h-6 w-1",
  lg: "h-8 w-1.5",
} as const;

const containerSizes = {
  sm: "gap-0.5",
  md: "gap-1",
  lg: "gap-1.5",
} as const;

export function WaveLoader({ className, size = "md" }: WaveLoaderProps) {
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
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className={cn("rounded-full bg-current", barSizes[size])}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          style={{ originY: 0.5 }}
        />
      ))}
    </div>
  );
}
