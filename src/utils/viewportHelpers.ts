export const defaultViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const;

export function getViewportOptions(once = true, amount = 0.2) {
  return { once, amount, margin: defaultViewport.margin };
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function isTouchDevice(): boolean {
  if (!isBrowser()) return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
