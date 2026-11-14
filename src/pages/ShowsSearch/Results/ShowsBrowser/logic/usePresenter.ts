import { useSuspenseQuery } from '@tanstack/react-query'
import { showQueries } from '#/queries/showQueries'
import { paginate } from './paginate'

/** Homework requirement: 3 shows per page. */
const PAGE_SIZE = 3

type Params = {
  query: string
  page: number
  onPageChange: (page: number) => void
}

// Suspense boundary component: it fetches its own data, the query comes in as a prop.
// Loading is handled by <Suspense> and errors by <ErrorBoundary> in Results.
export function usePresenter({ query, page, onPageChange }: Params) {
  const { data: shows } = useSuspenseQuery(showQueries.search(query))
  const currentPage = paginate(shows, page, PAGE_SIZE)

  return {
    query,
    isEmpty: shows.length === 0,
    shows: currentPage.items,
    page: currentPage.page,
    pageCount: currentPage.pageCount,
    changePage: onPageChange,
  }
}
