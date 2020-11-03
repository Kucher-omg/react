import { headerAPI } from "../api/api";

const SET_SER_DATA = 'SET_SER_DATA';


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
        default:
            return state;
    }

}

export const SetAuthUserDataAC = (id, login, email) => {
    return {
        type: SET_SER_DATA, data: {id, login, email}
    }
}

export const loginThunkCreator = () => {
    return (dispatch) => {
        headerAPI.login()
        .then(promise => {
            if(promise.resultCode === 0) {
                dispatch(SetAuthUserDataAC(promise.data.id, promise.data.login, promise.data.email));
            }
          });
    }
}

export default authReducer;