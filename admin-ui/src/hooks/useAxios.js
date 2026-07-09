import axios from 'axios'
import { useUserStore } from '../stores/user'

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
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  },
)

export const useAxios = () => {
  return http
}
