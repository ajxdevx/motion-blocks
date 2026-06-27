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

export interface MouseParallaxProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MouseParallax({
  children,
  strength = 20,
  className,
}: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (touch || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;

      x.set(relX * strength);
      y.set(relY * strength);
    },
    [touch, strength, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={touch ? undefined : { x, y }}>{children}</motion.div>
    </div>
  );
}
