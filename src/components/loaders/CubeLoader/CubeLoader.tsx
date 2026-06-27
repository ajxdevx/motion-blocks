import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface CubeLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: 16,
  md: 28,
  lg: 40,
} as const;

export function CubeLoader({ className, size = "md" }: CubeLoaderProps) {
  const dimension = sizeMap[size];

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
      style={{ perspective: dimension * 4 }}
    >
      <motion.div
        className="border-2 border-current"
        style={{ width: dimension, height: dimension }}
        animate={{ rotateX: [0, 180, 360], rotateY: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
