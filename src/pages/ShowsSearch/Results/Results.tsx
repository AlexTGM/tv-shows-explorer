import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { cn } from '#/lib/utils'
import { usePresenter } from './logic/usePresenter'
import { ResultsError } from './ResultsError/ResultsError'
import { ResultsSkeleton } from './ResultsSkeleton/ResultsSkeleton'
import { ShowsBrowser } from './ShowsBrowser/ShowsBrowser'

type Props = {
  query: string
  genre: string | undefined
  page: number
  onGenreChange: (genre: string | undefined) => void
  onPageChange: (page: number) => void
}

export function Results(props: Props) {
  const { query, genre, page, isStale, resetQueryErrors } = usePresenter(props)

  return (
    <section
      aria-label="Search results"
      aria-busy={isStale}
      className={cn('transition-opacity', isStale && 'opacity-50')}
    >
      {/* A new query clears a previous error by itself (resetKeys). */}
      <ErrorBoundary
        FallbackComponent={ResultsError}
        onReset={resetQueryErrors}
        resetKeys={[query]}
      >
        <Suspense fallback={<ResultsSkeleton />}>
          <ShowsBrowser
            query={query}
            genre={genre}
            page={page}
            onGenreChange={props.onGenreChange}
            onPageChange={props.onPageChange}
          />
        </Suspense>
      </ErrorBoundary>
    </section>
  )
}
