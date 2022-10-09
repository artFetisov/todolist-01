import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthState} from "./auth.types";
import {authMeTC, logoutTC} from "./auth.actions";

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
    reducers: {},
    extraReducers: builder => {
        builder.addCase(authMeTC.fulfilled, (state, action) => {
            if (action.payload) {
                const {id, email, login} = action.payload
                state.isAuth = true
                state.id = id
                state.login = login
                state.email = email
            }
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isAuth = false
            state.id = null
            state.login = null
            state.email = null
        })
    }
})

export const {reducer} = authSlice