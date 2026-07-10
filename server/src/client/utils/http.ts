import axios, { AxiosInstance } from 'axios'

const token = async () => {
  const params = {
    loginName: process.env.PLATFORM_ACCOUNT,
    password: process.env.PLATFORM_PASSWORD,
  }
  const res = await axios.get(`${process.env.PLATFORM_BASE_URL}/api/getToken`, { params })
  return res.data.data.token
}

let instance: AxiosInstance | null = null

export const useHttp = () => {
  if (!instance) {
    instance = axios.create({
      baseURL: process.env.PLATFORM_BASE_URL,
    })

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
