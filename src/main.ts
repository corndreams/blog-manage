import 'element-plus/dist/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Buffer } from 'buffer'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import { setAuthToken, setUnauthorizedHandler } from '@/api/http'

if (!(globalThis as any).Buffer) (globalThis as any).Buffer = Buffer

const app = createApp(App)
const pinia = createPinia()

// 全局注册图标，便于在模板中使用
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}

app.use(pinia)

const auth = useAuthStore()
if (auth.token) setAuthToken(auth.token)
setUnauthorizedHandler(() => {
  auth.logout()
  if (router.currentRoute.value.path !== '/login') {
    router.push('/login')
  }
})

app.use(router)
app.use(ElementPlus)

app.mount('#app')
