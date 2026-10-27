import { expect, test } from "vitest";
import { homeHeading } from "./home-heading";

test("trims the project name", () => {
  expect(homeHeading("  Crew  ")).toBe("Welcome to Crew");
});

test("collapses whitespace in the project name", () => {
  expect(homeHeading("AI\n Dev   Crew")).toBe("Welcome to AI Dev Crew");
});
