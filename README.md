# TV Shows Explorer

Search TV shows with the [TVmaze API](https://www.tvmaze.com/api), filter the results by genre and
page through them, 3 shows at a time.

Homework #1 of the Simple Architecture course (week 1: View, Presenter, component tree).

## Features

| Requirement | How it works |
|---|---|
| Empty screen with a search field first | Nothing is requested until there is a query; the idle screen offers a few search ideas |
| Search by the TVmaze API | `GET /search/shows?q=…`, the API does the filtering |
| List with pagination, 3 per page | Paging happens on the client over already loaded results; `?page=99` clamps to the last page |
| Genre chips with filter and reset | Unique genres over all results with counts; "All" or re-clicking the selected genre resets |
| Not a request per keystroke | Debounced input (400 ms, TanStack Pacer); Enter searches at once; clearing resets instantly |
| Cancel outdated requests | A new search aborts every in-flight search for another query (the HTTP request too) |
| Loading and error states | Suspense skeleton on the first load, previous results stay dimmed while the next query loads; ErrorBoundary with readable messages and "Try again" |

Also:

- **The URL is the state**: `/?q=murder&genre=Comedy&page=2` can be shared, reloaded and navigated with back/forward.
  Typing replaces the history entry, changing a genre or page adds one.
- **Server rendering**: a link with `?q=` arrives with the results already in the HTML; the route loader
  starts the request as soon as navigation starts.
- **Cache**: going back to a previous query is instant (5 min `staleTime`).
- **Validated data**: the API response goes through a zod schema and is mapped to the app's own `Show` type;
  summaries are converted from HTML to plain text instead of being injected as HTML.
- **Accessible**: semantic `<search>`, `<nav>`, `aria-pressed` chips, `aria-current` page, visible focus,
  reduced-motion support.

## Stack

TanStack Start (React 19, SSR) · TanStack Router · TanStack Query · TanStack Pacer · react-error-boundary ·
zod · Tailwind CSS 4 · Biome · TypeScript

## Architecture

The project follows Simple Architecture; terms and rules are in [ARCHITECTURE.md](ARCHITECTURE.md).
In short:

- **View** — a component file holds only JSX and the `usePresenter` hook.
- **Presenter** — `logic/usePresenter.ts` takes all of the component's logic, split into more hooks
  and helper functions next to it when it grows.
- **Component tree** — one component, one folder; a component used once lives inside its parent,
  so the folders mirror the screen.
- **120 lines per file** at most.

Week 1 has no Tasks yet: pure helpers such as `paginate` or `collectGenres` live in the component's
`logic/` folder and become Tasks in week 2.

```
src/
  routes/index.tsx             search params schema (q, genre, page) + data prefetch
  pages/ShowsSearch/
    ShowsSearch.tsx            page layout; its presenter is the only one touching the router
    SearchBar/                 debounced input synced with the URL
    IdleState/                 the empty first screen
    Results/                   ErrorBoundary + Suspense, keeps old results while loading
      ResultsError/            error messages and retry
      ResultsSkeleton/
      ShowsBrowser/            loads the query, collects genres, filters, paginates
        GenreFilter/
        ShowList/ShowCard/
        Pagination/
  queries/showQueries.ts       query key factory + queryOptions
  api/tvmaze/                  endpoint, zod schema, DTO → Show mapping
  lib/http.ts                  fetch wrapper with AbortSignal and HttpError
```

## Getting started

Requires Node.js 24+ (see `.nvmrc`) and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Script | What it does |
|---|---|
| `pnpm dev` | dev server |
| `pnpm build` / `pnpm preview` | production build and its preview |
| `pnpm check` | Biome: format, lint and the architecture import rules |
| `pnpm typecheck` | TypeScript |
| `pnpm check:size` | the 120-line limit |

Show data and posters: [TVmaze](https://www.tvmaze.com), licensed under CC BY-SA.
