import { describe, expect, test } from "vitest";
import {
  BLANK_TITLE_MESSAGE,
  STORAGE_KEY,
  addTodo,
  loadTodos,
  parseTodos,
  saveTodos,
  type StorageLike,
} from "./todos";

function memoryStorage(initial?: string): StorageLike {
  let value: string | null = initial ?? null;
  return {
    getItem: () => value,
    setItem: (_key, next) => {
      value = next;
    },
  };
}

describe("addTodo", () => {
  test("appends the todo at the bottom", () => {
    const first = addTodo([], "Milk", "1");
    expect(first.ok).toBe(true);
    if (!first.ok) return;
    const second = addTodo(first.todos, "Eggs", "2");
    expect(second).toEqual({
      ok: true,
      todos: [
        { id: "1", title: "Milk" },
        { id: "2", title: "Eggs" },
      ],
    });
  });

  test("trims the title", () => {
    expect(addTodo([], "  Milk  ", "1")).toEqual({
      ok: true,
      todos: [{ id: "1", title: "Milk" }],
    });
  });

  test.each(["", "   ", "\t\n"])("refuses blank title %j", (title) => {
    expect(addTodo([], title, "1")).toEqual({
      ok: false,
      error: "Give the todo a title",
    });
    expect(BLANK_TITLE_MESSAGE).toBe("Give the todo a title");
  });
});

describe("persistence", () => {
  test("todos survive a reload", () => {
    const storage = memoryStorage();
    const todos = [{ id: "1", title: "Milk" }];
    saveTodos(storage, todos);
    expect(loadTodos(storage)).toEqual(todos);
  });

  test("loads an empty list when nothing is stored", () => {
    expect(loadTodos(memoryStorage())).toEqual([]);
  });

  test("ignores corrupt or wrongly shaped data", () => {
    expect(parseTodos("{not json")).toEqual([]);
    expect(parseTodos('{"a":1}')).toEqual([]);
    expect(parseTodos('[{"id":"1","title":"ok"},{"id":2},null,"x"]')).toEqual([
      { id: "1", title: "ok" },
    ]);
  });

  test("survives storage that throws", () => {
    const broken: StorageLike = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("full");
      },
    };
    expect(loadTodos(broken)).toEqual([]);
    expect(() => saveTodos(broken, [])).not.toThrow();
  });

  test("treats an empty string, empty array and null as an empty list", () => {
    expect(parseTodos("")).toEqual([]);
    expect(parseTodos("[]")).toEqual([]);
    expect(parseTodos(null)).toEqual([]);
    expect(loadTodos(memoryStorage("garbage"))).toEqual([]);
  });

  test("a todo added after a reload goes below the saved ones", () => {
    const storage = memoryStorage();
    saveTodos(storage, [{ id: "1", title: "Milk" }]);
    const result = addTodo(loadTodos(storage), "Eggs", "2");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    saveTodos(storage, result.todos);
    expect(loadTodos(storage).map((todo) => todo.title)).toEqual(["Milk", "Eggs"]);
  });

  test("a refused blank title leaves the stored list untouched", () => {
    const storage = memoryStorage();
    const saved = [{ id: "1", title: "Milk" }];
    saveTodos(storage, saved);
    expect(addTodo(loadTodos(storage), "  ", "2").ok).toBe(false);
    expect(loadTodos(storage)).toEqual(saved);
  });

  test("uses a stable storage key", () => {
    expect(STORAGE_KEY).toBe("todos");
  });
});
