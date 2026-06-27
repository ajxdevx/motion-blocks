import { cn } from "../../../utils/cn";
import type { ReactNode } from "react";

export interface HeroBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function HeroBackground({ children, className }: HeroBackgroundProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-neutral-100",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100/40 via-transparent to-transparent"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
