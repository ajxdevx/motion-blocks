import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { isTouchDevice } from "../../../utils/viewportHelpers";

export interface HoverRevealProps {
  children: ReactNode;
  reveal: ReactNode;
  className?: string;
}

export function HoverReveal({ children, reveal, className }: HoverRevealProps) {
  const [hovered, setHovered] = useState(false);
  const touch = isTouchDevice();

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => !touch && setHovered(true)}
      onMouseLeave={() => !touch && setHovered(false)}
      onClick={() => touch && setHovered((prev) => !prev)}
    >
      {children}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {reveal}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
