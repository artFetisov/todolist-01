import {configureStore} from "@reduxjs/toolkit";
import {reducers} from "./rootReducer";

export const store = configureStore({
    reducer: reducers,
    devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof store.getState>
