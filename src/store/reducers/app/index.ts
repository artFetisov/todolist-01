import {AppActions, AppEnumAction, IAppState} from "./types";

const initialState: IAppState = {
    error: null,
    status: 'idle',
    isInitialized: false
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

        case AppEnumAction.SET_IS_INITIALIZED:
            return {
                ...state,
                isInitialized: true
            }

        default:
            return state
    }
}