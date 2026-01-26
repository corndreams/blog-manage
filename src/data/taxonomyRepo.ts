import type { CategoryItem, TagItem } from './taxonomy'
import { categorySeed, tagSeed } from './taxonomy'

const CK = 'categories'
const TK = 'tags'

export function loadCategories(): CategoryItem[] {
  const raw = localStorage.getItem(CK)
  if (raw) { try { return JSON.parse(raw) as CategoryItem[] } catch {} }
  return [...categorySeed]
}
export function saveCategories(list: CategoryItem[]) { localStorage.setItem(CK, JSON.stringify(list)) }

export function loadTags(): TagItem[] {
  const raw = localStorage.getItem(TK)
  if (raw) { try { return JSON.parse(raw) as TagItem[] } catch {} }
  return [...tagSeed]
}
export function saveTags(list: TagItem[]) { localStorage.setItem(TK, JSON.stringify(list)) }

export function upsertCategory(item: CategoryItem): CategoryItem[] {
  const list = loadCategories()
  const idx = list.findIndex(c => c.id === item.id)
  if (idx >= 0) list[idx] = item
  else list.push(item)
  saveCategories(list)
  return list
}

export function upsertTag(item: TagItem): TagItem[] {
  const list = loadTags()
  const idx = list.findIndex(t => t.id === item.id)
  if (idx >= 0) list[idx] = item
  else list.push(item)
  saveTags(list)
  return list
}

export function removeCategory(id: number) { saveCategories(loadCategories().filter(c => c.id !== id)) }
export function removeTag(id: number) { saveTags(loadTags().filter(t => t.id !== id)) }