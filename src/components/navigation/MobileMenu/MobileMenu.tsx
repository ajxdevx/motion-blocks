import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../../utils/cn";

export interface MobileMenuLink {
  label: string;
  href: string;
}

export interface MobileMenuProps {
  links: MobileMenuLink[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function MobileMenu({
  links,
  open: controlledOpen,
  onOpenChange,
  className,
}: MobileMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;

  const setOpen = (value: boolean) => {
    onOpenChange?.(value);
    if (controlledOpen === undefined) setInternalOpen(value);
  };

  return (
    <div className={cn("md:hidden", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100"
        onClick={() => setOpen(!open)}
      >
        <span className="block h-0.5 w-6 bg-current" />
        <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        <span className="mt-1.5 block h-0.5 w-6 bg-current" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-6 p-8 pt-20">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-medium text-neutral-900"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
