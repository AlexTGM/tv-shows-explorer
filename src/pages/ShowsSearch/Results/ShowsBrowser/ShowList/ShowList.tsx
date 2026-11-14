import { ShowCard, type ShowCardData } from './ShowCard/ShowCard'

type Props = {
  shows: (ShowCardData & { id: number })[]
}

export function ShowList({ shows }: Props) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {shows.map((show) => (
        <li key={show.id}>
          <ShowCard show={show} />
        </li>
      ))}
    </ul>
  )
}
