export type SplitTextType = "words" | "chars";

export interface SplitTextProps {
  text: string;
  type?: SplitTextType;
  stagger?: number;
  delay?: number;
  className?: string;
  itemClassName?: string;
}
