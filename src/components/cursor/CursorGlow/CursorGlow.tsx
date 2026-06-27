import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "../../../hooks/useMousePosition";
import { cn } from "../../../utils/cn";
import { isTouchDevice } from "../../../utils/viewportHelpers";

export interface CursorGlowProps {
  className?: string;
  size?: number;
  color?: string;
}

export function CursorGlow({
  className,
  size = 200,
  color = "rgba(139, 92, 246, 0.25)",
}: CursorGlowProps) {
  const { x, y } = useMousePosition();
  const springX = useSpring(0, { stiffness: 150, damping: 25 });
  const springY = useSpring(0, { stiffness: 150, damping: 25 });
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
  }, []);

  useEffect(() => {
    springX.set(x - size / 2);
    springY.set(y - size / 2);
  }, [x, y, size, springX, springY]);

  if (touch) return null;

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none fixed left-0 top-0 z-[9998]", className)}
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}
