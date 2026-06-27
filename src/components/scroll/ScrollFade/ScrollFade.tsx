import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
  fadeInStart?: number;
  fadeInEnd?: number;
  fadeOutStart?: number;
  fadeOutEnd?: number;
}

export function ScrollFade({
  children,
  className,
  fadeInStart = 0,
  fadeInEnd = 0.3,
  fadeOutStart = 0.7,
  fadeOutEnd = 1,
}: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0],
  );

  return (
    <motion.div ref={ref} className={cn(className)} style={{ opacity }}>
      {children}
    </motion.div>
  );
}
