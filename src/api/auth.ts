import http from './http'

export interface SignInResp {
  code: number
  msg: string
  data: { token: string }
}

export async function signIn(name: string, password: string) {
  const params = new URLSearchParams()
  params.set('name', name)
  params.set('password', password)
  const res = await http.post<SignInResp>('/auth/sign_in', params)
  return res.data
}