import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { staggerContainer } from "../../../utils/motionPresets";
import type { ReactNode } from "react";

export interface HeroCardItem {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
}

export interface HeroCardsProps {
  items: HeroCardItem[];
  className?: string;
}

export function HeroCards({ items, className }: HeroCardsProps) {
  return (
    <motion.div
      className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          className="rounded-2xl border border-neutral-200/60 bg-white/80 p-6 backdrop-blur-sm"
        >
          {item.icon && <div className="mb-4 text-violet-600">{item.icon}</div>}
          <h3 className="text-lg font-semibold">{item.title}</h3>
          {item.description && (
            <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
