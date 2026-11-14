import { formatRating } from './formatRating'
import { formatYears } from './formatYears'

/** Only what the card renders: any object with these fields fits, e.g. the app's Show. */
export type ShowCardData = {
  name: string
  genres: string[]
  status: string | null
  startYear: number | null
  endYear: number | null
  rating: number | null
  channel: string | null
  posterUrl: string | null
  summary: string | null
  url: string
}

type Params = {
  show: ShowCardData
}

export function usePresenter({ show }: Params) {
  return {
    name: show.name,
    posterUrl: show.posterUrl,
    years: formatYears(show),
    rating: formatRating(show.rating),
    channel: show.channel,
    genres: show.genres,
    summary: show.summary,
    url: show.url,
  }
}
