"use client";

import { useEffect, useState, type FormEvent } from "react";
import { homeHeading } from "../lib/home-heading";
import { addTodo, loadTodos, saveTodos, type Todo } from "../lib/todos";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTodos(loadTodos(window.localStorage));
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = addTodo(todos, title, crypto.randomUUID());
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setTodos(result.todos);
    saveTodos(window.localStorage, result.todos);
    setTitle("");
    setError("");
  }

  return (
    <main>
      <h1>{homeHeading("AI Dev Crew")}</h1>
      <p>Build your project with tested changes and human review.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Todo title
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <button type="submit">Add</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </main>
  );
}
