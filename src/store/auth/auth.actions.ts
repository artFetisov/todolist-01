import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "../../services/auth.service";

export const me = createAsyncThunk(
    'auth/me',
    async (_, thunkApi) => {
        try {
            const response = await AuthService.me()
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)