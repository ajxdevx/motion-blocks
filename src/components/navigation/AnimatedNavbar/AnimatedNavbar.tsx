import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import type { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface AnimatedNavbarProps {
  logo: ReactNode;
  links: NavLink[];
  className?: string;
}

export function AnimatedNavbar({ logo, links, className }: AnimatedNavbarProps) {
  return (
    <motion.nav
      className={cn(
        "flex items-center justify-between rounded-full border border-neutral-200/60 bg-white/80 px-6 py-3 backdrop-blur-md",
        className,
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="font-semibold">{logo}</div>
      <ul className="hidden items-center gap-6 md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <motion.a
              href={link.href}
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {link.label}
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
