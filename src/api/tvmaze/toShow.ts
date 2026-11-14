import type { ShowDto } from './schemas'
import type { Show } from './show'

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
}

/** TVmaze sends summary as HTML. Turn it into text so we never render third-party HTML. */
function toPlainText(html: string | null | undefined): string | null {
  if (!html) return null
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity] ?? entity)
    .replace(/\s+/g, ' ')
    .trim()
  return text || null
}

/** '2012-08-26' → 2012 */
function toYear(date: string | null | undefined): number | null {
  const year = Number.parseInt(date ?? '', 10)
  return Number.isNaN(year) ? null : year
}

export function toShow(dto: ShowDto): Show {
  return {
    id: dto.id,
    name: dto.name,
    genres: dto.genres,
    status: dto.status ?? null,
    startYear: toYear(dto.premiered),
    endYear: toYear(dto.ended),
    rating: dto.rating?.average ?? null,
    channel: dto.network?.name ?? dto.webChannel?.name ?? null,
    posterUrl: dto.image?.medium ?? null,
    summary: toPlainText(dto.summary),
    url: dto.url,
  }
}
