import { getJson } from '#/lib/http'
import { searchShowsResponseSchema } from './schemas'
import type { Show } from './show'
import { toShow } from './toShow'

const BASE_URL = 'https://api.tvmaze.com'

/**
 * GET /search/shows?q=… — TVmaze does the searching itself and sorts by relevance.
 * Returns at most 10 shows.
 */
export async function fetchShowSearch(query: string, signal?: AbortSignal): Promise<Show[]> {
  const url = new URL('/search/shows', BASE_URL)
  url.searchParams.set('q', query)

  const data = await getJson(url, signal)
  return searchShowsResponseSchema.parse(data).map(({ show }) => toShow(show))
}
