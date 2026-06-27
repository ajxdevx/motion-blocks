import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface StickySectionProps {
  children: ReactNode;
  className?: string;
  top?: number | string;
  zIndex?: number;
  style?: CSSProperties;
}

export function StickySection({
  children,
  className,
  top = 0,
  zIndex = 10,
  style,
}: StickySectionProps) {
  return (
    <section
      className={cn("sticky", className)}
      style={{ top, zIndex, ...style }}
    >
      {children}
    </section>
  );
}
