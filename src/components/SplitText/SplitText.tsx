import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { staggerContainer } from "../../utils/motionPresets";
import type { SplitTextProps } from "./SplitText.types";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function splitText(text: string, type: "words" | "chars") {
  if (type === "chars") {
    return text.split("").map((char, index) => ({
      key: `${char}-${index}`,
      content: char === " " ? "\u00A0" : char,
    }));
  }

  return text.split(/(\s+)/).map((segment, index) => ({
    key: `${segment}-${index}`,
    content: segment,
  }));
}

export function SplitText({
  text,
  type = "words",
  stagger = 0.05,
  delay = 0,
  className,
  itemClassName,
}: SplitTextProps) {
  const segments = splitText(text, type);

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      aria-label={text}
      role="text"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        ...staggerContainer,
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {segments.map(({ key, content }) => (
        <motion.span
          key={key}
          className={cn("inline-block", itemClassName)}
          variants={itemVariants}
          aria-hidden="true"
        >
          {content}
        </motion.span>
      ))}
    </motion.span>
  );
}
