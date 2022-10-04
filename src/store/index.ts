import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import reducers from './reducers'
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TasksActions} from "./reducers/tasks/types";
import {TodoListActions} from "./reducers/todolists/types";
import {AppActions} from "./reducers/app/types";
import {AuthActions} from "./reducers/auth/types";
import {configureStore} from "@reduxjs/toolkit";
import {_reducers} from "./rootReducer";
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers(reducers)

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppRootActions>
export type AppRootActions = TasksActions | TodoListActions | AppActions | AuthActions
export type AppRootThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppRootActions>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// ------------------------------------------------- // redux-toolkit

export const _store = configureStore({
    reducer: _reducers,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type _AppDispatch = typeof _store.dispatch
export type _TypeRootState = ReturnType<typeof _store.getState>
