import { motion } from "framer-motion";
import { ScrollReveal } from "../../ScrollReveal";
import { cn } from "../../../utils/cn";
import { staggerContainer } from "../../../utils/motionPresets";
import type { ReactNode } from "react";

export interface FeatureItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface FeaturesProps {
  items: FeatureItem[];
  className?: string;
  title?: string;
}

export function Features({ items, className, title }: FeaturesProps) {
  return (
    <section className={cn("mx-auto max-w-6xl", className)}>
      {title && (
        <ScrollReveal animation="slide-up" className="mb-12 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
        </ScrollReveal>
      )}
      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            className="rounded-2xl border border-neutral-200 bg-white p-6"
          >
            {item.icon && <div className="mb-4 text-violet-600">{item.icon}</div>}
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
