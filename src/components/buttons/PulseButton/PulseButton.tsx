import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface PulseButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function PulseButton({
  children,
  className,
  disabled = false,
  onClick,
}: PulseButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      animate={
        disabled
          ? undefined
          : {
              scale: [1, 1.03, 1],
              boxShadow: [
                "0 0 0 0 rgba(16, 185, 129, 0.4)",
                "0 0 0 8px rgba(16, 185, 129, 0)",
                "0 0 0 0 rgba(16, 185, 129, 0)",
              ],
            }
      }
      transition={
        disabled
          ? undefined
          : {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      whileTap={disabled ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
