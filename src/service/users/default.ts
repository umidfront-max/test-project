import { type UserModel } from "./model";

export function getUser_DEFAULT(): UserModel {
   const obj: UserModel = {
      id: 0,
      firstName: '',
      lastName: '',
      middleName: '',
      userName: '',
      status: 'ACTIVE',
      address: '',
      permissions: [],
      username: '',
      deleted: false,
   }
   return obj
}