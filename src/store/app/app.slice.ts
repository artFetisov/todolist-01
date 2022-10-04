import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAppState} from "./app.types";
import {RequestStatusType} from "../../types/app.types";

const initialState: IAppState = {
    error: null,
    status: 'idle',
    isInitialized: false
}

const appSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAppError(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
        setAppStatus(state, action: PayloadAction<RequestStatusType>) {
            state.status = action.payload
        },
        setIsInitialized(state) {
            state.isInitialized = true
        }
    },
})

export const {setAppError, setAppStatus, setIsInitialized} = appSlice.actions

export const {reducer} = appSlice