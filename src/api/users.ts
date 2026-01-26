import http from './http'

export interface UserInfo {
  id: number
  user_id: number
  avatar: string | null
  name: string
  tagline: string | null
  quote: string | null
  mbti: string | null
  mbti_intro: string | null
  about: string | null
  created_at: string
  updated_at: string | null
}

export interface UserInfoResp {
  code: number
  msg: string
  data: UserInfo
}

export async function getUserInfo() {
  const res = await http.get<UserInfoResp>('/users/info')
  return res.data
}

export interface UpdateUserInfoPayload {
  avatar?: string
  name: string
  tagline?: string
  quote?: string
  mbti?: string
  mbti_intro?: string
  about?: string
}

export interface UpdateResp { code: number; msg: string }

export async function updateUserInfo(payload: UpdateUserInfoPayload) {
  const params = new URLSearchParams()
  if (payload.avatar) params.set('avatar', payload.avatar)
  params.set('name', payload.name)
  if (payload.tagline) params.set('tagline', payload.tagline)
  if (payload.quote) params.set('quote', payload.quote)
  if (payload.mbti) params.set('mbti', payload.mbti)
  if (payload.mbti_intro) params.set('mbti_intro', payload.mbti_intro)
  if (payload.about) params.set('about', payload.about)
  const res = await http.put<UpdateResp>('/users/info', params)
  return res.data
}