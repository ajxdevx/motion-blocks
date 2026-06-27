import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../../utils/cn";
import { random } from "../../../utils/random";

export interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

function createPlaceholderParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i * 17) % 100,
    y: (i * 23) % 100,
    size: 2 + (i % 3),
    duration: 3 + (i % 4),
    delay: (i % 5) * 0.2,
  }));
}

export function FloatingParticles({
  count = 20,
  className,
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState(() =>
    createPlaceholderParticles(count),
  );

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: random(0, 100),
        y: random(0, 100),
        size: random(2, 6),
        duration: random(3, 8),
        delay: random(0, 2),
      })),
    );
  }, [count]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
