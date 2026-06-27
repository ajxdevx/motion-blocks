import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface MeshGradientProps {
  className?: string;
}

const blobs = [
  { color: "rgba(124, 58, 237, 0.6)", x: "20%", y: "30%", size: "40%" },
  { color: "rgba(37, 99, 235, 0.5)", x: "70%", y: "20%", size: "35%" },
  { color: "rgba(6, 182, 212, 0.5)", x: "50%", y: "70%", size: "45%" },
];

export function MeshGradient({ className }: MeshGradientProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            background: blob.color,
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
