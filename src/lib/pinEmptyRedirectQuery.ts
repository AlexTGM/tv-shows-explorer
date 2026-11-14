/**
 * Netlify copies the request's query string into a redirect `Location` that has none.
 *
 * TanStack Router redirects non-canonical URLs on the server: `/?page=-3` → `/`. Behind Netlify
 * that response arrives as `Location: /?page=-3`, so the browser loops forever. An explicit empty
 * query (`https://host/?`) leaves Netlify nothing to fill in; the next request has empty search
 * params, which is already canonical.
 */
export function pinEmptyRedirectQuery(response: Response, requestUrl: string): Response {
  const location = response.headers.get('Location')
  const isRedirect = response.status >= 300 && response.status < 400
  if (!isRedirect || location === null) return response

  const target = new URL(location, requestUrl)
  if (target.search !== '') return response

  const headers = new Headers(response.headers)
  headers.set('Location', `${target.origin}${target.pathname}?${target.hash}`)
  return new Response(response.body, { status: response.status, headers })
}
