import { RotateCw, TriangleAlert } from 'lucide-react'
import type { FallbackProps } from 'react-error-boundary'
import { usePresenter } from './logic/usePresenter'

export function ResultsError(props: FallbackProps) {
  const { title, description, retry } = usePresenter(props)

  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-xl border border-destructive/40 bg-destructive/10 p-8 text-center"
    >
      <TriangleAlert aria-hidden className="size-8 text-destructive" strokeWidth={1.5} />
      <div className="flex flex-col gap-1">
        <p className="font-display font-semibold text-xl">{title}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <button
        type="button"
        onClick={retry}
        className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground text-sm transition hover:brightness-110"
      >
        <RotateCw aria-hidden className="size-4" />
        Try again
      </button>
    </div>
  )
}
