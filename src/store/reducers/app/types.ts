import {RequestStatusType} from "../../../types/app.types";

export interface IAppState {
    error: string | null
    status: RequestStatusType
}

export enum AppEnumAction {
    SET_APP_ERROR = 'SET-ERROR',
    SET_APP_STATUS = 'SET-STATUS'
}

export interface SetErrorAction {
    type: AppEnumAction.SET_APP_ERROR,
    error: string | null
}

export interface SetStatusAction {
    type: AppEnumAction.SET_APP_STATUS,
    status: RequestStatusType
}

export type AppActions = SetErrorAction | SetStatusAction