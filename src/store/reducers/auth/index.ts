import {AuthActionEnum, AuthActions, IAuthState} from "./types";

const initialState: IAuthState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}

export default function authReducer(state = initialState, action: AuthActions): IAuthState {
    switch (action.type) {
        case AuthActionEnum.GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.payload.captchaUrl
            }

        case AuthActionEnum.SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}
