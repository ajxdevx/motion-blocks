import { motion } from "framer-motion";
import { Children, isValidElement, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  sectionClassName?: string;
  gap?: number;
  snap?: boolean;
}

export function HorizontalScroll({
  children,
  className,
  sectionClassName,
  gap = 24,
  snap = true,
}: HorizontalScrollProps) {
  const sections = Children.toArray(children).filter(isValidElement);

  return (
    <div
      className={cn(
        "flex w-full overflow-x-auto overscroll-x-contain",
        snap && "snap-x snap-mandatory scroll-smooth",
        className,
      )}
      style={{ gap }}
      role="region"
      aria-label="Horizontal scroll sections"
    >
      {sections.map((child, index) => (
        <motion.section
          key={child.key ?? index}
          className={cn(
            "min-w-[85vw] shrink-0 snap-center md:min-w-[60vw] lg:min-w-[45vw]",
            sectionClassName,
          )}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {child}
        </motion.section>
      ))}
    </div>
  );
}
