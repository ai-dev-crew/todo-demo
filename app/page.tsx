"use client";

import { useState } from "react";
import { homeHeading } from "../lib/home-heading";
import {
  emptyMessage,
  filterTodos,
  todoFilters,
  type Todo,
  type TodoFilter,
} from "../lib/todo-filter";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<TodoFilter>("all");

  const visible = filterTodos(todos, filter);

  function addTodo(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now() + todos.length, text: trimmed, done: false }]);
    setText("");
  }

  function toggle(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  return (
    <main>
      <h1>{homeHeading("AI Dev Crew")}</h1>
      <p>Build your project with tested changes and human review.</p>
      <form onSubmit={addTodo}>
        <input
          aria-label="New todo"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div role="group" aria-label="Filter todos">
        {todoFilters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p>{emptyMessage(todos.length, filter)}</p>
      ) : (
        <ul>
          {visible.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggle(todo.id)}
                />
                {todo.text}
              </label>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
