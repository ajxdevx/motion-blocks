import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../../utils/cn";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

export interface NumberTickerProps {
  value: number;
  duration?: number;
  className?: string;
}

function formatDigits(num: number): string[] {
  return Math.round(num).toLocaleString().split("");
}

export function NumberTicker({
  value,
  duration = 1500,
  className,
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [ref, isVisible] = useIntersectionObserver<HTMLSpanElement>({
    threshold: 0.3,
    freezeOnceVisible: true,
  });
  const hasAnimated = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !isVisible || hasAnimated.current) return;

    hasAnimated.current = true;
    const start = performance.now();

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, isVisible, value]);

  const digits = useMemo(() => formatDigits(displayValue), [displayValue]);

  return (
    <span
      ref={ref}
      className={cn("inline-flex items-center tabular-nums", className)}
      aria-label={String(value)}
    >
      {digits.map((digit, index) => (
        <span
          key={`${index}-${digit}`}
          className="relative inline-block h-[1em] w-[0.6em] overflow-hidden"
          aria-hidden="true"
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={`${index}-${digit}`}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}
