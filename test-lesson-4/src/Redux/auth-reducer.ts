import { stopSubmit } from "redux-form";
import { headerAPI, securityAPI } from "../api/api";

const SET_SER_DATA = 'SET_SER_DATA';
const EXIT_USER = 'EXIT_USER';
const GET_CAPTCHA = 'GET_CAPTCHA';

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean | null,
    captchaUrl: null as string | null
};

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {

    switch (action.type) {
        case SET_SER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        case EXIT_USER: {
            return {
                ...state,
                isAuth: false
            }
        }
        case GET_CAPTCHA: {
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        }
        default:
            return state;
    }

}
type getCaptchaUrl = {
    type: typeof GET_CAPTCHA,
    captchaUrl: string
}
const getCaptchaUrl = (captchaUrl: string): getCaptchaUrl => {return {type: GET_CAPTCHA, captchaUrl}}

type SetAuthUserDataType ={
    id: number, 
    login: string, 
    email: string
}
type SetAuthUserDataACType = {
    type: typeof SET_SER_DATA, 
    data: SetAuthUserDataType
}
export const SetAuthUserDataAC = (id: number, login: string, email: string): SetAuthUserDataACType => {
    return {
        type: SET_SER_DATA, data: { id, login, email }
    }
}
type ExitFormAccountACType = {
    type: typeof EXIT_USER
}
export const ExitFormAccountAC = (): ExitFormAccountACType => {
    return {
        type: EXIT_USER
    }
}

export const loginThunkCreator = () => async (dispatch: any) => {
    let promise = await headerAPI.login();
    if (promise.resultCode === 0) {
        dispatch(SetAuthUserDataAC(promise.data.id, promise.data.login, promise.data.email));
    }
    
}

export const ExitThunkCreator = () => async (dispatch: any) => {
    let promise = await headerAPI.Exit()

    if (promise.resultCode === 0) {
        dispatch(ExitFormAccountAC());
        dispatch(loginThunkCreator());
    }
}

export const loginToThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let promise = await headerAPI.LoginTo(email, password, rememberMe, captcha);
    
    if (promise.resultCode === 0) {
        dispatch(loginThunkCreator());
    }
    else{
        if (promise.resultCode === 10){
            dispatch(getCaptchaUrlThunkCreator());
        }
        let message = promise.messages.length > 0 ? promise.messages[0] : 'Some ERROR'
        dispatch(stopSubmit('login', { _error: message }));

    }
}

export const getCaptchaUrlThunkCreator = () => async (dispatch: any) => {
    let response = await securityAPI.getCapchaUrl();
    const captcha = response.data.url;
    dispatch(getCaptchaUrl(captcha));
}





export default authReducer;