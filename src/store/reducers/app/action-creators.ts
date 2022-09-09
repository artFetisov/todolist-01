import {AppEnumAction, SetErrorAction, SetStatusAction} from "./types";
import {RequestStatusType} from "../../../types/app.types";

export const AppActionCreators = {
    setAppError: (error: string | null): SetErrorAction => ({
        type: AppEnumAction.SET_APP_ERROR,
        error
    }),
    setAppStatus: (status: RequestStatusType): SetStatusAction => ({
        type: AppEnumAction.SET_APP_STATUS,
        status
    })
}