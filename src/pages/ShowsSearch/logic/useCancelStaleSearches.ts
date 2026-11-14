import { useQueryClient } from '@tanstack/react-query'
import { showQueries } from '#/queries/showQueries'

/**
 * Aborts in-flight searches for every query except the new one.
 *
 * Query normally cancels a request when its last observer unmounts. With Suspense a search
 * that is still loading never gets an observer (its render is suspended and then thrown away),
 * so "kill" keeps loading after the user typed "kill bill". We cancel it explicitly instead.
 */
export function useCancelStaleSearches() {
  const queryClient = useQueryClient()

  return (nextQuery: string) =>
    queryClient.cancelQueries({
      queryKey: showQueries.searches(),
      predicate: ({ queryKey }) => queryKey.at(-1) !== nextQuery,
    })
}
