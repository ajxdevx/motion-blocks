import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { useScrollProgress } from "../../../hooks/useScrollProgress";

export interface ScrollProgressBarProps {
  className?: string;
  barClassName?: string;
  height?: number;
  color?: string;
  position?: "top" | "bottom";
  ariaLabel?: string;
}

export function ScrollProgressBar({
  className,
  barClassName,
  height = 3,
  color = "bg-violet-500",
  position = "top",
  ariaLabel = "Scroll progress",
}: ScrollProgressBarProps) {
  const progress = useScrollProgress();

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 bg-neutral-200/30",
        position === "top" ? "top-0" : "bottom-0",
        className,
      )}
      style={{ height }}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <motion.div
        className={cn("h-full origin-left", color, barClassName)}
        style={{ scaleX: progress }}
        initial={{ scaleX: 0 }}
      />
    </div>
  );
}
