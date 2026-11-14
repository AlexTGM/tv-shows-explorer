import { cn } from '#/lib/utils'
import { usePresenter } from './logic/usePresenter'

type Props = {
  genres: { name: string; count: number }[]
  selected: string | undefined
  totalCount: number
  onChange: (genre: string | undefined) => void
}

export function GenreFilter(props: Props) {
  const { isVisible, chips } = usePresenter(props)

  if (!isVisible) return null

  return (
    <ul aria-label="Filter by genre" className="flex flex-wrap gap-2">
      {chips.map(({ key, label, count, isSelected, toggle }) => (
        <li key={key}>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={isSelected}
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm',
              isSelected && 'bg-foreground text-background',
            )}
          >
            {label}
            <span className="opacity-60">{count}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
