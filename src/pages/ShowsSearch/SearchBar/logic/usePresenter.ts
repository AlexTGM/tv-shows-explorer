import type { FormEvent } from 'react'

type Params = {
  initialQuery: string
  onSearch: (query: string) => void
}

export function usePresenter({ initialQuery, onSearch }: Params) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = new FormData(event.currentTarget).get('q')
    onSearch(typeof query === 'string' ? query : '')
  }

  return { initialQuery, submit }
}
