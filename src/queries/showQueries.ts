import { queryOptions } from '@tanstack/react-query'
import { fetchShowSearch } from '#/api/tvmaze'
import { HttpError } from '#/lib/http'

const FIVE_MINUTES = 5 * 60 * 1000

/** Client errors (4xx, incl. 429 Too Many Requests) will not fix themselves on retry. */
function shouldRetry(failureCount: number, error: Error) {
  if (error instanceof HttpError && error.status < 500) return false
  return failureCount < 2
}

/**
 * Query key factory + queryOptions for shows (TkDodo's pattern).
 * Keys are hierarchical, so `searches()` matches every search query at once.
 */
export const showQueries = {
  all: () => ['shows'] as const,
  searches: () => [...showQueries.all(), 'search'] as const,
  search: (query: string) =>
    queryOptions({
      queryKey: [...showQueries.searches(), query] as const,
      // Query hands us an AbortSignal: a cancelled query aborts its HTTP request.
      queryFn: ({ signal }) => fetchShowSearch(query, signal),
      // Search results barely change: going back to a query is served from the cache.
      staleTime: FIVE_MINUTES,
      retry: shouldRetry,
    }),
}
