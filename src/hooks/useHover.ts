import { useCallback, useState } from "react";

export function useHover<T extends HTMLElement = HTMLElement>() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useCallback((node: T | null) => {
    if (!node) return;

    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return { ref, isHovered };
}
