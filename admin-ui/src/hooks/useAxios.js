import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import router from '../router'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? '',
})

let errorCount = 0

http.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user')) || {}
    config.headers.token = user.token
    return config
  },
  async error => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  async response => {
    if (response.data.code === 1001) {
      await ElMessageBox.alert('登录已经过期', '提示', {
        type: 'warning',
        callback() {
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
    console.log(errorCount)
    return Promise.reject(error)
  },
)

export const useAxios = () => {
  return http
}
