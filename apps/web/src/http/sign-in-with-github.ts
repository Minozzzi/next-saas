import { api } from './api-client'

type SignInWithGithubParams = {
  code: string
}

type SignInWithGithubResponse = {
  token: string
}

export async function signInWithGithub({
  code,
}: SignInWithGithubParams): Promise<SignInWithGithubResponse> {
  const { token } = await api
    .post('session/github', {
      json: {
        code,
      },
    })
    .json<SignInWithGithubResponse>()

  return { token }
}
