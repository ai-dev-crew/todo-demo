import { expect, test } from "vitest";
import { emptyMessage, filterTodos, type Todo } from "./todo-filter";

const todos: Todo[] = [
  { id: 1, text: "a", done: false },
  { id: 2, text: "b", done: true },
  { id: 3, text: "c", done: false },
];

test("All returns every todo", () => {
  expect(filterTodos(todos, "all")).toEqual(todos);
});

test("Active returns only todos not done", () => {
  expect(filterTodos(todos, "active").map((t) => t.id)).toEqual([1, 3]);
});

test("Done returns only done todos", () => {
  expect(filterTodos(todos, "done").map((t) => t.id)).toEqual([2]);
});

test("filtering does not change the original list", () => {
  const copy = todos.map((t) => ({ ...t }));
  filterTodos(todos, "done");
  filterTodos(todos, "active");
  expect(todos).toEqual(copy);
});

test("empty list returns empty result for every filter", () => {
  expect(filterTodos([], "all")).toEqual([]);
  expect(filterTodos([], "active")).toEqual([]);
  expect(filterTodos([], "done")).toEqual([]);
});

test("emptyMessage depends on total and filter", () => {
  expect(emptyMessage(0, "done")).toBe("No todos yet.");
  expect(emptyMessage(2, "active")).toBe("No active todos.");
  expect(emptyMessage(2, "done")).toBe("No done todos.");
  expect(emptyMessage(2, "all")).toBe("No todos yet.");
});
