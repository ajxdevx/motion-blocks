import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { staggerContainer } from "../../../utils/motionPresets";
import type { ReactNode } from "react";

export interface HeroRevealProps {
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function HeroReveal({
  title,
  subtitle,
  badge,
  actions,
  children,
  className,
}: HeroRevealProps) {
  return (
    <motion.section
      className={cn("flex flex-col items-center text-center", className)}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {badge && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          className="mb-4"
        >
          {badge}
        </motion.div>
      )}
      <motion.h1
        variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
        className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mt-4 max-w-2xl text-lg text-neutral-600"
        >
          {subtitle}
        </motion.p>
      )}
      {actions && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {actions}
        </motion.div>
      )}
      {children && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          className="mt-12 w-full"
        >
          {children}
        </motion.div>
      )}
    </motion.section>
  );
}
