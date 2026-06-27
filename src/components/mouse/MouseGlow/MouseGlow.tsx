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

export interface MouseGlowProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  size?: number;
}

export function MouseGlow({
  children,
  className,
  glowColor = "rgba(139, 92, 246, 0.3)",
  size = 300,
}: MouseGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glowX = useSpring(0, { stiffness: 150, damping: 25 });
  const glowY = useSpring(0, { stiffness: 150, damping: 25 });
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (touch || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      glowX.set(event.clientX - rect.left - size / 2);
      glowY.set(event.clientY - rect.top - size / 2);
    },
    [touch, size, glowX, glowY],
  );

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
    >
      {!touch && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            x: glowX,
            y: glowY,
            width: size,
            height: size,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
