import {TodoListsActionCreators} from "../store/reducers/todolists/action-creators";
import {AppActionCreators} from "../store/reducers/app/action-creators";
import {Dispatch} from "redux";

export const handleNetworkError = (errorMsg: string, dispatch: Dispatch, todolistId?: string) => {
    if (todolistId) dispatch(TodoListsActionCreators.setListStatus(todolistId, 'failed'))
    dispatch(AppActionCreators.setAppStatus('failed'))
    dispatch(AppActionCreators.setAppError(errorMsg))
}