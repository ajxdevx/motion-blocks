import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface DotsLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const dotSizes = {
  sm: "size-1.5",
  md: "size-2.5",
  lg: "size-3.5",
} as const;

const containerSizes = {
  sm: "gap-1 h-4",
  md: "gap-1.5 h-6",
  lg: "gap-2 h-8",
} as const;

export function DotsLoader({ className, size = "md" }: DotsLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-flex items-end justify-center",
        containerSizes[size],
        className,
      )}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={cn("rounded-full bg-current", dotSizes[size])}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
