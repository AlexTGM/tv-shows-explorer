import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '#/lib/utils'
import { usePresenter } from './logic/usePresenter'

type Props = {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

const buttonClass =
  'flex size-9 items-center justify-center rounded-md border disabled:pointer-events-none disabled:opacity-40'

export function Pagination(props: Props) {
  const { isVisible, pages, canGoBack, canGoForward, goBack, goForward } = usePresenter(props)

  if (!isVisible) return null

  return (
    <nav aria-label="Pages" className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={goBack}
        disabled={!canGoBack}
        aria-label="Previous page"
        className={buttonClass}
      >
        <ChevronLeft aria-hidden className="size-4" />
      </button>

      <ul className="flex gap-2">
        {pages.map(({ number, isCurrent, select }) => (
          <li key={number}>
            <button
              type="button"
              onClick={select}
              aria-current={isCurrent ? 'page' : undefined}
              aria-label={`Page ${number}`}
              className={cn(buttonClass, isCurrent && 'bg-foreground text-background')}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={goForward}
        disabled={!canGoForward}
        aria-label="Next page"
        className={buttonClass}
      >
        <ChevronRight aria-hidden className="size-4" />
      </button>
    </nav>
  )
}
