import { SearchX } from 'lucide-react'
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
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <SearchX aria-hidden className="size-10 text-muted-foreground" strokeWidth={1.5} />
        <p className="font-display font-semibold text-2xl">Nothing on the bill for “{query}”</p>
        <p className="text-muted-foreground">Check the spelling or try a shorter, broader word.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
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
