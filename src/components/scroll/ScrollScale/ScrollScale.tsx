import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface ScrollScaleProps {
  children: ReactNode;
  className?: string;
  minScale?: number;
  maxScale?: number;
}

export function ScrollScale({
  children,
  className,
  minScale = 0.85,
  maxScale = 1,
}: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [minScale, maxScale, minScale],
  );

  return (
    <motion.div ref={ref} className={cn(className)} style={{ scale }}>
      {children}
    </motion.div>
  );
}
