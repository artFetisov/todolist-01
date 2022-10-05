import thunkMiddleware from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {reducers} from "./rootReducer";

export const store = configureStore({
    reducer: reducers,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type _AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof store.getState>
