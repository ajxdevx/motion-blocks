import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { getDirectionOffset } from "../../../utils/motionPresets";
import type { RevealTextProps } from "./RevealText.types";

export function RevealText({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  once = true,
  className,
}: RevealTextProps) {
  const offset = getDirectionOffset(direction);

  return (
    <motion.div
      className={cn("inline-block", className)}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
