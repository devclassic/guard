import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import element from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as icons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'

const pinia = createPinia()
pinia.use(persistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(element, { locale: zhCn })
for (const [key, component] of Object.entries(icons)) {
  app.component(key, component)
}
app.mount('#app')
