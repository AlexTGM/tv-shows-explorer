import { ShowCard, type ShowCardData } from './ShowCard/ShowCard'

type Props = {
  shows: (ShowCardData & { id: number })[]
}

export function ShowList({ shows }: Props) {
  return (
    <ul className="grid gap-6 sm:grid-cols-3">
      {shows.map((show) => (
        <li key={show.id} className="fade-in slide-in-from-bottom-2 animate-in duration-500">
          <ShowCard show={show} />
        </li>
      ))}
    </ul>
  )
}
