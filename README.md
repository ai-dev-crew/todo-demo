# Next.js app

A small Next.js app with a tested home page.

## Todo list

The home page has a todo list. To add a todo, type a title in the box and press Add. The new todo appears at the bottom of the list. A title that is empty or only spaces is refused with the message "Give the todo a title".

Under the list, a count shows how many todos there are. It reads "3 todos", "1 todo" for one, and "No todos yet" when the list is empty. The count updates as soon as a todo is added.

Todos are saved in the browser's `localStorage` under the key `todos`. They stay on the same browser after a reload. They are not sent to a server, so another browser or device does not see them. Clearing the site's data in the browser deletes them.

## Agent workflow

1. Install dependencies with `npm ci`.
2. Run the tests once with `npm test`; run the CI gate with `npm run test:ci`.
3. Put helper tests beside source files as `lib/*.test.ts` and rendering tests as `app/*.test.tsx`.
4. Add or update a test for every code change.
5. The required `test` check fails when it finds zero tests.
6. A person reviews and merges every pull request.
