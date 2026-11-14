export class HttpError extends Error {
  readonly status: number

  constructor(status: number, url: string) {
    super(`Request to ${url} failed with status ${status}`)
    this.name = 'HttpError'
    this.status = status
  }
}

/**
 * GET request that returns JSON as `unknown`: the caller validates its shape (a zod schema in api).
 * `signal` lets the request be cancelled once it is no longer needed.
 */
export async function getJson(url: URL, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } })
  if (!response.ok) throw new HttpError(response.status, url.toString())
  return response.json()
}
