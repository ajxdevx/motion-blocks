import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export interface FloatingNavLink {
  label: string;
  href: string;
}

export interface FloatingNavProps {
  links: FloatingNavLink[];
  className?: string;
}

export function FloatingNav({ links, className }: FloatingNavProps) {
  return (
    <motion.div
      className={cn(
        "fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-neutral-200/60 bg-white/90 px-2 py-2 shadow-lg backdrop-blur-md",
        className,
      )}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {links.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {link.label}
        </motion.a>
      ))}
    </motion.div>
  );
}
