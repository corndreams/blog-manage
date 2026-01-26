import { defineStore } from 'pinia'
import { getDiaryList, getDiary, postDiaryEdit, deleteDiary, type DiaryListItem } from '@/api/diary'

export const useDiaryStore = defineStore('diary', {
  state: () => ({
    list: [] as DiaryListItem[],
    total: 0,
    page: 1,
    pageSize: 10,
    loading: false,
    error: '',
    detail: null as any,
  }),
  actions: {
    async fetchList(page?: number) {
      this.loading = true
      this.error = ''
      try {
        const resp = await getDiaryList({ page: page ?? this.page, pageSize: this.pageSize })
        this.list = resp.data.list
        this.total = resp.data.total
        this.page = resp.data.page
        this.pageSize = resp.data.pageSize
      } catch (e: any) {
        this.error = e?.message || '获取随记列表失败'
      } finally { this.loading = false }
    },
    async fetchDetail(id: number) {
      this.loading = true
      try {
        const resp = await getDiary(id)
        this.detail = resp.data
      } finally { this.loading = false }
    },
    async save(payload: { id?: number; title: string; content: string; state: 0|1; time?: string }) {
      await postDiaryEdit(payload)
      await this.fetchList(this.page)
    },
    async remove(id: number) {
      await deleteDiary(id)
      await this.fetchList(this.page)
    }
  }
})