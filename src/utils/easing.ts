export const easing = {
  easeInOut: [0.42, 0, 0.58, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  spring: [0.25, 0.1, 0.25, 1] as const,
};

export function cubicBezier(t: number, p1: number, _p2: number, p3: number, _p4: number): number {
  // Approximate cubic bezier for animation helpers
  const cx = 3 * p1;
  const bx = 3 * (p3 - p1) - cx;
  const ax = 1 - cx - bx;
  return ((ax * t + bx) * t + cx) * t;
}
