import http from './http'

export interface GetArticlesParams { page: number; pageSize: number }

export interface ArticleListItem {
  id: number
  title: string
  description: string
  cover: string
  category_id: number
  category_name: string
  state: 0 | 1
  views: number
  created_at: string
  updated_at: string
  tags: string
}

export interface GetArticlesResp {
  code: number
  msg: string
  data: { list: ArticleListItem[]; total?: number }
}

export async function getArticles(params: GetArticlesParams) {
  const res = await http.get<GetArticlesResp>('/articles', { params })
  return res.data
}

export interface ArticleDetailTag { id: number; name: string }
export interface ArticleDetail {
  id: number
  title: string
  description: string | null
  content: string | null
  cover: string | null
  category_id: number
  state: 0 | 1
  created_at: string
  updated_at: string | null
  category_name: string
  tags: ArticleDetailTag[]
}

export interface ArticleDetailResp {
  code: number
  msg: string
  data: ArticleDetail
}

export async function getArticle(id: number) {
  const res = await http.get<ArticleDetailResp>(`/articles/${id}`)
  return res.data
}

export interface EditArticlePayload {
  id?: number
  title: string
  description?: string
  content?: string
  cover?: string
  category_id: number
  tagIds: number[]
  state: 0 | 1
}

export interface EditArticleResp {
  code: number
  msg: string
  data?: any
}

export async function postArticleEdit(payload: EditArticlePayload) {
  const params = new URLSearchParams()
  if (payload.id !== undefined && payload.id !== null) {
    params.set('id', String(payload.id))
  }
  params.set('title', payload.title)
  if (payload.description) params.set('description', payload.description)
  if (payload.content) params.set('content', payload.content)
  if (payload.cover) params.set('cover', payload.cover)
  params.set('category_id', String(payload.category_id))
  payload.tagIds.forEach((id) => params.append('tagIds', String(id)))
  params.set('state', String(payload.state))
  const res = await http.post<EditArticleResp>('/articles/edit', params)
  return res.data
}

export async function uploadImage(filename: string, dataUrl: string) {
  const res = await http.post<{ code: number; msg: string; data: { url: string } }>(
    'files/upload',
    { filename, data: dataUrl }
  )
  return res.data
}