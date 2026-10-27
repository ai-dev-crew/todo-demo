import { renderToString } from "react-dom/server";
import { expect, test } from "vitest";
import Home from "./page";

test("renders the home page heading", () => {
  const html = renderToString(<Home />);

  expect(html).toContain("<h1>Welcome to AI Dev Crew</h1>");
});

test("renders All, Active and Done filter buttons with All selected", () => {
  const html = renderToString(<Home />);

  expect(html).toMatch(/<button[^>]*aria-pressed="true"[^>]*>All<\/button>/);
  expect(html).toMatch(/<button[^>]*aria-pressed="false"[^>]*>Active<\/button>/);
  expect(html).toMatch(/<button[^>]*aria-pressed="false"[^>]*>Done<\/button>/);
});

test("shows the empty message when there are no todos", () => {
  const html = renderToString(<Home />);

  expect(html).toContain("No todos yet.");
  expect(html).not.toContain("<ul>");
});
