import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ScrollReveal } from "../../ScrollReveal";
import { cn } from "../../../utils/cn";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FAQItem[];
  className?: string;
  title?: string;
}

export function FAQ({ items, className, title }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={cn("mx-auto max-w-3xl", className)}>
      {title && (
        <ScrollReveal animation="slide-up" className="mb-8 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
        </ScrollReveal>
      )}
      <div className="space-y-3">
        {items.map((item, index) => (
          <ScrollReveal key={index} animation="slide-up" delay={index * 0.05}>
            <div className="rounded-xl border border-neutral-200 bg-white">
              <button
                type="button"
                className="flex w-full items-center justify-between px-5 py-4 text-left font-medium"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                {item.question}
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  className="text-xl text-neutral-400"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-neutral-600">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
