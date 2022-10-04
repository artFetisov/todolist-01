import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthState} from "./auth.types";

const initialState: IAuthState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<{ id: number | null, email: string | null, login: string | null, isAuth: true | false }>) {
            const {id, isAuth, email, login} = action.payload
            state.isAuth = isAuth
            state.id = id
            state.login = login
            state.email = email
        }
    },

})

export const {setUserData} = authSlice.actions

export const {reducer} = authSlice