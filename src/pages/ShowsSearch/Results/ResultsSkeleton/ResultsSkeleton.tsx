// Mirrors one page of results (3 cards) so the layout does not jump when data arrives.
const PLACEHOLDER_CARDS = ['first', 'second', 'third']

export function ResultsSkeleton() {
  return (
    <output aria-label="Loading shows" className="grid gap-4 sm:grid-cols-3">
      {PLACEHOLDER_CARDS.map((key) => (
        <div key={key} className="aspect-[2/3] animate-pulse rounded-md bg-muted" />
      ))}
    </output>
  )
}
