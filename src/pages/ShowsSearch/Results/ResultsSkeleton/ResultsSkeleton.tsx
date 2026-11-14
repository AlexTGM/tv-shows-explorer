// Mirrors the results layout (genre chips + 3 cards) so nothing jumps when data arrives.
const PLACEHOLDER_CHIPS = ['a', 'b', 'c', 'd']
const PLACEHOLDER_CARDS = ['first', 'second', 'third']

export function ResultsSkeleton() {
  return (
    <output aria-label="Loading shows" className="flex animate-pulse flex-col gap-6">
      <div className="flex gap-2">
        {PLACEHOLDER_CHIPS.map((key) => (
          <div key={key} className="h-8 w-20 rounded-full bg-muted" />
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {PLACEHOLDER_CARDS.map((key) => (
          <div key={key} className="overflow-hidden rounded-xl border bg-card">
            <div className="aspect-[210/295] bg-muted" />
            <div className="flex flex-col gap-2 p-4">
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </output>
  )
}
