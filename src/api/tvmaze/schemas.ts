import { z } from 'zod'

// Only the fields the app uses are described: zod strips the rest.
// TVmaze does send optional fields as null (no poster, no rating, no channel).
const channelSchema = z.object({ name: z.string() })

const showSchema = z.object({
  id: z.number(),
  url: z.string(),
  name: z.string(),
  genres: z.array(z.string()),
  status: z.string().nullish(),
  premiered: z.string().nullish(),
  ended: z.string().nullish(),
  rating: z.object({ average: z.number().nullish() }).nullish(),
  network: channelSchema.nullish(),
  webChannel: channelSchema.nullish(),
  image: z.object({ medium: z.string(), original: z.string() }).nullish(),
  summary: z.string().nullish(),
})

export const searchShowsResponseSchema = z.array(z.object({ score: z.number(), show: showSchema }))

export type ShowDto = z.infer<typeof showSchema>
