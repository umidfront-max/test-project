import { type LoginModel } from "./model";
import { useStorage } from '@vueuse/core'

export const _TOKEN = useStorage<string>('accessToken', '')
export const _REFRESH_TOKEN = useStorage<string>('refreshToken', '')
export function getLogin_DEFAULT(): LoginModel {
   const obj: LoginModel = {
      username: '',
      password: '',
   }
   return obj
}