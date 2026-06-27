import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "../../../hooks/useMousePosition";
import { cn } from "../../../utils/cn";
import { isTouchDevice } from "../../../utils/viewportHelpers";

export interface CursorTextProps {
  text: string;
  className?: string;
  offset?: { x: number; y: number };
}

export function CursorText({
  text,
  className,
  offset = { x: 16, y: 16 },
}: CursorTextProps) {
  const { x, y } = useMousePosition();
  const springX = useSpring(0, { stiffness: 300, damping: 30 });
  const springY = useSpring(0, { stiffness: 300, damping: 30 });
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
  }, []);

  useEffect(() => {
    springX.set(x + offset.x);
    springY.set(y + offset.y);
  }, [x, y, offset.x, offset.y, springX, springY]);

  if (touch) return null;

  return (
    <motion.span
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[9999] text-xs font-medium uppercase tracking-wider text-violet-600",
        className,
      )}
      style={{ x: springX, y: springY }}
    >
      {text}
    </motion.span>
  );
}
