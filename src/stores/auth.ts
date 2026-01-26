import { defineStore } from 'pinia'
import { signIn } from '@/api/auth'
import { setAuthToken } from '@/api/http'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: localStorage.getItem('token') || '' as string }),
  getters: {
    isAuthed: (s) => !!s.token,
  },
  actions: {
    async signIn(name: string, password: string) {
      const resp = await signIn(name, password)
      if (resp.code !== 200) throw new Error(resp.msg || '登录失败')
      const t = resp.data.token
      this.token = t
      localStorage.setItem('token', t)
      setAuthToken(t)
    },
    logout() { this.token = ''; localStorage.removeItem('token'); setAuthToken('') },
  },
})