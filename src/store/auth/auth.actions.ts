import {Dispatch} from "redux";
import {setAppError, setAppStatus} from "../app/app.slice";
import {AuthService} from "../../services/auth.service";
import {ResultCodeEnum} from "../../api/api.config";
import {setUserData} from "./auth.slice";

export const AuthThunkCreators = {
    me: () => async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            const response = await AuthService.me()
            if (response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(setAppStatus('succeeded'))
                const {id, email, login} = response.data.data

                dispatch(setUserData({id, email, login, isAuth: true}))
            } else if (response.data.resultCode === ResultCodeEnum.Error) {
                dispatch(setAppStatus('failed'))
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setAppError(error.message))
            }
        }
    },
    login: (email: string, password: string, rememberMe: boolean, captcha?: string) =>
        async (dispatch: Dispatch) => {
            try {
                const response = await AuthService.login(email, password, rememberMe, captcha)
                if (response.data.resultCode === ResultCodeEnum.Success) {
                    // @ts-ignore
                    await dispatch(AuthThunkCreators.me())
                } else if (response.data.resultCode === ResultCodeEnum.Error) {
                    dispatch(setAppError(response.data.messages.length > 0 ? response.data.messages[0] : 'Some error occurred'))
                }
            } catch (error) {
                if (error instanceof Error) {
                    dispatch(setAppError(error.message))
                }
            }

        },
    logout: () => async (dispatch: Dispatch) => {
        try {
            const response = await AuthService.logout()
            if (response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(setUserData({id: null, email: null, login: null, isAuth: false}))
            } else if (response.data.resultCode === ResultCodeEnum.Error) {
                dispatch(setAppError(response.data.messages[0]))
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setAppError(error.message))
            }
        }
    },
}