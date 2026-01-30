import http from "./http";

export interface LinkItem {
  id: number;
  name: string;
  icon: string | null;
  url: string;
  created_at: string;
  updated_at: string | null;
}

export interface GetLinksResp {
  code: number;
  msg: string;
  data: LinkItem[];
}

export async function getLinks() {
  const res = await http.get<GetLinksResp>("/links");
  return res.data;
}

export interface LinkEditPayload {
  id?: number;
  name: string;
  icon?: string;
  url: string;
}
export interface LinkEditResp {
  code: number;
  msg: string;
  data?: { id: number };
}

export async function postLinkEdit(payload: LinkEditPayload) {
  const params = new URLSearchParams();
  if (payload.id !== undefined && payload.id !== null)
    params.set("id", String(payload.id));
  params.set("name", payload.name);
  if (payload.icon) params.set("icon", payload.icon);
  params.set("url", payload.url);
  const res = await http.post<LinkEditResp>("/links/edit", params);
  return res.data;
}

export interface DeleteLinkResp {
  code: number;
  msg: string;
}
export async function deleteLink(id: number) {
  const res = await http.delete<DeleteLinkResp>(`/links/${id}`);
  return res.data;
}
