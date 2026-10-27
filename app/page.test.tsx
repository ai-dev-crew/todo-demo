import { renderToString } from "react-dom/server";
import { expect, test } from "vitest";
import Home from "./page";

test("renders the home page heading", () => {
  const html = renderToString(<Home />);

  expect(html).toContain("<h1>Welcome to AI Dev Crew</h1>");
});
