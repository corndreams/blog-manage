import { defineStore } from 'pinia'
import { getFiles, type FileItem } from '@/api/files'
import { uploadImage } from '@/api/articles'

export const useFilesStore = defineStore('files', {
  state: () => ({
    list: [] as FileItem[],
    total: 0,
    page: 1,
    pageSize: 12,
    loading: false,
    error: '',
  }),
  actions: {
    async fetch(page?: number) {
      this.loading = true
      this.error = ''
      try {
        const resp = await getFiles({ page: page ?? this.page, pageSize: this.pageSize })
        this.list = resp.data.list
        this.total = resp.data.total ?? resp.data.list.length
        this.page = resp.data.page
        this.pageSize = resp.data.pageSize
      } catch (e: any) {
        this.error = e?.message || '获取图库失败'
      } finally { this.loading = false }
    },
    async upload(raw: File) {
      const reader = new FileReader()
      const ok = await new Promise<boolean>((resolve) => {
        reader.onload = async () => {
          try {
            const dataUrl = String(reader.result)
            await uploadImage(raw.name, dataUrl)
            resolve(true)
          } catch { resolve(false) }
        }
        reader.readAsDataURL(raw)
      })
      if (ok) await this.fetch(this.page)
    },
  }
})