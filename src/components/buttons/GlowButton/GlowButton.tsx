import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function GlowButton({
  children,
  className,
  disabled = false,
  onClick,
}: GlowButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-2.5 text-sm font-medium text-white transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      whileHover={
        disabled
          ? undefined
          : {
              boxShadow:
                "0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)",
            }
      }
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
}
