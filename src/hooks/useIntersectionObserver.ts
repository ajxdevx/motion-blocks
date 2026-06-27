import { useEffect, useRef, useState, type RefObject } from "react";

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver<T extends Element = Element>(
  options: UseIntersectionObserverOptions = {},
): [RefObject<T>, boolean, IntersectionObserverEntry | null] {
  const { freezeOnceVisible = false, ...observerOptions } = options;
  const ref = useRef<T>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const frozen = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    if (frozen.current) return;

    const observer = new IntersectionObserver(([nextEntry]) => {
      setEntry(nextEntry);
      if (freezeOnceVisible && nextEntry?.isIntersecting) {
        frozen.current = true;
        observer.disconnect();
      }
    }, observerOptions);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [freezeOnceVisible, observerOptions.root, observerOptions.rootMargin, observerOptions.threshold]);

  return [ref, entry?.isIntersecting ?? false, entry];
}
