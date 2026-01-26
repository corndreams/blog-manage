import http from './http'

export interface GetMessagesParams { page: number; pageSize: number }
export interface MessageItemResp {
  id: number
  name: string
  content: string
  ip: string | null
  created_at: string
}
export interface GetMessagesResp {
  code: number
  msg: string
  data: { list: MessageItemResp[]; total: number; page: number; pageSize: number }
}

export async function getMessages(params: GetMessagesParams) {
  const res = await http.get<GetMessagesResp>('/messages', { params })
  return res.data
}

export interface DeleteResp { code: number; msg: string }
export async function deleteMessage(id: number) {
  const res = await http.delete<DeleteResp>(`/messages/${id}`)
  return res.data
}
