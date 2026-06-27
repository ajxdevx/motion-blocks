import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../../utils/cn";
import { random } from "../../../utils/random";

export interface StarsBackgroundProps {
  count?: number;
  className?: string;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

function createPlaceholderStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i * 19) % 100,
    y: (i * 31) % 100,
    size: 1 + (i % 2),
    duration: 2 + (i % 3),
    delay: (i % 4) * 0.5,
  }));
}

export function StarsBackground({
  count = 50,
  className,
}: StarsBackgroundProps) {
  const [stars, setStars] = useState(() => createPlaceholderStars(count));

  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: random(0, 100),
        y: random(0, 100),
        size: random(1, 3),
        duration: random(1.5, 4),
        delay: random(0, 3),
      })),
    );
  }, [count]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
