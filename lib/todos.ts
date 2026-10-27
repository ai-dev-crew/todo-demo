export type Todo = { id: string; title: string };

export type StorageLike = Pick<Storage, "getItem" | "setItem">;

export const STORAGE_KEY = "todos";
export const BLANK_TITLE_MESSAGE = "Give the todo a title";

export type AddResult =
  | { ok: true; todos: Todo[] }
  | { ok: false; error: string };

export function addTodo(todos: Todo[], title: string, id: string): AddResult {
  const trimmed = title.trim();
  if (trimmed === "") {
    return { ok: false, error: BLANK_TITLE_MESSAGE };
  }
  return { ok: true, todos: [...todos, { id, title: trimmed }] };
}

export function todoCountLabel(count: number): string {
  if (count === 0) return "No todos yet";
  return count === 1 ? "1 todo" : `${count} todos`;
}

export function parseTodos(raw: string | null): Todo[] {
  if (raw === null) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(
      (item): item is Todo =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.title === "string",
    );
  } catch {
    return [];
  }
}

export function loadTodos(storage: StorageLike): Todo[] {
  try {
    return parseTodos(storage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export function saveTodos(storage: StorageLike, todos: Todo[]): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Storage may be full or blocked; the list still works for this visit.
  }
}
