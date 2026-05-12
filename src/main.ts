import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Buffer } from 'buffer'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import { setAuthToken } from '@/api/http'

if (!(globalThis as any).Buffer) (globalThis as any).Buffer = Buffer

const app = createApp(App)

// 全局注册图标，便于在模板中使用
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')

const auth = useAuthStore()
if (auth.token) setAuthToken(auth.token)
