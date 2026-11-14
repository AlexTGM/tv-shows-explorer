import { usePresenter } from './logic/usePresenter'
import { Pagination } from './Pagination/Pagination'
import { ShowList } from './ShowList/ShowList'

type Props = {
  query: string
  genre: string | undefined
  page: number
  onGenreChange: (genre: string | undefined) => void
  onPageChange: (page: number) => void
}

// Genre chips come in step 7.
export function ShowsBrowser(props: Props) {
  const { query, isEmpty, shows, page, pageCount, changePage } = usePresenter(props)

  if (isEmpty) {
    return <p className="text-muted-foreground">No shows found for “{query}”.</p>
  }

  return (
    <div className="flex flex-col gap-6">
      <ShowList shows={shows} />
      <Pagination page={page} pageCount={pageCount} onPageChange={changePage} />
    </div>
  )
}
