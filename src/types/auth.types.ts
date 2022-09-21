export interface IAuthMeResponse {
    id: number
    login: string
    email: string
}

export interface IAuthData {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}