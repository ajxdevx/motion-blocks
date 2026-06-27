import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import type { ReactNode } from "react";

export type AnimatedCardIntensity = "subtle" | "medium" | "strong";

export interface AnimatedCardProps {
  children: ReactNode;
  hover?: boolean;
  intensity?: AnimatedCardIntensity;
  className?: string;
}

const intensityConfig: Record<
  AnimatedCardIntensity,
  { y: number; scale: number; shadow: string }
> = {
  subtle: {
    y: -4,
    scale: 1.01,
    shadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
  },
  medium: {
    y: -8,
    scale: 1.02,
    shadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
  },
  strong: {
    y: -12,
    scale: 1.03,
    shadow: "0 24px 56px rgba(0, 0, 0, 0.16)",
  },
};

export function AnimatedCard({
  children,
  hover = true,
  intensity = "medium",
  className,
}: AnimatedCardProps) {
  const config = intensityConfig[intensity];

  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-neutral-200/60 bg-white/80 p-6 backdrop-blur-sm transition-shadow",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={
        hover
          ? {
              y: config.y,
              scale: config.scale,
              boxShadow: config.shadow,
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
