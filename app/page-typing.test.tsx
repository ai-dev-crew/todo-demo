import { isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, test, vi } from "vitest";

// No DOM library is installed, so the page's own hooks are replaced by a tiny
// store. The test then does what a person does: types in the box, presses Add
// (submits the form) and reads the text the page shows.
const store = vi.hoisted(() => ({
  slots: [] as unknown[],
  index: 0,
  effects: [] as Array<() => void>,
}));

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useState: (initial: unknown) => {
      const i = store.index++;
      if (!(i in store.slots)) store.slots[i] = initial;
      const set = (next: unknown) => {
        store.slots[i] = next;
      };
      return [store.slots[i], set];
    },
    useEffect: (effect: () => void) => {
      store.effects.push(effect);
    },
  };
});

import Home from "./page";

const saved = new Map<string, string>();

function draw(): ReactElement {
  store.index = 0;
  store.effects = [];
  return Home() as ReactElement;
}

// Draw the page, run its mount effects once, and draw again, like a browser.
function open() {
  store.slots = [];
  draw();
  store.effects.forEach((effect) => effect());
  return draw();
}

function find(node: ReactNode, tag: string): ReactElement<any> | undefined {
  if (!isValidElement(node)) return undefined;
  const element = node as ReactElement<any>;
  if (element.type === tag) return element;
  const children = ([] as ReactNode[]).concat(element.props.children ?? []);
  for (const child of children) {
    const hit = find(child, tag);
    if (hit) return hit;
  }
  return undefined;
}

function screen(): string {
  return renderToStaticMarkup(draw());
}

function addTodoByTyping(title: string) {
  find(draw(), "input")!.props.onChange({ target: { value: title } });
  find(draw(), "form")!.props.onSubmit({ preventDefault() {} });
}

beforeEach(() => {
  saved.clear();
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => saved.get(key) ?? null,
      setItem: (key: string, value: string) => {
        saved.set(key, value);
      },
    },
  });
});

test("with no todos the page reads No todos yet", () => {
  open();
  expect(screen()).toContain("<p>No todos yet</p>");
});

test("after typing one todo and pressing Add the page reads 1 todo", () => {
  open();
  addTodoByTyping("Milk");
  const html = screen();
  expect(html).toContain("<li>Milk</li>");
  expect(html).toContain("<p>1 todo</p>");
  expect(html).not.toContain("No todos yet");
});

test("after adding three todos the page reads 3 todos, updating on every add", () => {
  open();
  addTodoByTyping("Milk");
  expect(screen()).toContain("<p>1 todo</p>");
  addTodoByTyping("Eggs");
  expect(screen()).toContain("<p>2 todos</p>");
  addTodoByTyping("Bread");
  expect(screen()).toContain("<p>3 todos</p>");
});

test("a blank title does not change the count", () => {
  open();
  addTodoByTyping("Milk");
  addTodoByTyping("   ");
  const html = screen();
  expect(html).toContain("Give the todo a title");
  expect(html).toContain("<p>1 todo</p>");
});

test("saved todos show their count when the page opens", () => {
  saved.set(
    "todos",
    JSON.stringify([
      { id: "1", title: "Milk" },
      { id: "2", title: "Eggs" },
      { id: "3", title: "Bread" },
    ]),
  );
  open();
  expect(screen()).toContain("<p>3 todos</p>");
});
