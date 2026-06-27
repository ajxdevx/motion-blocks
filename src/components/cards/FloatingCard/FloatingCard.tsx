import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  hoverLift?: number;
}

export function FloatingCard({
  children,
  className,
  amplitude = 6,
  duration = 4,
  hoverLift = -8,
}: FloatingCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-neutral-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm",
        className,
      )}
      animate={{
        y: [-amplitude / 2, amplitude / 2, -amplitude / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        y: hoverLift,
        boxShadow: "0 20px 48px rgba(0, 0, 0, 0.12)",
        scale: 1.02,
      }}
    >
      {children}
    </motion.div>
  );
}
