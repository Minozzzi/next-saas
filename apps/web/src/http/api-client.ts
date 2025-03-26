import ky from 'ky'
import {env } from '@saas/env'
import { handleSetAuthorization } from './api-client-utils'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [handleSetAuthorization],
  },
})
