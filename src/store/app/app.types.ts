import {RequestStatusType} from "../../types/app.types";

export interface IAppState {
    error: string | null
    status: RequestStatusType
    isInitialized: boolean
}