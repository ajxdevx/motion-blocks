export const springConfigs = {
  gentle: { stiffness: 120, damping: 14, mass: 0.8 },
  snappy: { stiffness: 300, damping: 20, mass: 0.5 },
  bouncy: { stiffness: 400, damping: 12, mass: 0.6 },
  stiff: { stiffness: 500, damping: 30, mass: 0.4 },
  magnetic: { stiffness: 150, damping: 15, mass: 0.1 },
} as const;

export type SpringConfig = (typeof springConfigs)[keyof typeof springConfigs];
