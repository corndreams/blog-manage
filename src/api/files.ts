import http from './http'

export interface FileItem {
  id: number
  url: string
  file_name: string
  format: string
  size: number
  created_at: string
}

export interface GetFilesParams { page: number; pageSize: number }
export interface GetFilesResp {
  code: number
  msg: string
  data: { list: FileItem[]; total?: number; page: number; pageSize: number }
}

export async function getFiles(params: GetFilesParams) {
  const res = await http.get<GetFilesResp>('/files/list', { params })
  return res.data
}