import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { fadeIn } from "../../../utils/motionPresets";

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl";
}

const blurMap = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
};

export function GlassCard({ children, className, blur = "md" }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg shadow-black/5",
        blurMap[blur],
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      {children}
    </motion.div>
  );
}
