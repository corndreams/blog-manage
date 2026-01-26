import { defineStore } from 'pinia'
import { getVisits, type VisitItem } from '@/api/visits'

function toYMD(d: Date) {
  return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() }
}

export const useVisitsStore = defineStore('visits', {
  state: () => ({
    list: [] as VisitItem[],
    total: 0,
    page: 1,
    pageSize: 10,
    loading: false,
    error: '',
    date: new Date(),
  }),
  actions: {
    async fetch(page?: number, date?: Date) {
      this.loading = true
      this.error = ''
      const d = date ?? this.date
      const ymd = toYMD(d)
      try {
        const resp = await getVisits({ page: page ?? this.page, pageSize: this.pageSize, ...ymd })
        this.list = resp.data.list
        this.total = resp.data.total
        this.page = resp.data.page
        this.pageSize = resp.data.pageSize
        this.date = d
      } catch (e: any) {
        this.error = e?.message || '获取访问记录失败'
      } finally { this.loading = false }
    },
  }
})