import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  size?: "sm" | "md" | "lg";
}

const sizeHeights = {
  sm: "h-3",
  md: "h-4",
  lg: "h-6",
} as const;

export function Skeleton({
  className,
  width = "100%",
  height,
  size = "md",
}: SkeletonProps) {
  return (
    <div role="status" aria-label="Loading" className={cn("inline-block", className)}>
      <motion.div
        className={cn(
          "rounded-md bg-current/10",
          !height && sizeHeights[size],
        )}
        style={{
          width,
          ...(height !== undefined ? { height } : {}),
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
