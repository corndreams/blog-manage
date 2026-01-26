import { defineStore } from 'pinia'
import { getArticles, type GetArticlesParams, type ArticleListItem } from '@/api/articles'

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    list: [] as ArticleListItem[],
    total: 0,
    page: 1,
    pageSize: 10,
    loading: false,
    error: '',
  }),
  getters: {
    statusText: () => (s: 0|1) => s === 1 ? '已发布' : '草稿',
    statusType: () => (s: 0|1) => s === 1 ? 'success' : 'warning',
  },
  actions: {
    async fetch(params?: Partial<GetArticlesParams>) {
      this.loading = true
      this.error = ''
      const query: GetArticlesParams = { page: params?.page ?? this.page, pageSize: params?.pageSize ?? this.pageSize }
      try {
        const data = await getArticles(query)
        this.list = data.data.list
        this.total = data.data.total ?? data.data.list.length
        this.page = query.page
        this.pageSize = query.pageSize
      } catch (e: any) {
        this.error = e?.message || '请求失败'
      } finally {
        this.loading = false
      }
    },
    setPage(p: number) { this.page = p },
    setPageSize(ps: number) { this.pageSize = ps },
  }
})