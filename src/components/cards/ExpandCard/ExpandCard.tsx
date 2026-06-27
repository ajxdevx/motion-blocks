import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { scaleIn } from "../../../utils/motionPresets";

export interface ExpandCardProps {
  children: ReactNode;
  className?: string;
  expandScale?: number;
}

export function ExpandCard({
  children,
  className,
  expandScale = 1.05,
}: ExpandCardProps) {
  return (
    <motion.div
      className={cn(
        "origin-center overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/80 p-6 backdrop-blur-sm",
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={scaleIn}
      whileHover={{
        scale: expandScale,
        boxShadow: "0 24px 56px rgba(0, 0, 0, 0.14)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}
