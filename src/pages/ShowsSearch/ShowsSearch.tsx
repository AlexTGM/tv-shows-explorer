import { IdleState } from './IdleState/IdleState'
import { usePresenter } from './logic/usePresenter'
import { Results } from './Results/Results'
import { SearchBar } from './SearchBar/SearchBar'

export function ShowsSearch() {
  const { query, genre, page, hasQuery, search, changeGenre, changePage } = usePresenter()

  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-4 sm:px-6">
      <header className="flex flex-col items-center gap-3 pt-14 pb-8 text-center sm:pt-20">
        <p className="flex items-center gap-2 font-semibold text-primary text-xs uppercase tracking-[0.3em]">
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary"
          />
          Now showing
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary"
          />
        </p>
        <h1 className="font-display font-semibold text-4xl italic tracking-tight sm:text-6xl">
          TV Shows Explorer
        </h1>
      </header>

      <main className="flex flex-1 flex-col gap-10 pb-16">
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
          <IdleState onPick={search} />
        )}
      </main>

      <footer className="border-t py-6 text-center text-muted-foreground text-xs">
        Show data and posters from{' '}
        <a
          href="https://www.tvmaze.com/api"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          TVmaze
        </a>{' '}
        (CC BY-SA)
      </footer>
    </div>
  )
}
