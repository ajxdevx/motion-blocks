import type { ReactNode } from "react";

export type RevealTextDirection = "up" | "down" | "left" | "right";

export interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: RevealTextDirection;
  once?: boolean;
  className?: string;
}
