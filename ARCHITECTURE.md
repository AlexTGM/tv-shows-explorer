# Architecture

Simple Architecture (VIPER + Clean Architecture), adapted to React and TanStack Start.
Rules that can be checked automatically are checked by `pnpm check` (Biome) and `pnpm check:size`.

## Glossary

### Course terms (lessons 1–2)

| Term | Meaning | Here |
|---|---|---|
| **Goal of architecture** | Reduce the human effort needed to build *and maintain* the system. Maintenance weighs more: a feature is written once and changed for years | — |
| **VIPER** | View, Interactor, Presenter, Entity, Router. Borrowed from iOS developers, who built it on Clean Architecture | the rows below |
| **View** | What the user sees, i.e. JSX. A component file holds only JSX and the single `usePresenter` hook | `ShowCard/ShowCard.tsx` |
| **Presenter** | The bridge between UI and business logic. Takes 100% of the component's logic: gets data, prepares it for View, decides which Task to call on which event | `logic/usePresenter.ts` |
| **Presenter hooks** | Parts of the presenter split into their own hooks when it grows (`useSuggestions` in the course) | `logic/use*.ts` |
| **Business rules** | Rules that make or save money, whether or not a computer runs them (a bank's loan interest) | — |
| **Use case** | Application-specific business rules: what the user enters, what the system does, what it returns. Close to a user story. Says nothing about tools or frameworks | implemented as Tasks |
| **Task** (Interactor) | A use case as a plain JS function named with a verb (`login`, `searchShows`). One function from the outside even if split into files. No React | `logic/tasks/`, `src/tasks/` |
| **Entity** | Data plus the ways to update it, i.e. the state manager's store. Tasks use stores directly, without middleware libraries (thunk, saga) | TanStack Query cache, URL search params |
| **Router** | Navigation. Not business logic (it depends on the environment), so it is done in the presenter | page root presenter |
| **Component tree** | One component, one folder. A component used once lives inside the folder of the component that uses it. The folder tree mirrors the screen | `pages/<Page>/…` |
| **`components/`** | Only reusable components, used only further down the tree. Can exist at any level; `src/components/` is the global one | any level |
| **`logic/`** | Everything in a component that is not JSX: the presenter, other hooks and `tasks/` | per component |
| **120-line rule** | No file longer than 120 lines: forces small, readable files | `pnpm check:size` |

### Project terms (not from the course)

| Term | Meaning |
|---|---|
| **Page** | The root of a screen's component tree (`src/pages/`). Its presenter is the only one that touches the router |
| **Route** | A TanStack file route (`src/routes/`): validates search params, preloads data, renders the page |
| **api** | Abstraction over the server: endpoints, zod schemas, mapping to app types. Tasks call it the way the course's `logout` calls its request helper |
| **queries** | Query key factories and `queryOptions` for the Query cache (the Entity); `queryFn` calls a Task |

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

One component, one folder. The View file is named after the folder:

```
ShowCard/
  ShowCard.tsx          View: JSX only
  logic/                everything that is not JSX
    usePresenter.ts
    useSomething.ts     other hooks of the component
    tasks/
      formatRating.ts       a Task as a single file…
      collectGenres/        …or as a folder if it does not fit into 120 lines
        collectGenres.ts
  Child/                a child component used only here
  components/           components reused by several descendants
```

It is imported with the repeated name: `import { ShowCard } from './ShowCard/ShowCard'`.
`logic/` and `tasks/` are optional: a component may consist of a single View file that takes props.

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
