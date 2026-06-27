import { useEffect, useRef, useState, type RefObject } from "react";

export function useParallax(speed = 0.5): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offset;
}

export function useElementParallax<T extends HTMLElement>(
  speed = 0.5,
): [RefObject<T>, number] {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      setOffset((center - viewportCenter) * speed * -0.1);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [speed]);

  return [ref, offset];
}
