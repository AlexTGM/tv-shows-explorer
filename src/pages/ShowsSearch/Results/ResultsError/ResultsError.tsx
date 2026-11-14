import type { FallbackProps } from 'react-error-boundary'
import { usePresenter } from './logic/usePresenter'

export function ResultsError(props: FallbackProps) {
  const { title, description, retry } = usePresenter(props)

  return (
    <div role="alert" className="flex flex-col items-start gap-3 rounded-md border p-6">
      <p className="font-semibold">{title}</p>
      <p className="text-muted-foreground text-sm">{description}</p>
      <button type="button" onClick={retry} className="rounded-md border px-4 py-2">
        Try again
      </button>
    </div>
  )
}
