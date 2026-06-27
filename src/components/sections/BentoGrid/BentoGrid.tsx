import { motion } from "framer-motion";
import { ScrollReveal } from "../../ScrollReveal";
import { cn } from "../../../utils/cn";
import { staggerContainer } from "../../../utils/motionPresets";
import type { ReactNode } from "react";

export interface BentoGridItem {
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  className?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

export interface BentoGridProps {
  items?: BentoGridItem[];
  children?: ReactNode;
  className?: string;
}

export function BentoGrid({ items, children, className }: BentoGridProps) {
  if (children) {
    return (
      <ScrollReveal animation="fade" className={cn("mx-auto max-w-6xl", className)}>
        <div className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-3">
          {children}
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal animation="fade" className={cn("mx-auto max-w-6xl", className)}>
      <motion.div
        className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {items?.map((item, index) => (
          <motion.div
            key={index}
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
            className={cn(
              "rounded-2xl border border-neutral-200 bg-white p-6",
              item.colSpan === 2 && "md:col-span-2",
              item.rowSpan === 2 && "md:row-span-2",
              item.className,
            )}
          >
            {item.content ?? (
              <>
                {item.title && <h3 className="text-lg font-semibold">{item.title}</h3>}
                {item.description && (
                  <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                )}
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    </ScrollReveal>
  );
}
