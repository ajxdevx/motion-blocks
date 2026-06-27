import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface AnimatedGridProps {
  className?: string;
}

export function AnimatedGrid({ className }: AnimatedGridProps) {
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
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
