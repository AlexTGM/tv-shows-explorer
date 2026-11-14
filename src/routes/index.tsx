import { createFileRoute, stripSearchParams } from '@tanstack/react-router'
import { z } from 'zod'
import { ShowsSearch } from '#/pages/ShowsSearch/ShowsSearch'

const searchDefaults = { q: '', page: 1 }

// Search state lives in the URL. Broken or missing params fall back to defaults instead of failing.
const searchSchema = z.object({
  q: z.string().trim().default(searchDefaults.q).catch(searchDefaults.q),
  genre: z.string().min(1).optional().catch(undefined),
  page: z.coerce.number().int().min(1).default(searchDefaults.page).catch(searchDefaults.page),
})

export const Route = createFileRoute('/')({
  validateSearch: searchSchema,
  // Keep URLs clean: `/?q=murder` instead of `/?q=murder&page=1`.
  search: { middlewares: [stripSearchParams(searchDefaults)] },
  component: ShowsSearch,
})
