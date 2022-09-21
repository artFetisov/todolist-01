export interface IAuthState {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null,
}

export enum AuthActionEnum {
    GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS',
    SET_USER_DATA = 'SET_USER_DATA'
}

export interface SetUserDataAction {
    type: AuthActionEnum.SET_USER_DATA,
    payload: {
        id: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean,
    }
}

export interface GetCaptchaUrlSuccess {
    type: AuthActionEnum.GET_CAPTCHA_URL_SUCCESS,
    payload: {
        captchaUrl: string | null
    }
}

export type AuthActions = SetUserDataAction | GetCaptchaUrlSuccess