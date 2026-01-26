import type { MessageItem } from './messages'
import { messagesSeed } from './messages'

const KEY = 'messages'

export function loadMessages(): MessageItem[] {
  const raw = localStorage.getItem(KEY)
  if (raw) {
    try { return JSON.parse(raw) as MessageItem[] } catch {}
  }
  return [...messagesSeed]
}

export function saveMessages(list: MessageItem[]) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function removeMessage(id: number) {
  const list = loadMessages().filter(m => m.id !== id)
  saveMessages(list)
}