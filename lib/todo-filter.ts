export type Todo = { id: number; text: string; done: boolean };
export type TodoFilter = "all" | "active" | "done";

export const todoFilters: { value: TodoFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
];

export function filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
  if (filter === "active") return todos.filter((todo) => !todo.done);
  if (filter === "done") return todos.filter((todo) => todo.done);
  return todos;
}

export function emptyMessage(total: number, filter: TodoFilter): string {
  if (total === 0) return "No todos yet.";
  if (filter === "active") return "No active todos.";
  if (filter === "done") return "No done todos.";
  return "No todos yet.";
}
