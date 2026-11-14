import { useNavigate, useSearch } from '@tanstack/react-router'

/** Page root presenter: the only place that reads and changes the router (search params). */
export function usePresenter() {
  const { q, genre, page } = useSearch({ from: '/' })
  const navigate = useNavigate({ from: '/' })

  // A new query starts from scratch: genre and page are dropped.
  // `replace` keeps typing from flooding the browser history.
  const search = (query: string) => {
    const nextQuery = query.trim()
    // "lost" → "lost " is the same search: keep the selected genre and page.
    if (nextQuery === q) return
    navigate({ search: { q: nextQuery }, replace: true })
  }

  const changeGenre = (nextGenre: string | undefined) =>
    navigate({ search: (prev) => ({ ...prev, genre: nextGenre, page: undefined }) })

  const changePage = (nextPage: number) =>
    navigate({ search: (prev) => ({ ...prev, page: nextPage }) })

  return {
    query: q,
    genre,
    page,
    hasQuery: q !== '',
    search,
    changeGenre,
    changePage,
  }
}
