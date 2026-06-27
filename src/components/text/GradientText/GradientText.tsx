import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
}

export function GradientText({
  children,
  className,
  animated = false,
}: GradientTextProps) {
  return (
    <motion.span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #8b5cf6, #d946ef, #fb923c, #8b5cf6)",
        backgroundSize: animated ? "200% auto" : "100% auto",
      }}
      animate={
        animated
          ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }
          : undefined
      }
      transition={
        animated
          ? { duration: 3, repeat: Infinity, ease: "linear" }
          : undefined
      }
    >
      {children}
    </motion.span>
  );
}
