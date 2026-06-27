import { motion, useSpring } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "../../../utils/cn";
import { isTouchDevice } from "../../../utils/viewportHelpers";

export interface MagneticCursorProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticCursor({
  children,
  strength = 0.35,
  className,
}: MagneticCursorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (touch || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x.set((event.clientX - centerX) * strength);
      y.set((event.clientY - centerY) * strength);
    },
    [touch, strength, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={touch ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
