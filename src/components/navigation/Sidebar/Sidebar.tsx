import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface SidebarItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface SidebarProps {
  items: SidebarItem[];
  logo?: ReactNode;
  className?: string;
  defaultCollapsed?: boolean;
}

export function Sidebar({
  items,
  logo,
  className,
  defaultCollapsed = false,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <motion.aside
      className={cn(
        "flex h-full flex-col border-r border-neutral-200 bg-white",
        collapsed ? "w-16" : "w-64",
        className,
      )}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-between border-b border-neutral-200 p-4">
        <AnimatePresence mode="wait">
          {!collapsed && logo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {logo}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {items.map((item) => {
          const content = (
            <>
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              {!collapsed && <span className="truncate">{item.label}</span>}
            </>
          );

          const sharedClass =
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100";

          return item.href ? (
            <a key={item.label} href={item.href} className={sharedClass}>
              {content}
            </a>
          ) : (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className={sharedClass}
            >
              {content}
            </button>
          );
        })}
      </nav>
    </motion.aside>
  );
}
