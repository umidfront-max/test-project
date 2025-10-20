export interface LoginModel {
   username: string
   password: string
}
export interface LoginResponseModel {
   tokenBody: string
   refreshToken: string
   userName: string
   tokenType: string
}