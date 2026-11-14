import { ArrowUpRight, Star, Tv } from 'lucide-react'
import { type ShowCardData, usePresenter } from './logic/usePresenter'

export type { ShowCardData }

type Props = {
  show: ShowCardData
}

export function ShowCard(props: Props) {
  const { name, posterUrl, years, rating, channel, genres, summary, url } = usePresenter(props)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-black/40 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
      <div className="relative aspect-[210/295] overflow-hidden bg-muted">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${name} poster`}
            width={210}
            height={295}
            loading="lazy"
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-muted to-card text-muted-foreground">
            <Tv aria-hidden className="size-12" strokeWidth={1.25} />
            <span className="text-xs uppercase tracking-widest">No poster</span>
          </div>
        )}
        {/* Fades the poster into the card so the title reads as part of it. */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent" />
        {rating && (
          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 font-semibold text-primary text-sm tabular-nums backdrop-blur">
            <Star aria-hidden className="size-3.5 fill-current" />
            <span className="sr-only">Rating</span>
            {rating}
          </span>
        )}
      </div>

      <div className="relative -mt-6 flex flex-1 flex-col gap-2 px-4 pb-4">
        <h2 className="font-display font-semibold text-xl leading-tight">{name}</h2>
        <p className="text-muted-foreground text-sm">
          {[years, channel].filter(Boolean).join(' · ')}
        </p>
        {genres.length > 0 && (
          <ul aria-label="Genres" className="flex flex-wrap gap-1.5">
            {genres.map((genre) => (
              <li
                key={genre}
                className="rounded-full border px-2 py-0.5 text-muted-foreground text-xs"
              >
                {genre}
              </li>
            ))}
          </ul>
        )}
        {summary && <p className="line-clamp-3 text-foreground/80 text-sm">{summary}</p>}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-auto flex items-center gap-1 pt-2 font-semibold text-primary text-sm after:absolute after:inset-0 hover:underline hover:underline-offset-4"
        >
          Open on TVmaze <ArrowUpRight aria-hidden className="size-4" />
        </a>
      </div>
    </article>
  )
}
