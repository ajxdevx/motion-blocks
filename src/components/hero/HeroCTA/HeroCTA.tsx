import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import type { ReactNode } from "react";

export interface HeroCTAProps {
  primary?: ReactNode;
  secondary?: ReactNode;
  className?: string;
}

export function HeroCTA({ primary, secondary, className }: HeroCTAProps) {
  return (
    <motion.div
      className={cn("flex flex-wrap items-center gap-4", className)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {primary}
      {secondary}
    </motion.div>
  );
}
