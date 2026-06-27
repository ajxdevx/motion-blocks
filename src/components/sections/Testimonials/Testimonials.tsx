import { motion } from "framer-motion";
import { ScrollReveal } from "../../ScrollReveal";
import { cn } from "../../../utils/cn";
import { staggerContainer } from "../../../utils/motionPresets";

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface TestimonialsProps {
  items: TestimonialItem[];
  className?: string;
  title?: string;
}

export function Testimonials({ items, className, title }: TestimonialsProps) {
  return (
    <section className={cn("mx-auto max-w-6xl", className)}>
      {title && (
        <ScrollReveal animation="slide-up" className="mb-12 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
        </ScrollReveal>
      )}
      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {items.map((item, index) => (
          <motion.blockquote
            key={index}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            className="rounded-2xl border border-neutral-200 bg-white p-6"
          >
            <p className="text-neutral-700">&ldquo;{item.quote}&rdquo;</p>
            <footer className="mt-4">
              <cite className="not-italic">
                <span className="font-semibold">{item.author}</span>
                <span className="block text-sm text-neutral-500">{item.role}</span>
              </cite>
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </section>
  );
}
