import { api } from './api-client'

type SignInWithPasswordParams = {
  email: string
  password: string
}

type SignInWithPasswordResponse = {
  token: string
}

export async function signinWithPassword({
  email,
  password,
}: SignInWithPasswordParams): Promise<SignInWithPasswordResponse> {
  const { token } = await api
    .post('session/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithPasswordResponse>()

  return { token }
}
