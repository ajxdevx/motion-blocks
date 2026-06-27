import { useEffect, useState } from "react";

export function useKeyPress(targetKey: string): boolean {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const down = (event: KeyboardEvent) => {
      if (event.key === targetKey) setPressed(true);
    };
    const up = (event: KeyboardEvent) => {
      if (event.key === targetKey) setPressed(false);
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [targetKey]);

  return pressed;
}

export function useKeyPressCallback(key: string, callback: () => void) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (event: KeyboardEvent) => {
      if (event.key === key) callback();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback]);
}
