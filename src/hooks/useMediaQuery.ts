import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const getMatches = (q: string): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(q).matches;
  };

  const [matches, setMatches] = useState(() => getMatches(query));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", handleChange);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
