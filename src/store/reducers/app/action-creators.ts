import {AppEnumAction, SetErrorAction, SetIsInitializedAction, SetStatusAction} from "./types";
import {RequestStatusType} from "../../../types/app.types";
import {AppRootThunk} from "../../index";
import {AuthThunkCreators} from "../auth/action-creators";

export const AppActionCreators = {
    setAppError: (error: string | null): SetErrorAction => ({
        type: AppEnumAction.SET_APP_ERROR,
        error
    }),
    setAppStatus: (status: RequestStatusType): SetStatusAction => ({
        type: AppEnumAction.SET_APP_STATUS,
        status
    }),
    setIsInitialized: (): SetIsInitializedAction => ({type: AppEnumAction.SET_IS_INITIALIZED})
}

export const AppThunkCreators = {
    initializedApp: (): AppRootThunk => async dispatch => {
        try {
            const response = await dispatch(AuthThunkCreators.me())
            Promise.all([response]).then(() => {
                dispatch(AppActionCreators.setIsInitialized())
            })
        } catch (error) {
            if (error instanceof Error) {
                dispatch(AppActionCreators.setAppError(error.message))
            }
        }
    }
}