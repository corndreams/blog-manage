import http from './http'

export interface GetCommentsParams {
  page: number
  pageSize: number
  article_id?: number
}

export interface CommentItemResp {
  id: number
  article_id: number
  user_id: number | null
  name: string
  content: string
  parent_id: number | null
  link: string | null
  email: string | null
  avatar: string | null
  ip: string | null
  created_at: string
  updated_at: string | null
  article_title: string
  children_count: number
}

export interface GetCommentsResp {
  code: number
  msg: string
  data: { list: CommentItemResp[]; total: number; page: number; pageSize: number }
}

export async function getComments(params: GetCommentsParams) {
  const res = await http.get<GetCommentsResp>('/comments', { params })
  return res.data
}

export interface DeleteResp { code: number; msg: string }
export async function deleteComment(id: number) {
  const res = await http.delete<DeleteResp>(`/comments/${id}`)
  return res.data
}