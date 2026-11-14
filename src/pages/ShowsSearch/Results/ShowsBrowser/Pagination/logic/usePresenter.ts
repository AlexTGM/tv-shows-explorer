type Params = {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

export function usePresenter({ page, pageCount, onPageChange }: Params) {
  // TVmaze returns at most 10 shows → at most 4 pages, so every page number fits on screen.
  const pages = Array.from({ length: pageCount }, (_, index) => {
    const number = index + 1
    return {
      number,
      isCurrent: number === page,
      select: () => onPageChange(number),
    }
  })

  return {
    isVisible: pageCount > 1,
    pages,
    canGoBack: page > 1,
    canGoForward: page < pageCount,
    goBack: () => onPageChange(page - 1),
    goForward: () => onPageChange(page + 1),
  }
}
