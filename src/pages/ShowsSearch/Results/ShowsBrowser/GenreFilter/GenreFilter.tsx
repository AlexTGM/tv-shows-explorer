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
    <ul aria-label="Filter by genre" className="flex flex-wrap justify-center gap-2">
      {chips.map(({ key, label, count, isSelected, toggle }) => (
        <li key={key}>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={isSelected}
            className={cn(
              'flex items-center gap-2 rounded-full border bg-card/60 px-4 py-1.5 font-medium text-sm transition',
              'hover:border-primary/60 hover:text-primary',
              isSelected &&
                'border-primary bg-primary text-primary-foreground shadow-[0_0_20px] shadow-primary/30 hover:text-primary-foreground',
            )}
          >
            {label}
            <span
              className={cn(
                'rounded-full bg-muted px-1.5 text-muted-foreground text-xs tabular-nums',
                isSelected && 'bg-primary-foreground/15 text-primary-foreground',
              )}
            >
              {count}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
