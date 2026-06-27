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

export interface MouseTiltProps {
  children: ReactNode;
  maxTilt?: number;
  className?: string;
}

export function MouseTilt({ children, maxTilt = 12, className }: MouseTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
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

      rotateY.set(relX * maxTilt);
      rotateX.set(-relY * maxTilt);
    },
    [touch, maxTilt, rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      className={cn("perspective-[1000px]", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        touch
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
      }
    >
      {children}
    </motion.div>
  );
}
