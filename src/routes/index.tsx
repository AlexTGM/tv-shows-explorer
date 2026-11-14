import { createFileRoute, stripSearchParams } from '@tanstack/react-router'
import { z } from 'zod'
import { ShowsSearch } from '#/pages/ShowsSearch/ShowsSearch'
import { showQueries } from '#/queries/showQueries'

const searchDefaults = { q: '', page: 1 }

// Search state lives in the URL. Broken or missing params fall back to defaults instead of failing.
const searchSchema = z.object({
  q: z.string().trim().default(searchDefaults.q).catch(searchDefaults.q),
  genre: z.string().min(1).optional().catch(undefined),
  page: z.coerce.number().int().min(1).default(searchDefaults.page).catch(searchDefaults.page),
})

export const Route = createFileRoute('/')({
  validateSearch: searchSchema,
  // Keep URLs clean: `/?q=murder` instead of `/?q=murder&page=1`.
  search: { middlewares: [stripSearchParams(searchDefaults)] },
  // Only the query hits the server; genre and page are applied on the client.
  loaderDeps: ({ search }) => ({ q: search.q }),
  loader: ({ context, deps }) => {
    // Start fetching as soon as navigation starts instead of when ShowsBrowser renders.
    // Not awaited: the page renders right away and the results stream in through Suspense.
    // prefetchQuery never throws; errors surface in the ErrorBoundary via useSuspenseQuery.
    if (deps.q !== '') void context.queryClient.prefetchQuery(showQueries.search(deps.q))
  },
  component: ShowsSearch,
})
