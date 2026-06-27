import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface BlobBackgroundProps {
  className?: string;
}

const blobs = [
  { color: "rgba(124, 58, 237, 0.4)", delay: 0 },
  { color: "rgba(37, 99, 235, 0.35)", delay: 1 },
  { color: "rgba(139, 92, 246, 0.3)", delay: 2 },
];

export function BlobBackground({ className }: BlobBackgroundProps) {
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
          className="absolute blur-2xl"
          style={{
            background: blob.color,
            width: "50%",
            height: "50%",
            left: `${i * 25}%`,
            top: `${(i * 20) % 50}%`,
          }}
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
            rotate: [0, 90, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: blob.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
