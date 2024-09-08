import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/AuthStore'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
})

const timeout: number = 10000

axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token: string | null = authStore.getAccessToken
    config.headers['Content-Type'] = 'application/json'

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    config.timeout = timeout

    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error)
)

export default axiosInstance
