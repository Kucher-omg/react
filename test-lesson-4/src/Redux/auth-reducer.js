import { stopSubmit } from "redux-form";
import { headerAPI, securityAPI } from "../api/api";

const SET_SER_DATA = 'SET_SER_DATA';
const EXIT_USER = 'EXIT_USER';
const GET_CAPTCHA = 'GET_CAPTCHA';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {

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

const getCaptchaUrl = (captchaUrl) => {return {type: GET_CAPTCHA, captchaUrl}}

export const SetAuthUserDataAC = (id, login, email, isAuth) => {
    return {
        type: SET_SER_DATA, data: { id, login, email, isAuth }
    }
}

export const ExitFormAccountAC = () => {
    return {
        type: EXIT_USER
    }
}

export const loginThunkCreator = (id, login, email, action) => (dispatch) => {
    return headerAPI.login()
        .then(promise => {
            if (promise.resultCode === 0) {
                dispatch(SetAuthUserDataAC(promise.data.id, promise.data.login, promise.data.email));
            }
        });
}

export const ExitThunkCreator = () => async (dispatch) => {
    let promise = await headerAPI.Exit()

    if (promise.resultCode === 0) {
        dispatch(ExitFormAccountAC());
        dispatch(loginThunkCreator());
    }

}

export const loginToThunkCreator = (email, password, rememberMe, captcha) => async (dispatch) => {
    let promise = await headerAPI.LoginTo(email, password, rememberMe, captcha);
    debugger
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

export const getCaptchaUrlThunkCreator = () => async (dispatch) => {
    let response = await securityAPI.getCapchaUrl();
    const captcha = response.data.url;
    dispatch(getCaptchaUrl(captcha));
}





export default authReducer;