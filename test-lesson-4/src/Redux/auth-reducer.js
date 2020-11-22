import { stopSubmit } from "redux-form";
import { headerAPI } from "../api/api";

const SET_SER_DATA = 'SET_SER_DATA';
const EXIT_USER = 'EXIT_USER';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
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
        default:
            return state;
    }

}

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

export const loginToThunkCreator = (email, password, rememberMe) => async (dispatch) => {


    let promise = await headerAPI.LoginTo(email, password, rememberMe);

    if (promise.resultCode === 0) {
        dispatch(loginThunkCreator());
    }
    else {
        let message = promise.messages.length > 0 ? promise.messages[0] : 'Some ERROR'
        dispatch(stopSubmit('login', { _error: message }));

    }
}




export default authReducer;