import { defineStore } from 'pinia'
import { getMessages, deleteMessage, type GetMessagesParams, type MessageItemResp } from '@/api/messages'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    list: [] as MessageItemResp[],
    total: 0,
    page: 1,
    pageSize: 10,
    loading: false,
    error: '',
  }),
  actions: {
    async fetch(params?: Partial<GetMessagesParams>) {
      this.loading = true
      this.error = ''
      const query: GetMessagesParams = {
        page: params?.page ?? this.page,
        pageSize: params?.pageSize ?? this.pageSize,
      }
      try {
        const data = await getMessages(query)
        this.list = data.data.list
        this.total = data.data.total
        this.page = data.data.page
        this.pageSize = data.data.pageSize
      } catch (e: any) {
        this.error = e?.message || '获取留言失败'
      } finally {
        this.loading = false
      }
    },
    async remove(id: number) {
      await deleteMessage(id)
      await this.fetch({ page: this.page })
    },
    async bulkRemove(ids: number[]) {
      for (const id of ids) { try { await deleteMessage(id) } catch {} }
      await this.fetch({ page: this.page })
    },
    setPage(p: number) { this.page = p },
  }
})