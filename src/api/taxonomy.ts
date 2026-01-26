import http from './http'

export interface CategoryItemResp {
  id: number
  name: string
  alias: string
  description: string | null
  created_at: string
  updated_at: string | null
  article_count: number
}

export interface TagItemResp {
  id: number
  name: string
  alias: string
  description: string | null
  created_at: string
  updated_at: string | null
  article_count: number
}

export interface ListResp<T> {
  code: number
  msg: string
  data: T[]
}

export async function getCategories() {
  const res = await http.get<ListResp<CategoryItemResp>>('/categories')
  return res.data
}

export async function getTags() {
  const res = await http.get<ListResp<TagItemResp>>('/tags')
  return res.data
}

export async function postTagEdit(payload: TagItemResp) {
  const params = new URLSearchParams()
  if (payload.id !== undefined && payload.id !== null) {
    params.set('id', String(payload.id))
  }
  params.set('name', payload.name)
  if (payload.alias) params.set('alias', payload.alias)
  if (payload.description) params.set('description', payload.description)
  const res = await http.post<TagItemResp>('/tags/edit', params)
  return res.data
}