import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import type { ReactNode } from "react";

export interface DockItem {
  label: string;
  href?: string;
  icon: ReactNode;
  onClick?: () => void;
}

export interface DockProps {
  items: DockItem[];
  className?: string;
}

export function Dock({ items, className }: DockProps) {
  return (
    <motion.div
      className={cn(
        "flex items-end gap-2 rounded-2xl border border-neutral-200/60 bg-white/80 px-4 py-3 backdrop-blur-md",
        className,
      )}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {items.map((item) => {
        const content = (
          <>
            <span className="flex h-10 w-10 items-center justify-center">{item.icon}</span>
            <span className="sr-only">{item.label}</span>
          </>
        );

        return (
          <motion.div
            key={item.label}
            whileHover={{ y: -8, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {item.href ? (
              <a
                href={item.href}
                className="flex flex-col items-center rounded-xl p-1 text-neutral-700 hover:bg-neutral-100"
              >
                {content}
              </a>
            ) : (
              <button
                type="button"
                onClick={item.onClick}
                className="flex flex-col items-center rounded-xl p-1 text-neutral-700 hover:bg-neutral-100"
              >
                {content}
              </button>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
