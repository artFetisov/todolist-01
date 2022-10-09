import {setAppError, setAppStatus} from "../app/app.slice";
import {AuthService} from "../../services/auth.service";
import {ResultCodeEnum} from "../../api/api.config";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuthData, IAuthMeResponse} from "../../types/auth.types";

export const authMeTC = createAsyncThunk<IAuthMeResponse | undefined>('auth/me',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus('loading'))
            const response = await AuthService.me()
            if (response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(setAppStatus('succeeded'))
                return response.data.data

            } else if (response.data.resultCode === ResultCodeEnum.Error) {
                dispatch(setAppStatus('failed'))
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setAppError(error.message))
                return rejectWithValue(error.message)
            }
        }
    })

export const loginTC = createAsyncThunk<void, IAuthData>('auth/login', async (data, {dispatch, rejectWithValue}) => {
    try {
        const response = await AuthService.login(data.email, data.password, data.rememberMe, data.captcha)
        if (response.data.resultCode === ResultCodeEnum.Success) {
            await dispatch(authMeTC())
        } else if (response.data.resultCode === ResultCodeEnum.Error) {
            dispatch(setAppError(response.data.messages.length > 0 ? response.data.messages[0] : 'Some error occurred'))
        }
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setAppError(error.message))
            return rejectWithValue(error.message)
        }
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (_, {dispatch, rejectWithValue}) => {
    try {
        const response = await AuthService.logout()
        if (response.data.resultCode === ResultCodeEnum.Error) {
            dispatch(setAppError(response.data.messages[0]))
        }
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setAppError(error.message))
            return rejectWithValue(error.message)
        }
    }
})
