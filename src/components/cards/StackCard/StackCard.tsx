import { motion } from "framer-motion";
import { Children, isValidElement, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface StackCardProps {
  children?: ReactNode;
  items?: ReactNode[];
  className?: string;
  offset?: number;
  maxVisible?: number;
}

export function StackCard({
  children,
  items,
  className,
  offset = 12,
  maxVisible = 4,
}: StackCardProps) {
  const childArray = items ?? Children.toArray(children).filter(isValidElement);
  const visibleItems = childArray.slice(0, maxVisible);
  const totalHeight = offset * (visibleItems.length - 1);

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ paddingBottom: totalHeight }}
      role="group"
      aria-label="Stacked cards"
    >
      {visibleItems.map((item, index) => {
        const isTop = index === visibleItems.length - 1;
        const reverseIndex = visibleItems.length - 1 - index;

        return (
          <motion.div
            key={index}
            className={cn(
              "rounded-2xl border border-neutral-200/60 bg-white/90 p-6 shadow-md backdrop-blur-sm",
              isTop ? "relative" : "absolute inset-x-0",
            )}
            style={{
              top: isTop ? undefined : index * offset,
              zIndex: index,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{
              y: reverseIndex * -4,
              scale: 1.02,
              zIndex: visibleItems.length + 1,
            }}
          >
            {item}
          </motion.div>
        );
      })}
    </div>
  );
}
