export interface UserModel {
  id: number
  firstName: string
  lastName: string
  middleName: string
  userName: string
  status: 'ACTIVE' | 'INACTIVE' | string
  address: string
  permissions: string[]
  username: string
  deleted: boolean
}