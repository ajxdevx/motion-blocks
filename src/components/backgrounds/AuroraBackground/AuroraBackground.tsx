import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface AuroraBackgroundProps {
  className?: string;
}

export function AuroraBackground({ className }: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <motion.div
        className="absolute -inset-[50%] opacity-50 blur-3xl"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #7c3aed, #2563eb, #06b6d4, #7c3aed)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-[30%] opacity-40 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(124, 58, 237, 0.8), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(37, 99, 235, 0.8), transparent 50%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
