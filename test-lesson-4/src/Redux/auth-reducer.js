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

    switch(action.type){
        case SET_SER_DATA:{
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        case EXIT_USER : {
            return {
                ...state,
                isAuth: false
            }
        }
        default:
            return state;
    }

}

export const SetAuthUserDataAC = (id, login, email) => {
    return {
        type: SET_SER_DATA, data: {id, login, email}
    }
}

export const ExitFormAccountAC = () => {
    return{
        type: EXIT_USER
    }
}
 
export const loginThunkCreator = () => (dispatch) => {
    headerAPI.login()
        .then(promise => {
            if (promise.resultCode === 0) {
                dispatch(SetAuthUserDataAC(promise.data.id, promise.data.login, promise.data.email));
            }
        });
}

export const ExitThunkCreator = () => (dispatch) => {
    headerAPI.Exit()
        .then(promise => {
            if (promise.resultCode === 0) {
                dispatch(ExitFormAccountAC());
                dispatch(loginThunkCreator());
            }
        });
}

export const loginToThunkCreator = (email, password, rememberMe) => (dispatch) => {
    headerAPI.LoginTo(email, password, rememberMe)
        .then(promise => {
            if (promise.resultCode === 0) {
                dispatch(loginThunkCreator());
            }
        });
}




export default authReducer;