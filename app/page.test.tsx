import { renderToString } from "react-dom/server";
import { afterEach, expect, test, vi } from "vitest";
import type { Todo } from "../lib/todos";
import Home from "./page";

// A server render never runs the effect that loads todos from localStorage.
// To render the page with todos, seed its todo list: its only array state.
const seed = vi.hoisted(() => ({ todos: [] as Todo[] }));

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useState: (initial: unknown) =>
      actual.useState(Array.isArray(initial) ? seed.todos : initial),
  };
});

afterEach(() => {
  seed.todos = [];
});

test("renders the home page heading", () => {
  const html = renderToString(<Home />);

  expect(html).toContain("<h1>Welcome to AI Dev Crew</h1>");
});

test("renders the add-todo form with an empty list and no error", () => {
  const html = renderToString(<Home />);

  expect(html).toContain("<input");
  expect(html).toContain(">Add</button>");
  expect(html).toContain("<ul></ul>");
  expect(html).not.toContain("Give the todo a title");
});

test('with no todos, the text under the list reads "No todos yet"', () => {
  const html = renderToString(<Home />);

  expect(html).toContain("<ul></ul><p>No todos yet</p>");
});

test('with 1 todo, the text under the list reads "1 todo"', () => {
  seed.todos = [{ id: "1", title: "Milk" }];
  const html = renderToString(<Home />);

  expect(html).toContain("<li>Milk</li></ul><p>1 todo</p>");
  expect(html).not.toContain("1 todos");
});

test('with 3 todos, the text under the list reads "3 todos"', () => {
  seed.todos = [
    { id: "1", title: "Milk" },
    { id: "2", title: "Eggs" },
    { id: "3", title: "Bread" },
  ];
  const html = renderToString(<Home />);

  expect(html).toContain("<li>Milk</li><li>Eggs</li><li>Bread</li></ul><p>3 todos</p>");
});
