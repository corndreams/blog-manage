import { defineStore } from 'pinia'
import { getUserInfo, type UserInfo } from '@/api/users'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    info: null as UserInfo | null,
    loading: false,
    error: '',
  }),
  actions: {
    async fetchInfo() {
      this.loading = true
      this.error = ''
      try {
        const resp = await getUserInfo()
        this.info = resp.data
      } catch (e: any) {
        this.error = e?.message || '获取个人信息失败'
      } finally {
        this.loading = false
      }
    },
  }
})