import { usePresenter } from './logic/usePresenter'
import { ShowList } from './ShowList/ShowList'

type Props = {
  query: string
  genre: string | undefined
  page: number
  onGenreChange: (genre: string | undefined) => void
  onPageChange: (page: number) => void
}

// Pagination and genre chips come in steps 6–7.
export function ShowsBrowser(props: Props) {
  const { query, shows, isEmpty } = usePresenter(props)

  if (isEmpty) {
    return <p className="text-muted-foreground">No shows found for “{query}”.</p>
  }

  return <ShowList shows={shows} />
}
