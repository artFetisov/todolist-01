import {Dispatch} from "redux";
import {setAppError, setIsInitialized} from "./app.slice";
import {AuthThunkCreators} from "../auth/auth.actions";

export const AppThunkCreators = {
    initializedApp: () => async (dispatch: Dispatch) => {
        try {
            // @ts-ignore
            const response = await dispatch(AuthThunkCreators.me())
            Promise.all([response]).then(() => {
                dispatch(setIsInitialized())
            })
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setAppError(error.message))
            }
        }
    }
}