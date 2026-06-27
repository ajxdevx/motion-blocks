import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../../utils/cn";

export interface RotatingWordsProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function RotatingWords({
  words,
  interval = 3000,
  className,
}: RotatingWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || words.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  if (words.length === 0) return null;

  const currentWord = words[index] ?? words[0];

  return (
    <span
      className={cn("relative inline-flex overflow-hidden align-bottom", className)}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
