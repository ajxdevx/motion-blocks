import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface BlurTextRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

export function BlurTextReveal({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  className,
}: BlurTextRevealProps) {
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial={{ opacity: 0, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.4 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.span>
  );
}
