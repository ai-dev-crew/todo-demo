import { expect, test } from "vitest";
import { remainingLabel, toggleTodo, type Todo } from "./todos";

const todos: Todo[] = [
  { id: 1, title: "a", done: false },
  { id: 2, title: "b", done: false },
];

test("checking a todo marks only that todo done", () => {
  const next = toggleTodo(todos, 1);

  expect(next.map((todo) => todo.done)).toEqual([true, false]);
  expect(todos[0].done).toBe(false);
});

test("checking again marks it not done", () => {
  expect(toggleTodo(toggleTodo(todos, 1), 1)).toEqual(todos);
});

test("remaining label counts todos that are not done", () => {
  expect(remainingLabel(todos)).toBe("2 todos left");
  expect(remainingLabel(toggleTodo(todos, 1))).toBe("1 todo left");
  expect(remainingLabel(toggleTodo(toggleTodo(todos, 1), 2))).toBe(
    "0 todos left",
  );
});
