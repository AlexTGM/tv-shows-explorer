import { usePresenter } from './logic/usePresenter'

type Props = {
  initialQuery: string
  onSearch: (query: string) => void
}

// Step 2 stub: searches on submit only. Debounced search-as-you-type comes in step 3.
export function SearchBar(props: Props) {
  const { initialQuery, submit } = usePresenter(props)

  return (
    <search>
      <form onSubmit={submit}>
        <input
          name="q"
          type="search"
          defaultValue={initialQuery}
          placeholder="Search shows, e.g. murder"
          aria-label="Search shows"
          className="w-full rounded-md border px-4 py-2"
        />
      </form>
    </search>
  )
}
