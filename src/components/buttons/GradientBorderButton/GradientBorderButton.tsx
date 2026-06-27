import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface GradientBorderButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function GradientBorderButton({
  children,
  className,
  disabled = false,
  onClick,
}: GradientBorderButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full p-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      whileTap={disabled ? undefined : { scale: 0.97 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400"
        animate={
          disabled
            ? undefined
            : {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
        }
        style={{ backgroundSize: "200% 200%" }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      <span className="relative z-10 inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-neutral-900">
        {children}
      </span>
    </motion.button>
  );
}
