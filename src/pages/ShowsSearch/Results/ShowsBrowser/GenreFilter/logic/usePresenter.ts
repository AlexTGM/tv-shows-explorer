type Params = {
  genres: { name: string; count: number }[]
  selected: string | undefined
  totalCount: number
  onChange: (genre: string | undefined) => void
}

export function usePresenter({ genres, selected, totalCount, onChange }: Params) {
  const reset = () => onChange(undefined)

  // "All" resets the filter; clicking the selected genre again resets it too.
  const chips = [
    {
      key: 'all',
      label: 'All',
      count: totalCount,
      isSelected: selected === undefined,
      toggle: reset,
    },
    ...genres.map(({ name, count }) => {
      const isSelected = name === selected
      return {
        key: name,
        label: name,
        count,
        isSelected,
        toggle: isSelected ? reset : () => onChange(name),
      }
    }),
  ]

  return {
    // Results without any genre info have nothing to filter by.
    isVisible: genres.length > 0,
    chips,
  }
}
