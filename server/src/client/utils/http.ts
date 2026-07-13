import axios, { AxiosInstance } from 'axios'
import { getUnixTime } from 'date-fns'
import retry from 'axios-retry'

let store = {
  expiration: 0,
  token: '',
}

export const token = async () => {
  const expiration = store.expiration - 60 * 20
  if (expiration > getUnixTime(new Date())) {
    return store.token
  }
  const params = {
    loginName: process.env.PLATFORM_ACCOUNT,
    password: process.env.PLATFORM_PASSWORD,
  }
  const res = await axios.get(`${process.env.PLATFORM_BASE_URL}/api/getToken`, { params })
  store = res.data.data
  return store.token
}

let instance: AxiosInstance | null = null

export const useHttp = () => {
  if (!instance) {
    instance = axios.create({
      baseURL: process.env.PLATFORM_BASE_URL,
    })

    retry(instance, { retries: Infinity, retryDelay: retry.exponentialDelay })

    instance.interceptors.request.use(
      async config => {
        config.headers.authorization = await token()
        return config
      },
      error => {
        return Promise.reject(error)
      },
    )

    instance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        return Promise.reject(error)
      },
    )
  }
  return instance
}
