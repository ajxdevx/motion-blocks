import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import type { ReactNode } from "react";

export interface FloatingElementProps {
  children: ReactNode;
  amplitude?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export function FloatingElement({
  children,
  amplitude = 10,
  duration = 3,
  delay = 0,
  className,
}: FloatingElementProps) {
  return (
    <motion.div
      className={cn("inline-block", className)}
      animate={{
        y: [-amplitude / 2, amplitude / 2, -amplitude / 2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
