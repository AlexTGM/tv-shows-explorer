import { useSuspenseQuery } from '@tanstack/react-query'
import { showQueries } from '#/queries/showQueries'

type Params = {
  query: string
}

// Suspense boundary component: it fetches its own data, the query comes in as a prop.
// Loading is handled by <Suspense> and errors by <ErrorBoundary> in Results.
export function usePresenter({ query }: Params) {
  const { data: shows } = useSuspenseQuery(showQueries.search(query))

  return {
    query,
    shows,
    isEmpty: shows.length === 0,
  }
}
