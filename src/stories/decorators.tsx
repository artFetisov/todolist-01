import React from 'react'
import {Provider} from 'react-redux'
import {v1} from 'uuid'
import {AppRootState} from "../store";
import {TaskPriorities, TaskStatuses} from "../types/task.types";
import {configureStore} from "@reduxjs/toolkit";
import {reducers} from "../store/rootReducer";
import thunkMiddleware from "redux-thunk";

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, listStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, listStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.NEW, description: '',
                completed: false,
                priority: TaskPriorities.MIDDLE,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.NEW, description: '',
                entityStatus: 'idle',
                completed: false,
                priority: TaskPriorities.MIDDLE,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.NEW, description: '',
                completed: false,
                priority: TaskPriorities.MIDDLE,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: v1(), title: 'React Book', status: TaskStatuses.NEW, description: '',
                completed: false,
                priority: TaskPriorities.MIDDLE,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            }
        ]
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth: {
        id: null,
        email: null,
        login: null,
        isAuth: false,
        captchaUrl: null,
    }
}

export const storyBookStore = configureStore({
    reducer: reducers,
    devTools: true,
    preloadedState: initialGlobalState as AppRootState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})
// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)