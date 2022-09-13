import {applyMiddleware, combineReducers, createStore} from "redux";
import reducers from './reducers'
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TasksActions} from "./reducers/tasks/types";
import {TodoListActions} from "./reducers/todolists/types";
import {AppActions} from "./reducers/app/types";

const rootReducer = combineReducers(reducers)

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppRootActions>
export type AppRootActions = TasksActions | TodoListActions | AppActions
export type AppRootThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppRootActions>