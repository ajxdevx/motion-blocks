import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface HeroMarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
}

export function HeroMarquee({ items, className, speed = 30 }: HeroMarqueeProps) {
  const duplicated = [...items, ...items];

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {duplicated.map((item, index) => (
          <span
            key={index}
            className="text-sm font-medium uppercase tracking-widest text-neutral-500"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
