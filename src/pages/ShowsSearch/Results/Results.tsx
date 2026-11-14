type Props = {
  query: string
  genre: string | undefined
  page: number
  onGenreChange: (genre: string | undefined) => void
  onPageChange: (page: number) => void
}

// Step 2 stub: shows the URL state it receives. ErrorBoundary + Suspense + data come in step 4.
export function Results({ query, genre, page }: Props) {
  return (
    <section aria-label="Search results" className="rounded-md border p-4 font-mono text-sm">
      <p>query: {query}</p>
      <p>genre: {genre ?? '(all)'}</p>
      <p>page: {page}</p>
    </section>
  )
}
