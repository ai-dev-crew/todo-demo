import { expect, test } from "vitest";
import { todoCountText } from "./todo-count";

test('reads "No todos yet" with no todos', () => {
  expect(todoCountText(0)).toBe("No todos yet");
});

test('reads "1 todo" with one todo', () => {
  expect(todoCountText(1)).toBe("1 todo");
});

test('reads "3 todos" with three todos', () => {
  expect(todoCountText(3)).toBe("3 todos");
});

test("uses the plural for every count above one", () => {
  expect(todoCountText(2)).toBe("2 todos");
  expect(todoCountText(12)).toBe("12 todos");
});
