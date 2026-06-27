import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "../../../hooks/useMousePosition";
import { cn } from "../../../utils/cn";
import { isTouchDevice } from "../../../utils/viewportHelpers";

export interface CursorTrailProps {
  className?: string;
  dotCount?: number;
  dotSize?: number;
  color?: string;
}

export function CursorTrail({
  className,
  dotCount = 8,
  dotSize = 6,
  color = "rgba(139, 92, 246, 0.6)",
}: CursorTrailProps) {
  const { x, y } = useMousePosition();
  const [touch, setTouch] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    setTouch(isTouchDevice());
  }, []);

  useEffect(() => {
    if (touch) return;

    setTrail((prev) => {
      const next = [{ x, y }, ...prev];
      return next.slice(0, dotCount);
    });
  }, [x, y, dotCount, touch]);

  if (touch) return null;

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-[9997]", className)}>
      {trail.map((point, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: point.x - dotSize / 2,
            top: point.y - dotSize / 2,
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
            opacity: 1 - index / dotCount,
          }}
          initial={false}
          animate={{ scale: 1 - index * 0.08 }}
          transition={{ duration: 0.1 }}
        />
      ))}
    </div>
  );
}
