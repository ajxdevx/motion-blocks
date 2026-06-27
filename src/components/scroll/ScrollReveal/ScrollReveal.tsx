import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { motionPresetMap } from "../../../utils/motionPresets";
import type { MotionPreset } from "../../../utils/motionPresets";

export interface ScrollRevealProps {
  children: ReactNode;
  animation?: MotionPreset;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  animation = "slide-up",
  delay = 0,
  duration = 0.6,
  once = true,
  className,
}: ScrollRevealProps) {
  const variants = motionPresetMap[animation];

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
