import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface SpotlightBackgroundProps {
  className?: string;
}

export function SpotlightBackground({ className }: SpotlightBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <motion.div
        className="absolute size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)",
        }}
        animate={{
          left: ["30%", "70%", "50%", "30%"],
          top: ["20%", "60%", "40%", "20%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
