import { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils/cn";
import { clamp } from "../../../utils/clamp";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

export interface CountUpProps {
  value: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  value,
  from = 0,
  duration = 2000,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(from);
  const [ref, isVisible] = useIntersectionObserver<HTMLSpanElement>({
    threshold: 0.3,
    freezeOnceVisible: true,
  });
  const hasAnimated = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !isVisible || hasAnimated.current) return;

    hasAnimated.current = true;
    const startTime = performance.now();
    const delta = value - from;

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = clamp(elapsed / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(from + delta * eased);

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
  }, [duration, from, isVisible, value]);

  const formatted = Number.isInteger(value)
    ? Math.round(displayValue).toLocaleString()
    : displayValue.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
