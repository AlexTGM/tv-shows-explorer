/** A show as the app sees it: without TVmaze's extra fields and nesting. */
export type Show = {
  id: number
  name: string
  genres: string[]
  /** Running, Ended, To Be Determined… */
  status: string | null
  startYear: number | null
  endYear: number | null
  /** Average rating from 0 to 10. */
  rating: number | null
  /** TV network or streaming service (Netflix etc.). */
  channel: string | null
  posterUrl: string | null
  /** Plain-text description: HTML from the API is already stripped. */
  summary: string | null
  /** The show's page on tvmaze.com. */
  url: string
}
