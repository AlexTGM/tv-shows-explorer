import { Clapperboard } from 'lucide-react'
import { usePresenter } from './logic/usePresenter'

type Props = {
  onPick: (query: string) => void
}

export function IdleState(props: Props) {
  const { suggestions } = usePresenter(props)

  return (
    <section className="flex flex-col items-center gap-5 py-10 text-center">
      <Clapperboard aria-hidden className="size-10 text-primary/80" strokeWidth={1.5} />
      <div className="flex flex-col gap-1">
        <h2 className="font-display font-semibold text-2xl">What are we watching tonight?</h2>
        <p className="text-muted-foreground">
          Type a title, a word or a theme. Or try one of these:
        </p>
      </div>
      <ul aria-label="Search ideas" className="flex flex-wrap justify-center gap-2">
        {suggestions.map(({ query, pick }) => (
          <li key={query}>
            <button
              type="button"
              onClick={pick}
              className="rounded-full border bg-card/60 px-4 py-1.5 text-sm transition hover:border-primary/60 hover:text-primary"
            >
              {query}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
