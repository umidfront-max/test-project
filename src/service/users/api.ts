import { axiosInstance, type AxiosResponse } from '@/service/axios';
import { type UserModel } from './model';

export async function getUser_API(
   data: UserModel
): Promise<[UserModel, null] | [null, Error]> {
   try {
      const response = await axiosInstance.post(
         `/api/user/me`,
         data
      ) as AxiosResponse<UserModel>;

      console.log(response);

      return [response.data, null];
   } catch (error) {
      return [null, error as Error];
   }
}
