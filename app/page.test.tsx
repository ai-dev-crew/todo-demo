import { renderToString } from "react-dom/server";
import { expect, test } from "vitest";
import Home from "./page";

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

test("shows the empty count under the list", () => {
  const html = renderToString(<Home />);

  expect(html).toContain("</ul><p>No todos yet</p>");
});
