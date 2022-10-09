import {Dispatch} from "redux";
import {setAppError, setIsInitialized} from "./app.slice";
import {authMeTC} from "../auth/auth.actions";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const initializeAppTC = createAsyncThunk('app/initialize', async (_, {dispatch, rejectWithValue}) => {
    try {
        const response = await dispatch(authMeTC())
        Promise.all([response]).then(() => {
            dispatch(setIsInitialized())
        })
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setAppError(error.message))
            return rejectWithValue(error.message)
        }
    }
})