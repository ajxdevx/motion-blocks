import { motion } from "framer-motion";
import { ScrollReveal } from "../../ScrollReveal";
import { cn } from "../../../utils/cn";

export interface TimelineItem {
  title: string;
  description: string;
  date: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  title?: string;
}

export function Timeline({ items, className, title }: TimelineProps) {
  return (
    <section className={cn("mx-auto max-w-2xl", className)}>
      {title && (
        <ScrollReveal animation="slide-up" className="mb-12 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
        </ScrollReveal>
      )}
      <div className="relative space-y-8 border-l-2 border-violet-200 pl-8">
        {items.map((item, index) => (
          <ScrollReveal key={index} animation="slide-up" delay={index * 0.08}>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="absolute -left-[calc(2rem+5px)] top-1 h-3 w-3 rounded-full bg-violet-500" />
              <time className="text-xs font-medium uppercase tracking-wider text-violet-600">
                {item.date}
              </time>
              <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{item.description}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
