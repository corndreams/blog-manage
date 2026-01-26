import type { ArticleItem } from './articles'
import { articles as seed } from './articles'

const KEY = 'articles'

export function loadArticles(): ArticleItem[] {
  const raw = localStorage.getItem(KEY)
  if (raw) {
    try { return JSON.parse(raw) as ArticleItem[] } catch {}
  }
  return [...seed]
}

export function saveArticles(list: ArticleItem[]) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function loadArticle(id: number): ArticleItem | undefined {
  return loadArticles().find(a => a.id === id)
}

export function upsertArticle(item: ArticleItem): ArticleItem[] {
  const list = loadArticles()
  const idx = list.findIndex(a => a.id === item.id)
  if (idx >= 0) list[idx] = item
  else list.push(item)
  saveArticles(list)
  return list
}

export function removeArticle(id: number) {
  const list = loadArticles().filter(a => a.id !== id)
  saveArticles(list)
}