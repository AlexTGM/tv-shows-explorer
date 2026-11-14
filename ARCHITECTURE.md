# Architecture

Simple Architecture (VIPER + Clean Architecture), adapted to React and TanStack Start.
Rules that can be checked automatically are checked by `pnpm check` (Biome) and `pnpm check:size`.

## VIPER in this project

| Letter | What it is here | Where it lives |
|---|---|---|
| **V**iew | JSX only plus the single `usePresenter` hook | `View.tsx` |
| **I**nteractor → **Task** | A use case: a plain JS function with a verb for a name, no React | `logic/tasks/` or `src/tasks/` |
| **P**resenter | The bridge between UI and business logic: screen state, handlers, which Task to call on which event, navigation | `logic/usePresenter.ts` |
| **E**ntity | Data stores and the ways to update them. We have two stores: the TanStack Query cache (server data) and the URL (search state) | `src/queries/`, route search params |
| **R**outer | Navigation. It is not business logic, so it is done in the presenter | `logic/usePresenter.ts` |

## `src` structure

```
routes/       file routes: validateSearch, loader, rendering the page, nothing else
pages/        pages: the root of a screen's component tree
components/   components reused across pages (ui/ — shadcn primitives)
tasks/        Tasks reused by several components
api/          abstraction over the server: TVmaze endpoints, zod schemas, mapping to app types
queries/      key factories and queryOptions (TkDodo style); queryFn calls a Task
hooks/        reusable hooks
lib/          React-free utilities: http client, cn, etc.
```

## Component

One component, one folder:

```
ShowCard/
  index.ts              export { ShowCard } from "./View"
  View.tsx              JSX only
  logic/                everything that is not JSX
    usePresenter.ts
    useSomething.ts     other hooks of the component
    tasks/
      formatRating.ts       a Task as a single file…
      collectGenres/        …or as a folder if it does not fit into 120 lines
        index.ts
  Child/                a child component used only here
  components/           components reused by several descendants
```

`logic/` and `tasks/` are optional: a component may consist of a single `View.tsx` that takes props.

### Where a component or Task lives

We move things up when they are actually used a second time, not "for the future":

| Who uses it | Component | Task |
|---|---|---|
| one component | a folder inside the parent | that component's `logic/tasks/` |
| several descendants of one node | that node's `components/` | `src/tasks/` |
| several pages | `src/components/` | `src/tasks/` |

A reusable component (in any `components/`) works through props only: it knows nothing about the router or Query.

## Layer rules

**View**
- Imports only `./logic/usePresenter`, child components, components from `components/` and icons.
- Does not import Tasks, `api`, `queries`, `hooks`, `lib`, `@tanstack/*` or `zod`.

**Presenter**
- Does not mutate data: data changes through Tasks, search state through navigation.
- Calls Tasks and `queries`, not `api` directly.
- Only the page root presenter (`pages/<Page>/logic/`) reads and changes the router. Nested components get data through props and report events through callbacks.
- Data exception: a component at a Suspense boundary calls `useSuspenseQuery` itself and receives the query parameters as props.

**Task**
- A plain function (sync or async) named with a verb: `searchShows`, `filterShowsByGenre`, `paginateShows`.
- No React and no `@tanstack/*`. Talks to the server through `api`.
- From the outside it is always a single function, even if it is split into files inside.

**Stores and SSR.** A module-level store singleton is shared by all requests on the server. So a Task may import directly only a store that exists on the client. The QueryClient is created per request in `src/router.tsx`.

## Constraints

- At most **120 lines** per file (`pnpm check:size`). Generated files are exempt.
- Upward imports (`../`) are allowed only into a `components/` folder. If a component is needed by a sibling branch, that is a signal to move it into the `components/` of the common ancestor.
- External data is validated by a zod schema in `api`; only app types go further.
