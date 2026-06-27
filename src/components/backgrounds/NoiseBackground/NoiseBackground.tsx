import { useId } from "react";
import { cn } from "../../../utils/cn";

export interface NoiseBackgroundProps {
  className?: string;
  opacity?: number;
}

export function NoiseBackground({
  className,
  opacity = 0.15,
}: NoiseBackgroundProps) {
  const filterId = useId();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#${filterId})`}
          opacity={opacity}
        />
      </svg>
    </div>
  );
}
