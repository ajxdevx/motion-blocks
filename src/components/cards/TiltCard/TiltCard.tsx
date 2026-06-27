import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

export function TiltCard({
  children,
  className,
  maxTilt = 12,
  perspective = 1000,
  scale = 1.02,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 30 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      rotateY.set(((x - centerX) / centerX) * maxTilt);
      rotateX.set(((centerY - y) / centerY) * maxTilt);
    },
    [maxTilt, rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const shadowX = useTransform(springRotateY, [-maxTilt, maxTilt], [8, -8]);
  const shadowY = useTransform(springRotateX, [-maxTilt, maxTilt], [-8, 8]);
  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([x, y]) => `${x}px ${y}px 32px rgba(0, 0, 0, 0.12)`,
  );

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-2xl border border-neutral-200/60 bg-white/80 p-6 backdrop-blur-sm",
        className,
      )}
      style={{
        perspective,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        boxShadow,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
