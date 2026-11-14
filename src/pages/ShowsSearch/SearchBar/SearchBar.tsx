import { LoaderCircle, Search } from 'lucide-react'
import { usePresenter } from './logic/usePresenter'

type Props = {
  initialQuery: string
  onSearch: (query: string) => void
}

export function SearchBar(props: Props) {
  const { value, isTyping, change, submit } = usePresenter(props)

  return (
    <search>
      <form onSubmit={submit} className="relative">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 opacity-60"
        />
        <input
          type="search"
          value={value}
          onChange={change}
          placeholder="Search shows, e.g. murder"
          aria-label="Search shows"
          autoComplete="off"
          className="w-full rounded-md border py-2 pr-10 pl-9"
        />
        {isTyping && (
          <LoaderCircle
            aria-label="Waiting for you to stop typing"
            className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin opacity-60"
          />
        )}
      </form>
    </search>
  )
}
