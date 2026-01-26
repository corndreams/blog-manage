export interface CategoryItem { id: number; name: string; slug: string; desc?: string }
export interface TagItem { id: number; name: string; slug: string; desc?: string }

export const categorySeed: CategoryItem[] = [
  { id: 1, name: '工具', slug: 'tools', desc: '' },
  { id: 2, name: '前端', slug: 'frontend', desc: '' },
  { id: 3, name: '后端', slug: 'backend', desc: '' },
  { id: 4, name: '项目', slug: 'project', desc: '' },
  { id: 5, name: '建站', slug: 'site', desc: '' },
]

export const tagSeed: TagItem[] = [
  { id: 1, name: 'vue', slug: 'vue', desc: '' },
  { id: 2, name: 'hexo', slug: 'hexo', desc: '' },
  { id: 3, name: 'github', slug: 'github', desc: '' },
  { id: 4, name: 'mock', slug: 'mock', desc: '' },
  { id: 5, name: '项目', slug: 'project', desc: '' },
]