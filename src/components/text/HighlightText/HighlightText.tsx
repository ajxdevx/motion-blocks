import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface HighlightTextProps {
  children: ReactNode;
  highlight?: string;
  highlightClassName?: string;
  className?: string;
}

export function HighlightText({
  children,
  highlight,
  highlightClassName,
  className,
}: HighlightTextProps) {
  const text = typeof children === "string" ? children : null;
  const highlightText = highlight ?? text ?? "";

  if (text && highlightText && text.includes(highlightText)) {
    const [before, after] = text.split(highlightText);

    return (
      <motion.span
        className={cn("inline-block", className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.04 },
          },
        }}
      >
        {before.length > 0 && (
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
          >
            {before}
          </motion.span>
        )}
        <motion.span
          className={cn(
            "relative inline-block bg-yellow-200/80 px-0.5 dark:bg-yellow-500/30",
            highlightClassName,
          )}
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            visible: { opacity: 1, scaleX: 1 },
          }}
          style={{ originX: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {highlightText}
        </motion.span>
        {after.length > 0 && (
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {after}
          </motion.span>
        )}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.span
        className={cn(
          "relative inline-block bg-yellow-200/80 px-0.5 dark:bg-yellow-500/30",
          highlightClassName,
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        style={{ originX: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
