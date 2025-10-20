import { axiosInstance, type AxiosResponse } from '@/service/axios';
import { type LoginModel, type LoginResponseModel } from './model';

export async function singIn_API(
   data: LoginModel
): Promise<[LoginResponseModel, null] | [null, Error]> {
   try {
      const response = await axiosInstance.post(
         `/api/auth/login`,
         data
      ) as AxiosResponse<LoginResponseModel>;

      console.log(response);

      return [response.data, null];
   } catch (error) {
      return [null, error as Error];
   }
}
