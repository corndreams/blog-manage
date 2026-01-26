import type { Profile } from './profile'
import { defaultProfile } from './profile'

const KEY = 'profile'

export function loadProfile(): Profile {
  const raw = localStorage.getItem(KEY)
  if (raw) {
    try { return JSON.parse(raw) as Profile } catch {}
  }
  return { ...defaultProfile }
}

export function saveProfile(p: Profile) {
  const data = { ...p, updatedAt: new Date().toISOString() }
  localStorage.setItem(KEY, JSON.stringify(data))
}