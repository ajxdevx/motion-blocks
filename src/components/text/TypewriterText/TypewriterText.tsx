import { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils/cn";

export interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  loop = false,
  className,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [mounted, setMounted] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;

    indexRef.current = 0;
    setDisplayed("");

    const typeNext = () => {
      const nextIndex = indexRef.current + 1;
      setDisplayed(text.slice(0, nextIndex));
      indexRef.current = nextIndex;

      if (nextIndex < text.length) {
        timeoutRef.current = setTimeout(typeNext, speed);
      } else if (loop) {
        timeoutRef.current = setTimeout(() => {
          indexRef.current = 0;
          setDisplayed("");
          timeoutRef.current = setTimeout(typeNext, speed);
        }, speed * 4);
      }
    };

    timeoutRef.current = setTimeout(typeNext, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, delay, loop, mounted]);

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {mounted ? displayed : text}
      <span className="sr-only">{text}</span>
    </span>
  );
}
