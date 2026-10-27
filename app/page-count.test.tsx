import { renderToString } from "react-dom/server";
import { afterEach, expect, test, vi } from "vitest";

// Seed the page's todo state so the rendered screen can be read with todos present.
let seeded: { id: string; title: string }[] = [];

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  let call = 0;
  return {
    ...actual,
    useState: (initial: unknown) => {
      // The page's first useState is the todo list.
      const isTodos = call++ % 3 === 0;
      return actual.useState(isTodos ? seeded : initial);
    },
  };
});

import Home from "./page";

afterEach(() => {
  seeded = [];
});

test("screen reads '3 todos' under the list when there are three", () => {
  seeded = [
    { id: "1", title: "Milk" },
    { id: "2", title: "Eggs" },
    { id: "3", title: "Bread" },
  ];
  const html = renderToString(<Home />);

  expect(html).toContain("<li>Milk</li><li>Eggs</li><li>Bread</li></ul><p>3 todos</p>");
});

test("screen reads '1 todo' under the list when there is one", () => {
  seeded = [{ id: "1", title: "Milk" }];
  const html = renderToString(<Home />);

  expect(html).toContain("</ul><p>1 todo</p>");
  expect(html).not.toContain("1 todos");
});

test("screen reads 'No todos yet' when there are none", () => {
  const html = renderToString(<Home />);

  expect(html).toContain("</ul><p>No todos yet</p>");
});
