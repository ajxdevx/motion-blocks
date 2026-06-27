import { motion } from "framer-motion";
import { ScrollReveal } from "../../ScrollReveal";
import { cn } from "../../../utils/cn";
import { staggerContainer } from "../../../utils/motionPresets";
import type { ReactNode } from "react";

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  cta: ReactNode;
  highlighted?: boolean;
}

export interface PricingProps {
  plans: PricingPlan[];
  className?: string;
  title?: string;
}

export function Pricing({ plans, className, title }: PricingProps) {
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
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            className={cn(
              "rounded-2xl border p-8",
              plan.highlighted
                ? "border-violet-500 bg-violet-50 shadow-lg"
                : "border-neutral-200 bg-white",
            )}
          >
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-4 text-4xl font-bold">{plan.price}</p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                  <span className="text-violet-500">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8">{plan.cta}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
