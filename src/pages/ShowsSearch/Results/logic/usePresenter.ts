import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useDeferredValue } from 'react'

type Params = {
  query: string
  genre: string | undefined
  page: number
}

export function usePresenter({ query, genre, page }: Params) {
  // While the new query is loading (suspended), React keeps rendering the previous results
  // instead of flashing the skeleton. All three values switch together once data is ready.
  const deferredQuery = useDeferredValue(query)
  const deferredGenre = useDeferredValue(genre)
  const deferredPage = useDeferredValue(page)

  // Lets "Retry" refetch a failed query instead of re-throwing the cached error.
  const { reset } = useQueryErrorResetBoundary()

  return {
    query: deferredQuery,
    genre: deferredGenre,
    page: deferredPage,
    isStale: query !== deferredQuery,
    resetQueryErrors: reset,
  }
}
