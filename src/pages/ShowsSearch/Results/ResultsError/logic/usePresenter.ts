import type { FallbackProps } from 'react-error-boundary'
import { describeError } from './describeError'

export function usePresenter({ error, resetErrorBoundary }: FallbackProps) {
  const { title, description } = describeError(error)

  return {
    title,
    description,
    retry: () => resetErrorBoundary(),
  }
}
