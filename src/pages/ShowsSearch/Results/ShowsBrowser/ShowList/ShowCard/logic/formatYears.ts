type YearsInfo = {
  startYear: number | null
  endYear: number | null
  status: string | null
}

/**
 * Air years the way TV listings show them:
 * 2012–2016 (ended), 2019– (still running), 2020 (one season), null (unknown).
 */
export function formatYears({ startYear, endYear, status }: YearsInfo): string | null {
  if (startYear === null) return null
  if (endYear !== null && endYear !== startYear) return `${startYear}–${endYear}`
  if (status === 'Running') return `${startYear}–`
  return String(startYear)
}
