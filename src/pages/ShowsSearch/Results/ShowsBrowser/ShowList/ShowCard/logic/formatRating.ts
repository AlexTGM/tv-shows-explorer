/** 8 → "8.0", 7.45 → "7.5"; no rating → null so the badge is not rendered at all. */
export function formatRating(rating: number | null): string | null {
  return rating === null ? null : rating.toFixed(1)
}
