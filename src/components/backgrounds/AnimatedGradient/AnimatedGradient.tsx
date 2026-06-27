import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className }: AnimatedGradientProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(-45deg, #7c3aed, #2563eb, #06b6d4, #8b5cf6, #7c3aed)",
          backgroundSize: "400% 400%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
