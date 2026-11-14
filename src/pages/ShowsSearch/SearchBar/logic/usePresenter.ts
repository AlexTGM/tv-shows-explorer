import { useDebouncer } from '@tanstack/react-pacer'
import type { ChangeEvent, FormEvent } from 'react'
import { useSyncedValue } from './useSyncedValue'

/** Long enough to skip intermediate keystrokes, short enough to feel live. */
const SEARCH_DELAY_MS = 400

type Params = {
  initialQuery: string
  onSearch: (query: string) => void
}

export function usePresenter({ initialQuery, onSearch }: Params) {
  const [value, setValue] = useSyncedValue(initialQuery)

  // One request per pause in typing instead of one per keystroke.
  const debouncer = useDebouncer(onSearch, { wait: SEARCH_DELAY_MS }, (state) => ({
    isPending: state.isPending,
  }))

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value
    setValue(nextValue)

    if (nextValue.trim() === '') {
      // Clearing the field resets the results right away: there is nothing to wait for.
      debouncer.cancel()
      onSearch('')
    } else {
      debouncer.maybeExecute(nextValue)
    }
  }

  // Enter searches immediately and drops the pending debounced call.
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    debouncer.cancel()
    onSearch(value)
  }

  return {
    value,
    isTyping: debouncer.state.isPending,
    change,
    submit,
  }
}
