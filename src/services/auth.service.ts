import {IGetTasksResponse, instance, IResponse} from "../api/api.config";
import {IAuthMeResponse} from "../types/auth.types";

export const AuthService = {
    async me() {
        return instance.get<IResponse<IAuthMeResponse>>(`auth/me`)
    },
    async login(email: string, password: string, rememberMe: boolean, captcha?: string) {
        return instance.post<IResponse<{ userId: number }>>(`auth/login`, {email, password, rememberMe, captcha})
    },
    async logout() {
        return instance.delete<IResponse>(`auth/login`)
    }
}