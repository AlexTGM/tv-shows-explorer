type PageSlice<T> = {
  items: T[]
  /** The requested page clamped to 1…pageCount: `?page=99` shows the last page. */
  page: number
  pageCount: number
}

export function paginate<T>(items: T[], page: number, pageSize: number): PageSlice<T> {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(Math.max(1, page), pageCount)
  const start = (currentPage - 1) * pageSize

  return {
    items: items.slice(start, start + pageSize),
    page: currentPage,
    pageCount,
  }
}
