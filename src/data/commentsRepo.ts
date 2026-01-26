import type { CommentItem } from './comments'
import { commentsSeed } from './comments'

const KEY = 'comments'

export function loadComments(): CommentItem[] {
  const raw = localStorage.getItem(KEY)
  if (raw) {
    try { return JSON.parse(raw) as CommentItem[] } catch {}
  }
  return [...commentsSeed]
}

export function saveComments(list: CommentItem[]) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function upsertComment(item: CommentItem) {
  const list = loadComments()
  const idx = list.findIndex(c => c.id === item.id)
  if (idx >= 0) list[idx] = item
  else list.push(item)
  saveComments(list)
  return list
}

export function removeComment(id: number) {
  const list = loadComments().filter(c => c.id !== id)
  saveComments(list)
}