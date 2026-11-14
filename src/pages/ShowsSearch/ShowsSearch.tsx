import { usePresenter } from './logic/usePresenter'
import { Results } from './Results/Results'
import { SearchBar } from './SearchBar/SearchBar'

export function ShowsSearch() {
  const { query, genre, page, hasQuery, search, changeGenre, changePage } = usePresenter()

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col gap-8 px-4 py-10">
      <header>
        <h1 className="font-bold text-3xl">TV Shows Explorer</h1>
      </header>

      <SearchBar initialQuery={query} onSearch={search} />

      {hasQuery ? (
        <Results
          query={query}
          genre={genre}
          page={page}
          onGenreChange={changeGenre}
          onPageChange={changePage}
        />
      ) : (
        <p className="text-muted-foreground">Start typing to find a show.</p>
      )}
    </main>
  )
}
