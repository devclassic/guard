import axios from 'axios'
import { ElMessageBox } from 'element-plus'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? '',
})

http.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user')) || {}
    config.headers.token = user.token
    return config
  },
  error => {
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
    return Promise.reject(error)
  },
)

export const useAxios = () => {
  return http
}
