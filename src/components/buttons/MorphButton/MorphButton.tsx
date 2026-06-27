import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface MorphButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function MorphButton({
  children,
  className,
  disabled = false,
  onClick,
}: MorphButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      initial={{
        borderRadius: "9999px",
        scale: 1,
      }}
      whileHover={
        disabled
          ? undefined
          : {
              borderRadius: "12px",
              scale: 1.05,
            }
      }
      whileTap={disabled ? undefined : { scale: 0.95, borderRadius: "8px" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}
