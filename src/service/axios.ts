import axios, { type InternalAxiosRequestConfig, AxiosError } from 'axios'
import { _TOKEN, _REFRESH_TOKEN } from './auth'

export interface AxiosResponse<T> {
   data: T
   success: Boolean
}
export const axiosInstance = axios.create({
   baseURL: "https://old.parliament.gov.uz",
   timeout: 20000,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   }
})

axiosInstance.interceptors.request.use(
   (config: InternalAxiosRequestConfig) => {
      console.log(config.url);

      if (config.url === '/api/auth/login' || config.url === '/api/auth/refreshtoken') return config

      if (config.url?.includes('NO_TOKEN')) {
         config.headers.set('Authorization', '')
      }
      else if (_TOKEN.value) {
         config.headers.set('Authorization', `Bearer ${_TOKEN.value}`)
      }

      if (config.url) config.url = config.url.replace('/NO_TOKEN', '')

      return config
   },
   (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
   (response) => response,
   async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

      if (error.response?.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true

         try {
            const response = await axios.post('https://old.parliament.gov.uz/api/auth/refreshtoken', {
               refreshToken: _REFRESH_TOKEN.value
            })

            const { tokenBody, refreshToken } = response.data as { tokenBody: string, refreshToken: string }

            _TOKEN.value = tokenBody
            _REFRESH_TOKEN.value = refreshToken

            if (originalRequest.headers) {
               (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${_TOKEN.value}`
            }
            return axiosInstance(originalRequest)
         } catch (err) {

            return Promise.reject(err)
         }
      }

      return Promise.reject(error)
   }
)

