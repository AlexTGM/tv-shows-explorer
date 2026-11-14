import { useState } from 'react'

/**
 * Local input value that follows the query from the URL.
 *
 * The field keeps its own state while the user types. When the URL query changes from outside
 * (browser back/forward), the field picks it up — unless it already shows the same query,
 * so the URL catching up with "lost " never eats the user's trailing space.
 */
export function useSyncedValue(query: string) {
  const [value, setValue] = useState(query)
  const [syncedQuery, setSyncedQuery] = useState(query)

  // Adjusting state during render is React's recommended alternative to a syncing effect:
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (query !== syncedQuery) {
    setSyncedQuery(query)
    if (value.trim() !== query) setValue(query)
  }

  return [value, setValue] as const
}
