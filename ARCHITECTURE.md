# Architecture

Clean Architecture + VIPER, adapted to React and TanStack Start.
The rules below are mandatory; those that can be checked automatically are checked by `pnpm check` and `pnpm check:size`.

## Layers and dependency direction

```
routes ──▶ modules ──▶ app ──▶ domain ◀── data
              │          │
              └──▶ shared ◀┘
```

Dependencies point only inwards, towards `domain`. `domain` depends on nothing.

| Folder | Role | May import |
|---|---|---|
| `src/domain` | Entities, Ports (repository interfaces), Rules (pure functions over entities), Tasks (use cases) | `domain` only |
| `src/data` | Adapters: HTTP client, DTO schemas (zod), DTO → Entity mappers, repository implementations | `domain`, `shared/lib` |
| `src/app` | Composition root: DI container, `queryOptions` factories, a hook to access the container | `domain`, `data`, `shared` |
| `src/modules` | UI modules: component trees of View + Presenter | `domain`, `app`, `shared` |
| `src/shared` | Reusable from any module: `ui/` (shadcn), `hooks/`, `lib/` | `shared` only |
| `src/routes` | TanStack file routes: `validateSearch`, `loader`, rendering the module root | everything except `data` |

## Domain

- **Entity**: a domain type (`Show`, `Genre`). It is not the external API's DTO; fields are named the way the app finds convenient.
- **Port**: an interface through which the domain gets data (`ShowsRepository`). The implementation lives in `data`.
- **Rule**: a pure synchronous business-logic function (`collectGenres`, `filterByGenre`, `paginate`).
- **Task**: an application use case that works with data through ports. It receives dependencies explicitly:
  `searchShows({ showsRepository }, { query, signal })`. A Task knows nothing about React or Query.

## Modules: View + Presenter

Every component lives in its own folder:

```
ComponentName/
  index.ts           # public export: export { ComponentName } from "./View"
  View.tsx           # JSX only
  usePresenter.ts    # logic; optional if the component has nothing to decide
  *.test.ts(x)       # presenter and rule tests
```

Child components live as folders inside their parent. It is a tree, not a flat list.

**View**
- Markup only. Takes data and handlers from `usePresenter()`, or from props if there is no presenter.
- May import: its own `./usePresenter`, child components `./Child`, `#/shared/ui`, icons.
- Must not import: `@tanstack/*`, `#/domain`, `#/data`, `#/app`, `zod`.

**Presenter** (`usePresenter`)
- Builds the view model: decides what to show and in which state, and exposes event handlers.
- Does not mutate data. Changes go through Tasks (server) or navigation (URL).
- Does not implement business logic itself; it calls Rules and Tasks from `domain`.
- Gets server data through `queryOptions` factories from `app`, not through `fetch`.

**Module root (Screen)**
- The module's root component (`modules/<module>/<Root>/`) is the only one that reads and changes global router state (search params, navigation).
- Nested components get what they need through props and report events through callbacks.
- Exception: a component at a Suspense boundary (e.g. `Results`) calls `useSuspenseQuery` itself. It receives the query parameters as props from the root.

## Constraints

- A file is at most **120 lines** long (`pnpm check:size`; generated files are exempt).
- Search state lives in the URL (`?q=&genre=&page=`), not in `useState`.
- External data is validated by a zod schema at the `data` boundary. Only Entities get inside.
