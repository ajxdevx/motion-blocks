import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface LiquidButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function LiquidButton({
  children,
  className,
  disabled = false,
  onClick,
}: LiquidButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center bg-sky-600 px-6 py-2.5 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      initial={{ borderRadius: "9999px" }}
      whileHover={
        disabled
          ? undefined
          : {
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            }
      }
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {children}
    </motion.button>
  );
}
