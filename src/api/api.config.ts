import axios from 'axios';
import {ITask} from "../types/task.types";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY ? process.env.REACT_APP_API_KEY : ''
    }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}


export interface IResponse<T = {}> {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

export interface IGetTasksResponse {
    totalCount: number
    error: string | null
    items: ITask[]
}