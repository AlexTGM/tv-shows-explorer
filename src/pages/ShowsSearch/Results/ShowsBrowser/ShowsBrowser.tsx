import { GenreFilter } from './GenreFilter/GenreFilter'
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

export function ShowsBrowser(props: Props) {
  const {
    query,
    isEmpty,
    totalCount,
    genres,
    selectedGenre,
    changeGenre,
    shows,
    page,
    pageCount,
    changePage,
  } = usePresenter(props)

  if (isEmpty) {
    return <p className="text-muted-foreground">No shows found for “{query}”.</p>
  }

  return (
    <div className="flex flex-col gap-6">
      <GenreFilter
        genres={genres}
        selected={selectedGenre}
        totalCount={totalCount}
        onChange={changeGenre}
      />
      <ShowList shows={shows} />
      <Pagination page={page} pageCount={pageCount} onPageChange={changePage} />
    </div>
  )
}
