import {AppActions, AppEnumAction, IAppState} from "./types";

const initialState: IAppState = {
    error: null,
    status: 'idle'
}

export default function appReducer(state = initialState, action: AppActions): IAppState {
    switch (action.type) {
        case AppEnumAction.SET_APP_ERROR:
            return {
                ...state,
                error: action.error
            }

        case AppEnumAction.SET_APP_STATUS:
            return {
                ...state,
                status: action.status
            }

        default:
            return state
    }
}