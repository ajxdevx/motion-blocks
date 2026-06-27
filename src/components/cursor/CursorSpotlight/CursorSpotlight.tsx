import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "../../../hooks/useMousePosition";
import { cn } from "../../../utils/cn";
import { isTouchDevice } from "../../../utils/viewportHelpers";

export interface CursorSpotlightProps {
  className?: string;
  size?: number;
}

export function CursorSpotlight({ className, size = 400 }: CursorSpotlightProps) {
  const { x, y } = useMousePosition();
  const springX = useSpring(0, { stiffness: 100, damping: 30 });
  const springY = useSpring(0, { stiffness: 100, damping: 30 });
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
      className={cn("pointer-events-none fixed left-0 top-0 z-[9996]", className)}
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        background:
          "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
      }}
    />
  );
}
