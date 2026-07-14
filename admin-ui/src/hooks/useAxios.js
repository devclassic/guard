import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '../stores/user'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

let authAlertCount = 0
let errorCount = 0

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? '',
})

http.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    config.headers.token = userStore.token
    return config
  },
  async error => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  response => {
    if (response.data.code === 1001 && authAlertCount === 0 && route.path !== '/login') {
      authAlertCount++
      ElMessageBox.alert('登录已经过期', '提示', {
        type: 'warning',
        callback() {
          authAlertCount = 0
          router.push('/login')
        },
      })
    }
    return response
  },
  error => {
    if (errorCount === 0) {
      ElMessageBox.alert(error, '提示', {
        type: 'error',
        callback() {
          errorCount = 0
        },
      })
    }
    errorCount++
    return Promise.reject(error)
  },
)

export const useAxios = () => {
  return http
}
