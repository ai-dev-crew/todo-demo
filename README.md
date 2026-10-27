# Next.js app

A small Next.js app with a tested home page.

## Agent workflow

1. Install dependencies with `npm ci`.
2. Run the tests once with `npm test`; run the CI gate with `npm run test:ci`.
3. Put helper tests beside source files as `lib/*.test.ts` and rendering tests as `app/*.test.tsx`.
4. Add or update a test for every code change.
5. The required `test` check fails when it finds zero tests.
6. A person reviews and merges every pull request.
