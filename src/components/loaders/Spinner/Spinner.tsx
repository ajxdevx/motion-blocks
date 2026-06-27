import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "size-4 border-2",
  md: "size-8 border-2",
  lg: "size-12 border-[3px]",
} as const;

export function Spinner({ className, size = "md" }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
    >
      <motion.div
        className={cn(
          "rounded-full border-current border-t-transparent",
          sizeClasses[size],
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
