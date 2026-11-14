import { LoaderCircle, Search } from 'lucide-react'
import { usePresenter } from './logic/usePresenter'

type Props = {
  initialQuery: string
  onSearch: (query: string) => void
}

export function SearchBar(props: Props) {
  const { value, isTyping, change, submit } = usePresenter(props)

  return (
    <search className="mx-auto w-full max-w-2xl">
      <form onSubmit={submit} className="group relative">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground transition group-focus-within:text-primary"
        />
        <input
          type="search"
          value={value}
          onChange={change}
          placeholder="Search shows, e.g. murder"
          aria-label="Search shows"
          autoComplete="off"
          className="h-14 w-full rounded-full border border-input bg-card/70 pr-14 pl-14 text-lg shadow-black/40 shadow-xl outline-none backdrop-blur transition placeholder:text-muted-foreground/70 focus:border-primary/70 focus:shadow-primary/10 focus:ring-4 focus:ring-primary/15"
        />
        {isTyping && (
          <LoaderCircle
            aria-label="Waiting for you to stop typing"
            className="absolute top-1/2 right-5 size-5 -translate-y-1/2 animate-spin text-primary"
          />
        )}
      </form>
    </search>
  )
}
