# Next.js app

A small Next.js app with a tested home page.

## Todo list

The home page has a basic todo list:

- Type a todo in the box and press **Add**. Blank todos are ignored.
- Tick the checkbox next to a todo to mark it done. Tick it again to mark it active.
- Use the **All**, **Active** and **Done** buttons to filter the list. **All** shows every todo, **Active** shows todos not yet done, and **Done** shows finished todos.
- When the filtered list is empty, the page says so, for example "No active todos."

The todo list and the selected filter are kept in page state only. Refreshing the page clears them, and the filter is not saved in the URL.

## Agent workflow

1. Install dependencies with `npm ci`.
2. Run the tests once with `npm test`; run the CI gate with `npm run test:ci`.
3. Put helper tests beside source files as `lib/*.test.ts` and rendering tests as `app/*.test.tsx`.
4. Add or update a test for every code change.
5. The required `test` check fails when it finds zero tests.
6. A person reviews and merges every pull request.
