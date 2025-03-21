import ky from 'ky'

import { handleSetAuthorization } from './api-client-utils'

export const api = ky.create({
  prefixUrl: 'http://localhost:3333/',
  hooks: {
    beforeRequest: [handleSetAuthorization],
  },
})
