import http from './http'

export interface VisitItem {
  id: number
  path: string
  article_id: number | null
  diary_id: number | null
  ip: string | null
  user_agent: string
  device: string
  created_at: string
}

export interface GetVisitsParams {
  page: number
  pageSize: number
  year: number
  month: number
  day: number
}

export interface GetVisitsResp {
  code: number
  msg: string
  data: { list: VisitItem[]; total: number; page: number; pageSize: number }
}

export async function getVisits(params: GetVisitsParams) {
  const res = await http.get<GetVisitsResp>('/visits/list', { params })
  return res.data
}