import axios from 'axios'
import retry from 'axios-retry'
import { showDialog } from 'vant'
import { useUserStore } from '../stores/user'
import router from '../router'

let authAlertCount = 0
let errorCount = 0

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? '',
})

retry(http, { retries: Infinity, retryDelay: retry.linearDelay(500) })

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
    if (response.data.code === 1001 && authAlertCount === 0) {
      authAlertCount++
      showDialog({
        title: '提示',
        message: '登录已经过期',
      }).then(() => {
        authAlertCount = 0
        router.push('/login')
      })
    }
    return response
  },
  error => {
    if (errorCount === 0) {
      showDialog({
        title: '提示',
        message: error,
      }).then(() => {
        errorCount = 0
      })
    }
    errorCount++
    return Promise.reject(error)
  },
)

export const useAxios = () => {
  return http
}
