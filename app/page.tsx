"use client";

import { useState } from "react";
import { homeHeading } from "../lib/home-heading";
import { initialTodos, remainingLabel, toggleTodo } from "../lib/todos";

export default function Home() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <main>
      <h1>{homeHeading("AI Dev Crew")}</h1>
      <p>Build your project with tested changes and human review.</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label style={{ textDecoration: todo.done ? "line-through" : "none" }}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => setTodos((current) => toggleTodo(current, todo.id))}
              />{" "}
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
      <p>{remainingLabel(todos)}</p>
    </main>
  );
}
