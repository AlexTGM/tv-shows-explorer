import { useSuspenseQuery } from '@tanstack/react-query'
import { showQueries } from '#/queries/showQueries'
import { collectGenres } from './collectGenres'
import { filterShowsByGenre } from './filterShowsByGenre'
import { paginate } from './paginate'

/** Homework requirement: 3 shows per page. */
const PAGE_SIZE = 3

type Params = {
  query: string
  genre: string | undefined
  page: number
  onGenreChange: (genre: string | undefined) => void
  onPageChange: (page: number) => void
}

// Suspense boundary component: it fetches its own data, the query comes in as a prop.
// Loading is handled by <Suspense> and errors by <ErrorBoundary> in Results.
export function usePresenter({ query, genre, page, onGenreChange, onPageChange }: Params) {
  const { data: shows } = useSuspenseQuery(showQueries.search(query))

  // Genres come from all results, not just the current page.
  const genres = collectGenres(shows)
  // A genre from the URL that this search does not have (?genre=Foo) is ignored.
  const selectedGenre = genres.some(({ name }) => name === genre) ? genre : undefined

  // Filter first, then paginate: pages are counted over the filtered list.
  const currentPage = paginate(filterShowsByGenre(shows, selectedGenre), page, PAGE_SIZE)

  return {
    query,
    isEmpty: shows.length === 0,
    totalCount: shows.length,
    genres,
    selectedGenre,
    changeGenre: onGenreChange,
    shows: currentPage.items,
    page: currentPage.page,
    pageCount: currentPage.pageCount,
    changePage: onPageChange,
  }
}
