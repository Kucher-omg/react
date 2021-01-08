import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { headerAPI, ResultCodeForCaptchaEnum, ResultCodesEnum, securityAPI } from "../api/api";
import { AppStateType, InferActionsTypes } from "./Redux-store";


type ActionsType =  InferActionsTypes<typeof actions>

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean | null,
    captchaUrl: null as string | null
};

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case 'SET_SER_DATA': {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        case 'EXIT_USER': {
            return {
                ...state,
                isAuth: false
            }
        }
        case 'GET_CAPTCHA': {
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        }
        default:
            return state;
    }

}
export const actions = {
    getCaptchaUrl: (captchaUrl: string) => {return {type: 'GET_CAPTCHA', captchaUrl} as const},
    SetAuthUserDataAC: (id: number, login: string, email: string) => {
        return {
            type: 'SET_SER_DATA', data: { id, login, email }
        } as const
    },
    ExitFormAccountAC: () => {
        return {
            type: 'EXIT_USER'
        } as const
    }
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const loginThunkCreator = (): ThunkType => async (dispatch) => {
    let promise = await headerAPI.login();
    
    if (promise.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.SetAuthUserDataAC(promise.data.id, promise.data.login, promise.data.email));
    }
    
}
 
export const ExitThunkCreator = (): ThunkType => async (dispatch) => {
    let promise = await headerAPI.Exit()

    if (promise.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.ExitFormAccountAC());
        dispatch(loginThunkCreator());
    }
}

export const loginToThunkCreator = (email: string, password: string, 
    rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let promise = await headerAPI.LoginTo(email, password, rememberMe, captcha);
    
    if (promise.resultCode === ResultCodesEnum.Success) {
        dispatch(loginThunkCreator());
    }
    else{
        if (promise.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired){
            dispatch(getCaptchaUrlThunkCreator());
        }
        let message = promise.messages.length > 0 ? promise.messages[0] : 'Some ERROR'
        dispatch(stopSubmit('login', { _error: message }));

    }
}

export const getCaptchaUrlThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCapchaUrl();
    
    const captcha = response.data.url;
    dispatch(actions.getCaptchaUrl(captcha));
}





export default authReducer;