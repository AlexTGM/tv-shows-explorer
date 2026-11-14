import { usePresenter } from './logic/usePresenter'

type Props = {
  query: string
  genre: string | undefined
  page: number
  onGenreChange: (genre: string | undefined) => void
  onPageChange: (page: number) => void
}

// Step 4: raw list of names. Cards, pagination and genre chips come in steps 5–7.
export function ShowsBrowser(props: Props) {
  const { query, shows, isEmpty } = usePresenter(props)

  if (isEmpty) {
    return <p className="text-muted-foreground">No shows found for “{query}”.</p>
  }

  return (
    <ul className="list-disc pl-6">
      {shows.map((show) => (
        <li key={show.id}>
          {show.name} <span className="text-muted-foreground">({show.genres.join(', ')})</span>
        </li>
      ))}
    </ul>
  )
}
