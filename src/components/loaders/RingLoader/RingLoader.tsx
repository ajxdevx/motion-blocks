import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface RingLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "size-5 border-2",
  md: "size-9 border-2",
  lg: "size-14 border-[3px]",
} as const;

export function RingLoader({ className, size = "md" }: RingLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
    >
      <motion.div
        className={cn(
          "rounded-full border-current border-b-transparent border-l-transparent",
          sizeClasses[size],
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
