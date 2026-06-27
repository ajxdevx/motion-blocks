import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface OrbitLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const config = {
  sm: { container: 24, dot: 6, radius: 9 },
  md: { container: 40, dot: 8, radius: 16 },
  lg: { container: 56, dot: 10, radius: 23 },
} as const;

const orbitOffsets = [
  { x: 0, y: -1 },
  { x: 0.866, y: 0.5 },
  { x: -0.866, y: 0.5 },
];

export function OrbitLoader({ className, size = "md" }: OrbitLoaderProps) {
  const { container, dot, radius } = config[size];

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
      style={{ width: container, height: container }}
    >
      <motion.div
        className="relative size-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      >
        {orbitOffsets.map((offset, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-current"
            style={{
              width: dot,
              height: dot,
              left: "50%",
              top: "50%",
              marginLeft: -dot / 2,
              marginTop: -dot / 2,
              x: offset.x * radius,
              y: offset.y * radius,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
