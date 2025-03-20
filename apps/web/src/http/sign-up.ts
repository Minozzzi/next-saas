import { api } from './api-client'

type SignUpParams = {
  name: string
  email: string
  password: string
}

export async function signUp({
  name,
  email,
  password,
}: SignUpParams): Promise<void> {
  await api.post('users', {
    json: {
      name,
      email,
      password,
    },
  })
}
