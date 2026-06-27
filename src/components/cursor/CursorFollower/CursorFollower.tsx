import { motion, useSpring } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { useMousePosition } from "../../../hooks/useMousePosition";
import { cn } from "../../../utils/cn";
import { isTouchDevice } from "../../../utils/viewportHelpers";

export interface CursorFollowerProps {
  children?: ReactNode;
  className?: string;
  size?: number;
}

export function CursorFollower({ children, className, size = 24 }: CursorFollowerProps) {
  const { x, y } = useMousePosition();
  const springX = useSpring(0, { stiffness: 300, damping: 28 });
  const springY = useSpring(0, { stiffness: 300, damping: 28 });
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
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference",
        className,
      )}
      style={{ x: springX, y: springY, width: size, height: size }}
    >
      {children ?? (
        <div className="h-full w-full rounded-full border-2 border-white" />
      )}
    </motion.div>
  );
}
