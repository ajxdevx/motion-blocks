import { motion } from "framer-motion";
import { useCallback, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(255, 255, 255, 0.15)",
  spotlightSize = 350,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-neutral-900 p-6 text-white",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
