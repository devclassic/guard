import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import router from './router'
import transition from '@duannx/vue-router-transition'
import '@duannx/vue-router-transition/dist/style.css'
import App from './App.vue'

const pinia = createPinia()
pinia.use(persistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(transition)
app.mount('#app')
