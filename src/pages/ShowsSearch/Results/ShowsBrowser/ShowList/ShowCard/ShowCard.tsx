import { ExternalLink, Star, Tv } from 'lucide-react'
import { type ShowCardData, usePresenter } from './logic/usePresenter'

export type { ShowCardData }

type Props = {
  show: ShowCardData
}

export function ShowCard(props: Props) {
  const { name, posterUrl, years, rating, channel, genres, summary, url } = usePresenter(props)

  return (
    <article className="flex flex-col overflow-hidden rounded-md border">
      <div className="relative aspect-[210/295] bg-muted">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${name} poster`}
            width={210}
            height={295}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 opacity-60">
            <Tv aria-hidden className="size-10" />
            <span className="text-sm">No poster</span>
          </div>
        )}
        {rating && (
          <span className="absolute top-2 right-2 flex items-center gap-1 rounded-sm bg-black/70 px-2 py-1 text-sm text-white">
            <Star aria-hidden className="size-3.5 fill-current" />
            <span className="sr-only">Rating</span>
            {rating}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="font-semibold text-lg leading-tight">{name}</h2>
        <p className="text-muted-foreground text-sm">
          {[years, channel].filter(Boolean).join(' · ')}
        </p>
        {genres.length > 0 && (
          <ul aria-label="Genres" className="flex flex-wrap gap-1">
            {genres.map((genre) => (
              <li key={genre} className="rounded-sm bg-muted px-2 py-0.5 text-xs">
                {genre}
              </li>
            ))}
          </ul>
        )}
        {summary && <p className="line-clamp-3 text-sm">{summary}</p>}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-auto flex items-center gap-1 pt-2 text-sm underline-offset-4 hover:underline"
        >
          Open on TVmaze <ExternalLink aria-hidden className="size-3.5" />
        </a>
      </div>
    </article>
  )
}
