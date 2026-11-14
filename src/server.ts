import handler, { createServerEntry } from '@tanstack/react-start/server-entry'
import { pinEmptyRedirectQuery } from '#/lib/pinEmptyRedirectQuery'

// Custom server entry: TanStack Start's default handler plus a fix for Netlify redirect loops.
export default createServerEntry({
  async fetch(request) {
    const response = await handler.fetch(request)
    return pinEmptyRedirectQuery(response, request.url)
  },
})
