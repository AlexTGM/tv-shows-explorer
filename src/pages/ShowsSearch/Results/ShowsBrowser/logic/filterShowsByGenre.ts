/** No genre means no filter: every show is returned. */
export function filterShowsByGenre<T extends { genres: string[] }>(
  shows: T[],
  genre: string | undefined,
): T[] {
  if (genre === undefined) return shows
  return shows.filter((show) => show.genres.includes(genre))
}
