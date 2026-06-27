export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(random(min, max + 1));
}

export function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}
