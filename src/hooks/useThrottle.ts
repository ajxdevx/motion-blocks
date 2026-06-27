import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, interval = 100): T {
  const [throttled, setThrottled] = useState(value);
  const lastRan = useRef(0);

  useEffect(() => {
    const now = Date.now();
    if (now - lastRan.current >= interval) {
      lastRan.current = now;
      setThrottled(value);
      return;
    }

    const timer = setTimeout(() => {
      lastRan.current = Date.now();
      setThrottled(value);
    }, interval - (now - lastRan.current));

    return () => clearTimeout(timer);
  }, [value, interval]);

  return throttled;
}
