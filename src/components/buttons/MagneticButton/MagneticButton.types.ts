import type { ReactNode, MouseEventHandler } from "react";

export interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}
