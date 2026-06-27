import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import type { ReactNode } from "react";

export interface HeroSplitProps {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  reverse?: boolean;
}

export function HeroSplit({ left, right, className, reverse = false }: HeroSplitProps) {
  return (
    <div
      className={cn(
        "grid items-center gap-12 lg:grid-cols-2",
        reverse && "lg:[&>*:first-child]:order-2",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {left}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {right}
      </motion.div>
    </div>
  );
}
