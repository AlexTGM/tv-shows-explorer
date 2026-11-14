/** Queries that return a full, varied set of results: a quick way to see the app in action. */
const SUGGESTIONS = ['murder', 'office', 'space', 'dragon', 'doctor']

type Params = {
  onPick: (query: string) => void
}

export function usePresenter({ onPick }: Params) {
  return {
    suggestions: SUGGESTIONS.map((query) => ({ query, pick: () => onPick(query) })),
  }
}
