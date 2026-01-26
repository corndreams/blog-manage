import { defineStore } from 'pinia'
import { getCategories, getTags, type CategoryItemResp, type TagItemResp } from '@/api/taxonomy'

export const useTaxonomyStore = defineStore('taxonomy', {
  state: () => ({
    categories: [] as CategoryItemResp[],
    tags: [] as TagItemResp[],
    loading: false,
    error: '',
  }),
  actions: {
    async fetchCategories() {
      this.loading = true
      this.error = ''
      try {
        const data = await getCategories()
        this.categories = data.data
      } catch (e: any) {
        this.error = e?.message || '获取分类失败'
      } finally { this.loading = false }
    },
    async fetchTags() {
      this.loading = true
      this.error = ''
      try {
        const data = await getTags()
        this.tags = data.data
      } catch (e: any) {
        this.error = e?.message || '获取标签失败'
      } finally { this.loading = false }
    },
    async ensureLoaded() {
      if (this.categories.length === 0) await this.fetchCategories()
      if (this.tags.length === 0) await this.fetchTags()
    },
  }
})