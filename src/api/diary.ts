import http from './http'

export interface DiaryListItem {
  id: number
  title: string
  content: string
  state: 0 | 1
  created_at: string
  updated_at: string | null
  diary_time: string | null
}

export interface GetDiaryListParams { page: number; pageSize: number }
export interface GetDiaryListResp {
  code: number
  msg: string
  data: { list: DiaryListItem[]; total: number; page: number; pageSize: number }
}

export async function getDiaryList(params: GetDiaryListParams) {
  const res = await http.get<GetDiaryListResp>('/diary/list', { params })
  return res.data
}

export interface DiaryDetailResp {
  code: number
  msg: string
  data: { id: number; title: string; content: string; created_at: string; updated_at: string | null; diary_time: string | null }
}

export async function getDiary(id: number) {
  const res = await http.get<DiaryDetailResp>(`/diary/${id}`)
  return res.data
}

export interface DiaryEditPayload { id?: number; title: string; content: string; state: 0 | 1; time?: string }
export interface DiaryEditResp { code: number; msg: string; data: { id: number } }

export async function postDiaryEdit(payload: DiaryEditPayload) {
  const params = new URLSearchParams()
  if (payload.id !== undefined && payload.id !== null) params.set('id', String(payload.id))
  params.set('title', payload.title)
  params.set('content', payload.content)
  params.set('state', String(payload.state))
  if (payload.time) params.set('time', payload.time)
  const res = await http.post<DiaryEditResp>('/diary/edit', params)
  return res.data
}

export interface DeleteDiaryResp { code: number; msg: string }
export async function deleteDiary(id: number) {
  const res = await http.delete<DeleteDiaryResp>(`/diary/${id}`)
  return res.data
}