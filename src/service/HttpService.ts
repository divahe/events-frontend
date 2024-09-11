import type { AuthResponse, LoginData, RegistrationData, Event } from '@/model/index'
import axios, { type AxiosResponse } from 'axios'
import axiosInstance from '@/helpers/AxiosConfig'
import { useAuthStore } from '@/stores/AuthStore'

export default class HttpService {
  private static LOGIN_URL = 'auth/login'
  private static LOGOUT_URL = 'auth/logout'
  private static EVENTREGISTRATION_URL = 'events/register'
  private static EVENTLIST_URL = 'events'
  private static REFRESH_TOKEN_URL = 'auth/refresh-token'

  private static handleErrorResponse(error: any): {
    status: number
    error: string
    data?: any
  } {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(`API Error: ${error.response.status} - ${error.response.statusText}`)
        return {
          status: error.response.status,
          error: `API Error: ${error.response.status} - ${error.response.statusText}`,
          data: error.response.data
        }
      } else if (error.request) {
        console.error('API Error: No response received')
        return {
          status: 0,
          error: 'No server response'
        }
      } else {
        console.error('API Error: Request setup error')
        return {
          status: 0,
          error: 'Unexpected error'
        }
      }
    }
    console.error('Unexpected error:', error)
    return {
      status: 0,
      error: 'Unexpected error'
    }
  }

  private static async handleRequest<T>(request: Promise<AxiosResponse<T>>): Promise<{
    status: number
    data?: T
    error?: string
  }> {
    try {
      const response = await request
      console.log('response', response.data)
      return {
        status: response.status,
        data: response.data
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        const retryRequest = await this.handle403Error(error.config)
        if (retryRequest) {
          return this.handleRequest(retryRequest) // Retry original request
        }
      }
      return this.handleErrorResponse(error)
    }
  }

  private static async handle403Error(originalRequest: any): Promise<any | null> {
    const authStore = useAuthStore()

    try {
      authStore.replaceRefreshToken()
      const refreshResponse = await axiosInstance.post(this.REFRESH_TOKEN_URL)
      const newAccessToken = refreshResponse.data.accessToken
      const newRefreshToken = refreshResponse.data.refreshToken
      authStore.setAccessToken(newAccessToken)
      authStore.setRefreshToken(newRefreshToken)
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
      console.log('originalRequest', originalRequest)
      return axiosInstance(originalRequest)
    } catch (refreshError) {
      console.error('Token refresh failed', refreshError)
      authStore.logout()
      return null
    }
  }

  static login = async (
    loginData: LoginData
  ): Promise<{
    status: number
    data?: AuthResponse
    error?: string
  }> => {
    return this.handleRequest<AuthResponse>(axiosInstance.post(this.LOGIN_URL, loginData))
  }

  static logout = async (): Promise<{
    status: number
    data?: null
    error?: string
  }> => {
    return this.handleRequest<null>(axiosInstance.post(this.LOGOUT_URL))
  }

  static register = async (
    registrationData: RegistrationData
  ): Promise<{
    status: number
    data?: AuthResponse
    error?: string
  }> => {
    return this.handleRequest<AuthResponse>(
      axiosInstance.put(this.EVENTREGISTRATION_URL, registrationData)
    )
  }

  static getEvents = async (): Promise<{
    status: number
    data?: Event[]
    error?: string
  }> => {
    return this.handleRequest<Event[]>(axiosInstance.get(this.EVENTLIST_URL))
  }

  static addEvent = async (
    newEvent: Partial<Event>
  ): Promise<{
    status: number
    data?: Event
    error?: string
  }> => {
    return this.handleRequest<Event>(axiosInstance.post(this.EVENTLIST_URL, newEvent))
  }
}
