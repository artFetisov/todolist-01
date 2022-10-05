import {Dispatch} from "redux";
import {setListStatus} from "../store/todolists/todolists.slice";
import {setAppError, setAppStatus} from "../store/app/app.slice";

export const handleNetworkError = (errorMsg: string, dispatch: Dispatch, todoListId?: string) => {
    if (todoListId) dispatch(setListStatus({todoListId, status: 'failed'}))
    dispatch(setAppStatus('failed'))
    dispatch(setAppError(errorMsg))
}