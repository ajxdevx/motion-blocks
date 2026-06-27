import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface ShineButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function ShineButton({
  children,
  className,
  disabled = false,
  onClick,
}: ShineButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      whileTap={disabled ? undefined : { scale: 0.97 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={disabled ? undefined : { x: "200%" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        aria-hidden="true"
      />
    </motion.button>
  );
}
