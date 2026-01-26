import http from './http'

export interface SummaryResp {
  code: number
  msg: string
  data: { articles: number; diaries: number; comments: number; messages: number }
}

export async function getSummary() {
  const res = await http.get<SummaryResp>('/dashboard/summary')
  return res.data
}

export interface SeriesPoint { label: string; count: number }
export interface SeriesResp { code: number; msg: string; data: SeriesPoint[] }

export async function getVisitsVolume(period: 'week' | 'year') {
  const res = await http.get<SeriesResp>('/dashboard/visits/volume', { params: { period } })
  return res.data
}

export async function getVisitorsVolume(period: 'week' | 'year') {
  const res = await http.get<SeriesResp>('/dashboard/visits/visitors', { params: { period } })
  return res.data
}