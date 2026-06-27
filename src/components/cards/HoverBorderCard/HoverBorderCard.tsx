import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface HoverBorderCardProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
}

export function HoverBorderCard({
  children,
  className,
  borderColor = "from-violet-500 via-fuchsia-500 to-orange-400",
}: HoverBorderCardProps) {
  return (
    <motion.div
      className={cn("group relative rounded-2xl p-[1px]", className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          borderColor,
        )}
      />
      <div className="relative rounded-2xl border border-neutral-200/60 bg-white/80 p-6 backdrop-blur-sm transition-colors duration-300 group-hover:border-transparent">
        {children}
      </div>
    </motion.div>
  );
}
