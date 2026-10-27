export function todoCountText(count: number): string {
  if (count === 0) return "No todos yet";
  return count === 1 ? "1 todo" : `${count} todos`;
}
