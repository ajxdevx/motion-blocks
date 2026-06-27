import { useRef, useState, type RefObject } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export interface ElementSize {
  width: number;
  height: number;
}

export function useElementSize<T extends HTMLElement = HTMLElement>(): [
  RefObject<T>,
  ElementSize,
] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useIsomorphicLayoutEffect(() => {
    if (!ref.current || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}
