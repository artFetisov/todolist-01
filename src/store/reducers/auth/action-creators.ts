import {AuthActionEnum, SetUserDataAction} from "./types";
import {AppRootThunk} from "../../index";
import {AppActionCreators} from "../app/action-creators";
import {AuthService} from "../../../services/auth.service";
import {ResultCodeEnum} from "../../../api/api.config";

export const AuthActionCreators = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataAction =>
        ({
            type: AuthActionEnum.SET_USER_DATA,
            payload: {id, email, login, isAuth},
        }),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: AuthActionEnum.GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    }),
}


export const AuthThunkCreators = {
    me: (): AppRootThunk => async dispatch => {
        try {
            dispatch(AppActionCreators.setAppStatus('loading'))
            const response = await AuthService.me()
            if (response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(AppActionCreators.setAppStatus('succeeded'))
                const {id, email, login} = response.data.data
                dispatch(AuthActionCreators.setUserData(id, email, login, true))
            } else if (response.data.resultCode === ResultCodeEnum.Error) {
                dispatch(AppActionCreators.setAppStatus('failed'))
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(AppActionCreators.setAppError(error.message))
            }
        }
    },
    login: (email: string, password: string, rememberMe: boolean, captcha?: string): AppRootThunk =>
        async dispatch => {
            try {
                const response = await AuthService.login(email, password, rememberMe, captcha)
                if (response.data.resultCode === ResultCodeEnum.Success) {
                    dispatch(AuthThunkCreators.me())
                } else if (response.data.resultCode === ResultCodeEnum.Error) {
                    dispatch(AppActionCreators.setAppError(response.data.messages.length > 0 ? response.data.messages[0] : 'Some error occurred'))
                }
            } catch (error) {
                if (error instanceof Error) {
                    dispatch(AppActionCreators.setAppError(error.message))
                }
            }

        },
    logout: (): AppRootThunk => async dispatch => {
        try {
            const response = await AuthService.logout()
            if (response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(AuthActionCreators.setUserData(null, null, null, false))
            } else if (response.data.resultCode === ResultCodeEnum.Error) {
                dispatch(AppActionCreators.setAppError(response.data.messages[0]))
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(AppActionCreators.setAppError(error.message))
            }
        }
    },
}