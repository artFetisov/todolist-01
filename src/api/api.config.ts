import axios from 'axios';
import {ITask} from "../types/task.types";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY ? process.env.REACT_APP_API_KEY : ''
    }
})


export interface IResponse<T = {}> {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {
        item: T
    }
}

export interface IGetTasksResponse {
    totalCount: number
    error: string | null
    items: ITask[]
}