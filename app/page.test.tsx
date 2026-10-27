import { renderToString } from "react-dom/server";
import { expect, test } from "vitest";
import Home from "./page";

test("renders the home page heading", () => {
  const html = renderToString(<Home />);

  expect(html).toContain("<h1>Welcome to AI Dev Crew</h1>");
});

test("renders an unchecked checkbox per todo and the remaining line", () => {
  const html = renderToString(<Home />);

  expect(html.match(/type="checkbox"/g)).toHaveLength(3);
  expect(html).not.toContain("checked=");
  expect(html).not.toContain("line-through");
  expect(html).toContain("3 todos left");
});
