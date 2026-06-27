import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../../utils/cn";
import { randomItem } from "../../../utils/random";

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export interface ScrambleTextProps {
  text: string;
  characters?: string;
  duration?: number;
  triggerOnHover?: boolean;
  className?: string;
}

export function ScrambleText({
  text,
  characters = DEFAULT_CHARACTERS,
  duration = 800,
  triggerOnHover = false,
  className,
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const scramble = useCallback(() => {
    if (typeof window === "undefined") return;

    const charPool = characters.split("");

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const revealedCount = Math.floor(progress * text.length);

      const next = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < revealedCount) return char;
          return randomItem(charPool);
        })
        .join("");

      setDisplayed(next);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayed(text);
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [characters, duration, text]);

  useEffect(() => {
    if (!triggerOnHover) {
      scramble();
    }

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scramble, triggerOnHover, text]);

  const hoverHandlers = triggerOnHover
    ? {
        onMouseEnter: scramble,
        onFocus: scramble,
      }
    : undefined;

  return (
    <span
      className={cn("inline-block font-mono", className)}
      aria-label={text}
      tabIndex={triggerOnHover ? 0 : undefined}
      {...hoverHandlers}
    >
      {displayed}
    </span>
  );
}
