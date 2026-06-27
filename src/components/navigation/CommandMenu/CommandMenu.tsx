import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { cn } from "../../../utils/cn";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  onSelect?: () => void;
}

export interface CommandMenuProps {
  items: CommandItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  placeholder?: string;
}

export function CommandMenu({
  items,
  open,
  onOpenChange,
  className,
  placeholder = "Search commands...",
}: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 150);
  const escapePressed = useKeyPress("Escape");

  const filtered = useMemo(() => {
    if (!debouncedQuery) return items;
    const lower = debouncedQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lower) ||
        item.description?.toLowerCase().includes(lower),
    );
  }, [items, debouncedQuery]);

  useEffect(() => {
    if (escapePressed && open) onOpenChange(false);
  }, [escapePressed, open, onOpenChange]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            className={cn(
              "w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl",
              className,
            )}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full border-b border-neutral-200 px-4 py-3 text-sm outline-none"
              autoFocus
            />
            <ul className="max-h-64 overflow-y-auto p-2">
              {filtered.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="flex w-full flex-col rounded-lg px-3 py-2 text-left hover:bg-neutral-100"
                    onClick={() => {
                      item.onSelect?.();
                      onOpenChange(false);
                    }}
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.description && (
                      <span className="text-xs text-neutral-500">{item.description}</span>
                    )}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-3 py-4 text-center text-sm text-neutral-500">
                  No results found
                </li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
