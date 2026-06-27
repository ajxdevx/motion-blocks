import { cn } from "../../../utils/cn";

export interface DotPatternProps {
  className?: string;
}

export function DotPattern({ className }: DotPatternProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        className,
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}
