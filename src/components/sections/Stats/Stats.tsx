import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "../../ScrollReveal";
import { cn } from "../../../utils/cn";
import { staggerContainer } from "../../../utils/motionPresets";

export interface StatItem {
  label: string;
  value: string;
}

export interface StatsProps {
  stats: StatItem[];
  className?: string;
  title?: string;
}

function AnimatedStat({ label, value }: StatItem) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(value);
  const numericMatch = value.match(/^([\d,.]+)(.*)$/);
  const numericPart = numericMatch ? parseFloat(numericMatch[1].replace(/,/g, "")) : null;
  const suffix = numericMatch?.[2] ?? "";

  useMotionValueEvent(motionValue, "change", (v) => {
    setDisplay(`${Math.round(v).toLocaleString()}${suffix}`);
  });

  useEffect(() => {
    if (numericPart === null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(motionValue, numericPart, { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] });
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericPart, motionValue]);

  return (
    <div className="text-center">
      <span ref={ref} className="block text-4xl font-bold text-violet-600">
        {display}
      </span>
      <span className="mt-2 block text-sm text-neutral-500">{label}</span>
    </div>
  );
}

export function Stats({ stats, className, title }: StatsProps) {
  return (
    <section className={cn("mx-auto max-w-4xl", className)}>
      {title && (
        <ScrollReveal animation="slide-up" className="mb-12 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
        </ScrollReveal>
      )}
      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          >
            <AnimatedStat {...stat} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
