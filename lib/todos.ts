export type Todo = {
  id: number;
  title: string;
  done: boolean;
};

export const initialTodos: Todo[] = [
  { id: 1, title: "Write a card", done: false },
  { id: 2, title: "Review the pull request", done: false },
  { id: 3, title: "Merge the change", done: false },
];

export function toggleTodo(todos: Todo[], id: number): Todo[] {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo,
  );
}

export function remainingLabel(todos: Todo[]): string {
  const left = todos.filter((todo) => !todo.done).length;
  return `${left} ${left === 1 ? "todo" : "todos"} left`;
}
