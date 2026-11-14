export type GenreCount = {
  name: string
  count: number
}

/**
 * Unique genres across all results with how many shows have each one.
 * Most common first, so the chips start with the genres that matter for this search.
 */
export function collectGenres(shows: { genres: string[] }[]): GenreCount[] {
  const counts = new Map<string, number>()
  for (const show of shows) {
    for (const genre of show.genres) counts.set(genre, (counts.get(genre) ?? 0) + 1)
  }

  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}
