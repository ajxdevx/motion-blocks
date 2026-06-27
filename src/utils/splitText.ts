export function splitWords(text: string): string[] {
  return text.split(/(\s+)/).filter((segment) => segment.length > 0);
}

export function splitCharacters(text: string): string[] {
  return text.split("");
}
