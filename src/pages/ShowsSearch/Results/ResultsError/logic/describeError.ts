import { ZodError } from 'zod'
import { HttpError } from '#/lib/http'

type ErrorText = { title: string; description: string }

const TOO_MANY_REQUESTS = 429

/** Turns whatever was thrown into text a user can act on. */
export function describeError(error: unknown): ErrorText {
  if (error instanceof HttpError && error.status === TOO_MANY_REQUESTS) {
    return {
      title: 'Too many searches',
      description: 'TVmaze limits how often it can be asked. Wait a few seconds and try again.',
    }
  }
  if (error instanceof HttpError) {
    return {
      title: 'TVmaze is not responding properly',
      description: `The server answered with status ${error.status}. Try again in a moment.`,
    }
  }
  if (error instanceof ZodError) {
    return {
      title: 'Unexpected data from TVmaze',
      description: 'The response did not look like a list of shows. Try another search.',
    }
  }
  return {
    title: 'Could not load shows',
    description: 'Check your internet connection and try again.',
  }
}
